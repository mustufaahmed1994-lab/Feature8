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

// Ridge noise: folds noise around 0 to create sharp ridges (veins)
// abs(noise) near 1 → bright vein; near 0 → dark gap
function ridge(nx, ny) {
  const v = sn(nx, ny)            // -1..1
  const r = 1 - Math.abs(v)       // 0..1, peaks at noise zero-crossings
  return r * r                    // sharpen: only top 20% of ridge lights up
}

// Downsample factor — render at 1/4 res, bilinear scale to full
const DS = 4

// Three layers for multi-depth caustic shimmer
const LAYERS = [
  { ox:  0.00, oy:  0.00, freq: 6.5,  speed: 0.00012, w: 1.00 },
  { ox: 17.30, oy:  5.50, freq: 10.5, speed: 0.00018, w: 0.65 },
  { ox:  8.10, oy: 23.40, freq: 16.0, speed: 0.00009, w: 0.35 },
]
const W_SUM = 1.00 + 0.65 + 0.35

export default function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    let animId, W = 0, H = 0, t = 0
    let tMx = 0.72, tMy = 0.25, smx = 0.72, smy = 0.25

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
      smx += (tMx - smx) * 0.03
      smy += (tMy - smy) * 0.03

      const lW = lo.width, lH = lo.height
      const img = lctx.createImageData(lW, lH)
      const d = img.data

      // Focal centre — upper-right, gently mouse-reactive
      const fcx = lW * (0.68 + smx * 0.06)
      const fcy = lH * (0.22 + smy * 0.06)
      const mwx = (smx - 0.5) * 0.18
      const mwy = (smy - 0.5) * 0.12

      // Active region: right 55%, top 80%
      const xStart = Math.floor(lW * 0.40)
      const yEnd   = Math.floor(lH * 0.82)

      for (let py = 0; py < yEnd; py++) {
        const fy = py / lH
        for (let px = xStart; px < lW; px++) {
          const fx = px / lW

          // Radial falloff from focal centre (elliptical)
          const ddx = (px - fcx) / (lW * 0.55)
          const ddy = (py - fcy) / (lH * 0.55)
          const radFade = Math.max(0, 1 - (ddx*ddx + ddy*ddy))
          if (radFade < 0.01) continue

          // Soft edge feather
          const eL = Math.min(1, (fx - 0.40) / 0.08)
          const eR = Math.min(1, (1.0  - fx) / 0.06)
          const eT = Math.min(1, fy / 0.06)
          const eB = Math.min(1, (0.82 - fy) / 0.10)
          const eFade = Math.min(eL, eR, eT, eB)
          if (eFade <= 0) continue

          const mask = Math.pow(radFade, 1.4) * eFade

          // Sum ridge noise across layers
          let bright = 0
          for (let li = 0; li < LAYERS.length; li++) {
            const L = LAYERS[li]
            const tm = t * L.speed
            const nx = fx * L.freq + L.ox + tm + mwx
            const ny = fy * L.freq + L.oy + tm * 0.71 + mwy
            bright += ridge(nx, ny) * L.w
          }
          // Normalize and apply very aggressive sharpening
          // This makes 95% of pixels near-zero and only true ridge peaks glow
          const norm = bright / W_SUM
          const sharp = Math.pow(norm, 3.5)   // very high exponent = ultra-thin veins
          if (sharp < 0.008) continue

          const alpha = sharp * mask
          if (alpha < 0.008) continue

          // Lime-white at peaks, fades to near-black background
          // Keep it subtle: max opacity ~180 even at vein peak
          const r = Math.round(180 + sharp * 64)
          const g = Math.round(220 + sharp * 35)
          const b = Math.round(20  + sharp * 20)
          const a = Math.round(alpha * 180)

          const idx = (py * lW + px) * 4
          d[idx]   = r
          d[idx+1] = g
          d[idx+2] = b
          d[idx+3] = a
        }
      }
      lctx.putImageData(img, 0, 0)

      ctx.clearRect(0, 0, W, H)

      // Glow pass — soft bloom
      ctx.globalAlpha = 0.12
      ctx.filter = 'blur(6px)'
      ctx.drawImage(lo, 0, 0, W, H)
      ctx.filter = 'none'

      // Medium bloom
      ctx.globalAlpha = 0.25
      ctx.filter = 'blur(2px)'
      ctx.drawImage(lo, 0, 0, W, H)
      ctx.filter = 'none'

      // Sharp crisp layer
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
