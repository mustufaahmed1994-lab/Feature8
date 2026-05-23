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

// Caustic layer config — each layer has its own noise offsets, scale, speed
// The vein threshold and width define how fine/broad the caustic lines are
const LAYERS = [
  { ox:  0.00, oy:  0.00, scale: 2.8, speed: 0.00012, thresh: 0.68, lineW: 1.8, alpha: 0.70 },
  { ox: 17.30, oy:  5.50, scale: 4.2, speed: 0.00017, thresh: 0.72, lineW: 1.2, alpha: 0.55 },
  { ox:  8.10, oy: 23.40, scale: 6.5, speed: 0.00009, thresh: 0.75, lineW: 0.7, alpha: 0.40 },
  { ox: 31.00, oy: 12.70, scale: 3.5, speed: 0.00021, thresh: 0.70, lineW: 1.0, alpha: 0.30 },
]

// Sample resolution — lower = more detail but heavier CPU (20 is a good balance)
const STEP = 20

export default function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    let animId
    let W = 0, H = 0
    let t = 0
    let targetMx = 0.62, targetMy = 0.35
    let smoothMx = 0.62, smoothMy = 0.35

    const resize = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })
    const onMove = e => {
      targetMx = e.clientX / window.innerWidth
      targetMy = e.clientY / window.innerHeight
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    // Off-screen buffer for caustic veins (drawn once per frame, then bloom-blurred onto main canvas)
    const buf  = document.createElement('canvas')
    const bctx = buf.getContext('2d', { alpha: true })
    // Second buffer for bloom pass
    const bloom  = document.createElement('canvas')
    const blctx  = bloom.getContext('2d', { alpha: true })

    const draw = () => {
      t++
      smoothMx += (targetMx - smoothMx) * 0.04
      smoothMy += (targetMy - smoothMy) * 0.04

      if (buf.width !== W || buf.height !== H) {
        buf.width = W; buf.height = H
        bloom.width = W; bloom.height = H
      }

      bctx.clearRect(0, 0, W, H)

      // ── Draw caustic veins per layer ─────────────────────────────────────
      // Region: upper-right quadrant (right 65%, top 70% of viewport)
      // Caustic veins are lit wherever |noise| exceeds the threshold — this
      // creates the bright narrow-vein look of real water caustics.
      const regionX0 = W * 0.28   // veins start 28% from left
      const regionY0 = 0
      const regionX1 = W * 1.00
      const regionY1 = H * 0.78   // veins stop at 78% height
      const rW = regionX1 - regionX0
      const rH = regionY1 - regionY0

      LAYERS.forEach(L => {
        const time = t * L.speed
        // Mouse adds a gentle distortion warp to the noise coordinates
        const mwarpX = (smoothMx - 0.5) * 0.18
        const mwarpY = (smoothMy - 0.5) * 0.12

        for (let py = regionY0; py < regionY1; py += STEP) {
          for (let px = regionX0; px < regionX1; px += STEP) {
            const nx = (px / W) * L.scale + L.ox + time + mwarpX
            const ny = (py / H) * L.scale + L.oy + time * 0.7 + mwarpY
            const raw = simplex2(nx, ny)  // -1..1 range
            const v = Math.abs(raw)        // fold to 0..1

            if (v >= L.thresh) {
              // Brightness ramps sharply from threshold to 1 — creates thin bright veins
              const bright = Math.pow((v - L.thresh) / (1 - L.thresh), 0.5)

              // Fade at region boundaries so veins dissolve naturally at edges
              const fadeX = Math.min(1,
                Math.min((px - regionX0) / (rW * 0.18), (regionX1 - px) / (rW * 0.14))
              )
              const fadeY = Math.min(1,
                Math.min((py - regionY0 + 40) / (rH * 0.12), (regionY1 - py) / (rH * 0.20))
              )
              const fade = Math.min(fadeX, fadeY)

              // Also fade based on distance from a "focal point" in upper-right
              const fx = W * (0.58 + smoothMx * 0.10)
              const fy = H * (0.22 + smoothMy * 0.08)
              const dist = Math.sqrt(((px-fx)/W)*((px-fx)/W)*1.6 + ((py-fy)/H)*((py-fy)/H))
              const radFade = Math.max(0, 1 - dist * 1.35)

              const finalAlpha = bright * fade * radFade * L.alpha
              if (finalAlpha < 0.01) continue

              // Core vein — lime white-hot center
              bctx.globalAlpha = finalAlpha
              bctx.fillStyle = `rgba(220,255,140,${Math.min(bright * 0.9, 1).toFixed(3)})`
              bctx.fillRect(px - L.lineW * 0.5, py - L.lineW * 0.5, L.lineW * STEP * 0.55, L.lineW * STEP * 0.55)

              // Outer lime halo
              bctx.globalAlpha = finalAlpha * 0.45
              bctx.fillStyle = `rgba(184,242,36,${(bright * 0.6).toFixed(3)})`
              bctx.fillRect(px - L.lineW, py - L.lineW, L.lineW * STEP * 0.9, L.lineW * STEP * 0.9)
            }
          }
        }
      })
      bctx.globalAlpha = 1

      // ── Bloom pass ────────────────────────────────────────────────────────
      // Draw the vein buffer offset in 8 directions at low alpha to feather/bloom
      blctx.clearRect(0, 0, W, H)
      const offsets = [[-10,-10],[0,-10],[10,-10],[-10,0],[10,0],[-10,10],[0,10],[10,10]]
      offsets.forEach(([dx,dy]) => {
        blctx.globalAlpha = 0.13
        blctx.drawImage(buf, dx, dy)
      })
      // Wider, softer bloom ring
      const off2 = [[-22,-22],[0,-22],[22,-22],[-22,0],[22,0],[-22,22],[0,22],[22,22]]
      off2.forEach(([dx,dy]) => {
        blctx.globalAlpha = 0.06
        blctx.drawImage(buf, dx, dy)
      })
      blctx.globalAlpha = 1

      // ── Composite onto main canvas ────────────────────────────────────────
      ctx.clearRect(0, 0, W, H)
      ctx.drawImage(bloom, 0, 0)   // soft bloom layer under sharp veins
      ctx.drawImage(buf,   0, 0)   // sharp vein layer on top

      // ── Vignette ─────────────────────────────────────────────────────────
      // Strong vignette: everything except the upper-right focal zone goes dark
      const vx = W * 0.72, vy = H * 0.28
      const vign = ctx.createRadialGradient(vx, vy, 0, vx, vy, Math.max(W, H) * 0.72)
      vign.addColorStop(0,    'rgba(8,8,8,0)')
      vign.addColorStop(0.35, 'rgba(8,8,8,0.05)')
      vign.addColorStop(0.65, 'rgba(8,8,8,0.45)')
      vign.addColorStop(0.85, 'rgba(8,8,8,0.75)')
      vign.addColorStop(1,    'rgba(8,8,8,0.95)')
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
