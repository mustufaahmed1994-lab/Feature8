'use client'
import { useEffect, useRef } from 'react'

// ─── 2D Simplex Noise (Stefan Gustavson) ─────────────────────────────────────
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
const _F2 = 0.5 * (Math.sqrt(3) - 1), _G2 = (3 - Math.sqrt(3)) / 6
const _g2 = [[1,1],[-1,1],[1,-1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1]]
function sn(xin, yin) {
  const s = (xin + yin) * _F2
  const i = Math.floor(xin + s), j = Math.floor(yin + s)
  const t = (i + j) * _G2
  const x0 = xin - (i - t), y0 = yin - (j - t)
  const i1 = x0 > y0 ? 1 : 0, j1 = x0 > y0 ? 0 : 1
  const x1 = x0 - i1 + _G2, y1 = y0 - j1 + _G2
  const x2 = x0 - 1 + 2 * _G2, y2 = y0 - 1 + 2 * _G2
  const ii = i & 255, jj = j & 255
  const g0 = _g2[_perm[ii + _perm[jj]] % 8]
  const g1 = _g2[_perm[ii + i1 + _perm[jj + j1]] % 8]
  const g2 = _g2[_perm[ii + 1 + _perm[jj + 1]] % 8]
  const t0 = 0.5 - x0*x0 - y0*y0, n0 = t0 < 0 ? 0 : t0*t0*t0*t0*(g0[0]*x0+g0[1]*y0)
  const t1 = 0.5 - x1*x1 - y1*y1, n1 = t1 < 0 ? 0 : t1*t1*t1*t1*(g1[0]*x1+g1[1]*y1)
  const t2 = 0.5 - x2*x2 - y2*y2, n2 = t2 < 0 ? 0 : t2*t2*t2*t2*(g2[0]*x2+g2[1]*y2)
  return 70 * (n0 + n1 + n2)
}
// ─────────────────────────────────────────────────────────────────────────────

// Ridge: fold noise around midpoints to create bright narrow peaks
// The squaring ensures only the very top of each ridge glows bright
function ridge(nx, ny) {
  const v = sn(nx, ny)        // -1..1
  const r = 1 - Math.abs(v)  // peak at zero-crossings
  return r * r * r            // cube = very sharp ridges, near-zero everywhere else
}

// Render at 1/4 resolution, upscale for smooth bilinear stretch
const DS = 4

const LAYERS = [
  { ox:  0.00, oy:  0.00, freq: 5.5,  speed: 0.00011, w: 1.00 },
  { ox: 17.30, oy:  5.50, freq: 9.0,  speed: 0.00016, w: 0.70 },
  { ox:  8.10, oy: 23.40, freq: 14.0, speed: 0.00008, w: 0.40 },
]
const W_SUM = 1.00 + 0.70 + 0.40

export default function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    let animId, W = 0, H = 0, t = 0
    let tMx = 0.72, tMy = 0.22, smx = 0.72, smy = 0.22

    // Off-screen low-res buffer
    const lo = document.createElement('canvas')
    const lctx = lo.getContext('2d', { alpha: true, willReadFrequently: true })

    const resize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
      lo.width  = Math.ceil(W / DS)
      lo.height = Math.ceil(H / DS)
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })
    window.addEventListener('mousemove', e => {
      tMx = e.clientX / window.innerWidth
      tMy = e.clientY / window.innerHeight
    }, { passive: true })

    const draw = () => {
      t++
      smx += (tMx - smx) * 0.025
      smy += (tMy - smy) * 0.025

      const lW = lo.width, lH = lo.height
      const img = lctx.createImageData(lW, lH)
      const d = img.data

      // Focal centre — upper-right quadrant, gently mouse-reactive
      const fcx = lW * (0.70 + smx * 0.05)
      const fcy = lH * (0.18 + smy * 0.05)
      const mwx = (smx - 0.5) * 0.14
      const mwy = (smy - 0.5) * 0.10

      // Render only right 50%, top 78%
      const xStart = Math.floor(lW * 0.42)
      const yEnd   = Math.floor(lH * 0.78)

      for (let py = 0; py < yEnd; py++) {
        const fy = py / lH
        for (let px = xStart; px < lW; px++) {
          const fx = px / lW

          // Elliptical radial falloff from focal centre
          const ddx = (px - fcx) / (lW * 0.50)
          const ddy = (py - fcy) / (lH * 0.50)
          const radFade = Math.max(0, 1 - (ddx*ddx + ddy*ddy))
          if (radFade < 0.01) continue

          // Edge feather
          const eL = Math.min(1, (fx - 0.42) / 0.07)
          const eR = Math.min(1, (1.0  - fx) / 0.05)
          const eT = Math.min(1, fy / 0.05)
          const eB = Math.min(1, (0.78 - fy) / 0.09)
          const eFade = Math.min(eL, eR, eT, eB)
          if (eFade <= 0) continue

          const mask = Math.pow(radFade, 1.6) * eFade

          // Accumulate ridge noise
          let bright = 0
          for (let li = 0; li < LAYERS.length; li++) {
            const L = LAYERS[li]
            const tm = t * L.speed
            const nx = fx * L.freq + L.ox + tm       + mwx
            const ny = fy * L.freq + L.oy + tm * 0.68 + mwy
            bright += ridge(nx, ny) * L.w
          }

          // Normalize and apply ultra-sharp curve
          // pow(norm, 2.8): 95%+ of pixels near-zero → true black gaps
          const norm    = bright / W_SUM
          const sharp   = Math.pow(norm, 2.8)
          if (sharp < 0.006) continue

          const alpha = sharp * mask
          if (alpha < 0.006) continue

          // Pure lime-white at peaks, falls to transparent (not green)
          // High R+G with low B = clean acid lime
          const r = Math.round(210 + sharp * 45)
          const g = Math.round(235 + sharp * 20)
          const b = Math.round(30  + sharp * 10)
          const a = Math.round(alpha * 200)

          const idx = (py * lW + px) * 4
          d[idx]   = r
          d[idx+1] = g
          d[idx+2] = b
          d[idx+3] = a
        }
      }
      lctx.putImageData(img, 0, 0)

      // ── Composite to main canvas ─────────────────────────────────────────
      ctx.clearRect(0, 0, W, H)

      // Wide soft glow — very low opacity to avoid green haze
      ctx.globalAlpha = 0.08
      ctx.filter = 'blur(8px)'
      ctx.drawImage(lo, 0, 0, W, H)
      ctx.filter = 'none'

      // Tight bloom
      ctx.globalAlpha = 0.20
      ctx.filter = 'blur(2px)'
      ctx.drawImage(lo, 0, 0, W, H)
      ctx.filter = 'none'

      // Crisp sharp veins at full opacity
      ctx.globalAlpha = 1
      ctx.drawImage(lo, 0, 0, W, H)

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
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
