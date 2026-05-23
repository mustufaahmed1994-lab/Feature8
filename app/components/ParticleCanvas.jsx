'use client'
import { useEffect, useRef } from 'react'

// ─── Minimal 2D Simplex Noise (no npm required) ─────────────────────────────
// Based on Stefan Gustavson's public domain implementation
const _p = new Uint8Array(512)
const _perm = new Uint8Array(512)
;(function seed() {
  const base = new Uint8Array(256)
  for (let i = 0; i < 256; i++) base[i] = i
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [base[i], base[j]] = [base[j], base[i]]
  }
  for (let i = 0; i < 512; i++) { _p[i] = base[i & 255]; _perm[i] = _p[i] }
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
  const x2 = x0 - 1 + 2 * _G2, y2 = y0 - 1 + 2 * _G2
  const ii = i & 255, jj = j & 255
  const g0 = _grad2[_perm[ii + _perm[jj]] % 8]
  const g1 = _grad2[_perm[ii + i1 + _perm[jj + j1]] % 8]
  const g2 = _grad2[_perm[ii + 1 + _perm[jj + 1]] % 8]
  const t0 = 0.5 - x0*x0 - y0*y0, n0 = t0 < 0 ? 0 : (t0*t0) * (t0*t0) * (g0[0]*x0 + g0[1]*y0)
  const t1 = 0.5 - x1*x1 - y1*y1, n1 = t1 < 0 ? 0 : (t1*t1) * (t1*t1) * (g1[0]*x1 + g1[1]*y1)
  const t2 = 0.5 - x2*x2 - y2*y2, n2 = t2 < 0 ? 0 : (t2*t2) * (t2*t2) * (g2[0]*x2 + g2[1]*y2)
  return 70 * (n0 + n1 + n2) // [-1, 1]
}
// ────────────────────────────────────────────────────────────────────────────

// Aurora blob definition — each has its own noise offsets, color, and scale
const BLOBS = [
  // lime core
  { ox: 0,    oy: 0,    nx: 11.3, ny: 7.4,  sx: 0.55, sy: 0.45, r: 0.42, g: [184,242,36],  baseAlpha: 0.13, speed: 0.00018 },
  // lime secondary
  { ox: 3.1,  oy: 8.7,  nx: 4.2,  ny: 13.1, sx: 0.40, sy: 0.60, r: 0.38, g: [200,255,50],  baseAlpha: 0.09, speed: 0.00022 },
  // deep teal
  { ox: 17.5, oy: 2.3,  nx: 21.4, ny: 5.6,  sx: 0.65, sy: 0.35, r: 0.50, g: [30,200,140],  baseAlpha: 0.08, speed: 0.00014 },
  // muted teal
  { ox: 8.8,  oy: 19.2, nx: 14.7, ny: 3.8,  sx: 0.50, sy: 0.55, r: 0.44, g: [20,160,120],  baseAlpha: 0.07, speed: 0.00017 },
  // lime haze (large, slow)
  { ox: 25.1, oy: 11.6, nx: 7.9,  ny: 22.3, sx: 0.75, sy: 0.70, r: 0.60, g: [184,242,36],  baseAlpha: 0.055, speed: 0.00010 },
  // olive accent
  { ox: 6.4,  oy: 31.2, nx: 18.5, ny: 9.1,  sx: 0.45, sy: 0.50, r: 0.36, g: [140,210,20],  baseAlpha: 0.07, speed: 0.00020 },
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
    let mouse = { x: 0.5, y: 0.4 } // normalised 0-1
    let targetMouse = { x: 0.5, y: 0.4 }
    let smoothMouse = { x: 0.5, y: 0.4 }

    const resize = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const onMove = (e) => {
      targetMouse.x = e.clientX / window.innerWidth
      targetMouse.y = e.clientY / window.innerHeight
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    // Offscreen buffer for the aurora layer (so we can composite with blur)
    const buf = document.createElement('canvas')
    const bctx = buf.getContext('2d', { alpha: true })

    const draw = () => {
      t++

      // Smooth mouse
      smoothMouse.x += (targetMouse.x - smoothMouse.x) * 0.04
      smoothMouse.y += (targetMouse.y - smoothMouse.y) * 0.04

      // Resize buffer if needed
      if (buf.width !== W || buf.height !== H) {
        buf.width = W; buf.height = H
      }

      bctx.clearRect(0, 0, W, H)

      // ── Draw each aurora blob ──
      BLOBS.forEach((b) => {
        const time = t * b.speed

        // Noise-driven centre position (0..1)
        const nx = (simplex2(b.nx + time, b.oy) * 0.5 + 0.5)
        const ny = (simplex2(b.ox, b.ny + time * 0.7) * 0.5 + 0.5)

        // Mouse adds a gentle pull
        const cx = (nx * 0.82 + 0.09) + (smoothMouse.x - 0.5) * 0.06
        const cy = (ny * 0.80 + 0.10) + (smoothMouse.y - 0.5) * 0.06

        // Radii: noise-driven pulsing ellipse
        const pulse = simplex2(b.ox + time * 2, b.oy + time * 1.5) * 0.15 + 1
        const rx = W * b.r * b.sx * pulse
        const ry = H * b.r * b.sy * pulse

        // Alpha: breathe with noise + mouse proximity boost
        const breathe = simplex2(b.nx * 0.5 + time * 3, b.ny * 0.5) * 0.3 + 0.7
        const mdist = Math.hypot(smoothMouse.x - cx, smoothMouse.y - cy)
        const mboost = Math.max(0, 1 - mdist * 3) * 0.06
        const alpha = (b.baseAlpha * breathe + mboost)

        // Build radial gradient — use longer radius axis
        const maxR = Math.max(rx, ry)
        const grd = bctx.createRadialGradient(cx * W, cy * H, 0, cx * W, cy * H, maxR)
        const [r, g, bl] = b.g
        grd.addColorStop(0,   `rgba(${r},${g},${bl},${(alpha * 1.6).toFixed(3)})`)
        grd.addColorStop(0.35,`rgba(${r},${g},${bl},${(alpha * 0.7).toFixed(3)})`)
        grd.addColorStop(0.7, `rgba(${r},${g},${bl},${(alpha * 0.18).toFixed(3)})`)
        grd.addColorStop(1,   `rgba(${r},${g},${bl},0)`)

        // Draw as an ellipse using save/scale trick
        bctx.save()
        bctx.translate(cx * W, cy * H)
        bctx.scale(rx / maxR, ry / maxR)
        bctx.translate(-cx * W, -cy * H)
        bctx.fillStyle = grd
        bctx.beginPath()
        bctx.ellipse(cx * W, cy * H, maxR, maxR, 0, 0, Math.PI * 2)
        bctx.fill()
        bctx.restore()
      })

      // ── Composite to main canvas ──
      ctx.clearRect(0, 0, W, H)

      // Soft vignette — ensures edges stay dark
      const vign = ctx.createRadialGradient(W*0.5, H*0.5, 0, W*0.5, H*0.5, Math.max(W, H) * 0.72)
      vign.addColorStop(0,   'rgba(8,8,8,0)')
      vign.addColorStop(0.6, 'rgba(8,8,8,0)')
      vign.addColorStop(1,   'rgba(8,8,8,0.72)')

      // Draw aurora buffer with CSS-like soft blur via multiple offset draws
      // (Pure canvas blur trick — draw at low alpha with small offsets)
      ctx.globalAlpha = 0.22
      for (let dx = -2; dx <= 2; dx++) {
        for (let dy = -2; dy <= 2; dy++) {
          if (dx === 0 && dy === 0) continue
          ctx.drawImage(buf, dx * 6, dy * 6)
        }
      }
      ctx.globalAlpha = 1
      ctx.drawImage(buf, 0, 0)

      // Vignette on top
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
