'use client'
import { useEffect, useRef } from 'react'

// ─── Minimal 2D Simplex Noise (Stefan Gustavson, no npm) ─────────────────────
const _perm = new Uint8Array(512)
;(function seed() {
  const base = new Uint8Array(256)
  for (let i = 0; i < 256; i++) base[i] = i
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [base[i], base[j]] = [base[j], base[i]]
  }
  for (let i = 0; i < 512; i++) _perm[i] = base[i & 255]
})()
const _F2 = 0.5 * (Math.sqrt(3) - 1)
const _G2 = (3 - Math.sqrt(3)) / 6
const _grad2 = [[1,1],[-1,1],[1,-1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1]]
function simplex2(xin, yin) {
  const s = (xin + yin) * _F2
  const i = Math.floor(xin + s), j = Math.floor(yin + s)
  const t = (i + j) * _G2
  const x0 = xin - (i - t), y0 = yin - (j - t)
  const i1 = x0 > y0 ? 1 : 0, j1 = x0 > y0 ? 0 : 1
  const x1 = x0 - i1 + _G2, y1 = y0 - j1 + _G2
  const x2 = x0 - 1 + 2*_G2, y2 = y0 - 1 + 2*_G2
  const ii = i & 255, jj = j & 255
  const g0 = _grad2[_perm[ii + _perm[jj]] % 8]
  const g1 = _grad2[_perm[ii+i1 + _perm[jj+j1]] % 8]
  const g2 = _grad2[_perm[ii+1  + _perm[jj+1]]  % 8]
  const t0 = 0.5-x0*x0-y0*y0, n0 = t0<0?0:(t0*t0)*(t0*t0)*(g0[0]*x0+g0[1]*y0)
  const t1 = 0.5-x1*x1-y1*y1, n1 = t1<0?0:(t1*t1)*(t1*t1)*(g1[0]*x1+g1[1]*y1)
  const t2 = 0.5-x2*x2-y2*y2, n2 = t2<0?0:(t2*t2)*(t2*t2)*(g2[0]*x2+g2[1]*y2)
  return 70*(n0+n1+n2)
}
// ─────────────────────────────────────────────────────────────────────────────

// Render at 1/4 resolution then scale up — gives smooth bilinear caustic veins
// with zero pixelation. Each layer adds a different noise octave.
const SCALE = 4   // downscale factor (higher = faster, smoother)
const LAYERS = [
  { ox:  0.0, oy:  0.0,  freq: 2.6, speed: 0.00014, thresh: 0.66, brightness: 1.00 },
  { ox: 17.3, oy:  5.5,  freq: 4.1, speed: 0.00020, thresh: 0.70, brightness: 0.70 },
  { ox:  8.1, oy: 23.4,  freq: 6.8, speed: 0.00009, thresh: 0.74, brightness: 0.45 },
  { ox: 31.0, oy: 12.7,  freq: 3.3, speed: 0.00025, thresh: 0.68, brightness: 0.35 },
]

export default function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    let animId
    let W = 0, H = 0
    let t = 0
    let targetMx = 0.65, targetMy = 0.30
    let smoothMx = 0.65, smoothMy = 0.30

    // Low-res offscreen canvas — written as ImageData, drawn scaled to full canvas
    const lo = document.createElement('canvas')
    const lctx = lo.getContext('2d', { alpha: true, willReadFrequently: true })

    const resize = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
      lo.width  = Math.ceil(W  / SCALE)
      lo.height = Math.ceil(H / SCALE)
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })
    const onMove = e => {
      targetMx = e.clientX / window.innerWidth
      targetMy = e.clientY / window.innerHeight
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    const draw = () => {
      t++
      smoothMx += (targetMx - smoothMx) * 0.04
      smoothMy += (targetMy - smoothMy) * 0.04

      const lW = lo.width, lH = lo.height
      const img = lctx.createImageData(lW, lH)
      const data = img.data

      // Focal centre in low-res coords — right-of-centre, upper area
      const fcx = lW * (0.62 + smoothMx * 0.08)
      const fcy = lH * (0.30 + smoothMy * 0.06)
      // Max radial distance for vignette
      const maxD = Math.sqrt(lW * lW + lH * lH) * 0.55

      // Mouse warp offsets
      const mwx = (smoothMx - 0.5) * 0.22
      const mwy = (smoothMy - 0.5) * 0.14

      for (let py = 0; py < lH; py++) {
        for (let px = 0; px < lW; px++) {
          // Fractional position (0..1)
          const fx = px / lW, fy = py / lH

          // Only compute right portion of screen (left 30% stays dark)
          if (fx < 0.22) { continue }
          // Only compute top 80%
          if (fy > 0.82) { continue }

          // Radial fade from focal point — smooth falloff
          const dx = (px - fcx) / lW, dy = (py - fcy) / lH
          const dist = Math.sqrt(dx*dx * 1.5 + dy*dy)
          const radFade = Math.max(0, 1 - dist * 1.6)
          if (radFade < 0.01) continue

          // Edge fades for natural dissolution
          const edgeL = Math.min(1, (fx - 0.22) / 0.12)
          const edgeR = Math.min(1, (1.0 - fx) / 0.08)
          const edgeT = Math.min(1, (fy + 0.05) / 0.06)
          const edgeB = Math.min(1, (0.82 - fy) / 0.14)
          const edgeFade = Math.min(edgeL, edgeR, edgeT, edgeB)
          if (edgeFade <= 0) continue

          const combine = radFade * edgeFade

          // Sample all noise layers and accumulate
          let totalR = 0, totalG = 0, totalB = 0, totalA = 0

          LAYERS.forEach(L => {
            const time = t * L.speed
            const nx = fx * L.freq + L.ox + time + mwx
            const ny = fy * L.freq + L.oy + time * 0.65 + mwy
            const raw = simplex2(nx, ny)
            const v = Math.abs(raw)  // fold to 0..1

            if (v < L.thresh) return

            // Sharp vein brightness — thin bright lines above threshold
            const vein = Math.pow((v - L.thresh) / (1 - L.thresh), 0.45)

            const a = vein * combine * L.brightness

            // Color: bright yellow-lime core fading to deeper lime at edges
            // Core: rgba(240,255,160) — hot white-lime
            // Mid:  rgba(184,242,36)  — brand lime
            // Edge: rgba(80,160,20)   — deep lime
            const coreMix = Math.pow(vein, 1.8)
            const r = Math.round(80  + coreMix * (240 - 80))
            const g = Math.round(160 + coreMix * (255 - 160))
            const b = Math.round(20  + coreMix * (160 - 20))

            // Additive blend in float (max to avoid oversaturation)
            totalR = Math.min(255, totalR + r * a)
            totalG = Math.min(255, totalG + g * a)
            totalB = Math.min(255, totalB + b * a)
            totalA = Math.min(1,   totalA + a * 0.92)
          })

          if (totalA < 0.005) continue
          const idx = (py * lW + px) * 4
          data[idx]   = Math.round(totalR)
          data[idx+1] = Math.round(totalG)
          data[idx+2] = Math.round(totalB)
          data[idx+3] = Math.round(totalA * 255)
        }
      }

      lctx.putImageData(img, 0, 0)

      // ── Composite to main canvas with scaling (bilinear) ─────────────────
      ctx.clearRect(0, 0, W, H)

      // Bloom: draw scaled lo-res at slight offsets at low alpha for glow
      ctx.globalAlpha = 0.22
      const bOff = 3 * SCALE  // bloom offset in full-res pixels
      const blOffsets = [[-bOff,-bOff],[0,-bOff],[bOff,-bOff],[-bOff,0],[bOff,0],[-bOff,bOff],[0,bOff],[bOff,bOff]]
      blOffsets.forEach(([dx,dy]) => {
        ctx.drawImage(lo, dx, dy, W + Math.abs(dx), H + Math.abs(dy))
      })

      // Wider softer bloom ring
      ctx.globalAlpha = 0.09
      const bOff2 = 6 * SCALE
      const blOffsets2 = [[-bOff2,-bOff2],[0,-bOff2],[bOff2,-bOff2],[-bOff2,0],[bOff2,0],[-bOff2,bOff2],[0,bOff2],[bOff2,bOff2]]
      blOffsets2.forEach(([dx,dy]) => {
        ctx.drawImage(lo, dx, dy, W, H)
      })

      // Sharp caustic layer
      ctx.globalAlpha = 1
      ctx.drawImage(lo, 0, 0, W, H)

      // ── Vignette ─────────────────────────────────────────────────────────
      const vx = W * 0.68, vy = H * 0.28
      const vign = ctx.createRadialGradient(vx, vy, 0, vx, vy, Math.max(W, H) * 0.75)
      vign.addColorStop(0,    'rgba(8,8,8,0)')
      vign.addColorStop(0.28, 'rgba(8,8,8,0)')
      vign.addColorStop(0.60, 'rgba(8,8,8,0.40)')
      vign.addColorStop(0.82, 'rgba(8,8,8,0.72)')
      vign.addColorStop(1,    'rgba(8,8,8,0.96)')
      ctx.fillStyle = vign
      ctx.fillRect(0, 0, W, H)

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ opacity: 1 }}
    />
  )
}
