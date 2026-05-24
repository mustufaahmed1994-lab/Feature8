'use client'
import { useEffect, useRef } from 'react'

// ─── 2D Simplex Noise (Stefan Gustavson) ────────────────────────────────────
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
const _F2 = 0.5*(Math.sqrt(3)-1), _G2 = (3-Math.sqrt(3))/6
const _g2 = [[1,1],[-1,1],[1,-1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1]]
function sn(xin, yin) {
  const s=(xin+yin)*_F2, i=Math.floor(xin+s), j=Math.floor(yin+s)
  const t=(i+j)*_G2, x0=xin-(i-t), y0=yin-(j-t)
  const i1=x0>y0?1:0, j1=x0>y0?0:1
  const x1=x0-i1+_G2, y1=y0-j1+_G2, x2=x0-1+2*_G2, y2=y0-1+2*_G2
  const ii=i&255, jj=j&255
  const g0=_g2[_perm[ii+_perm[jj]]%8], g1=_g2[_perm[ii+i1+_perm[jj+j1]]%8], g2=_g2[_perm[ii+1+_perm[jj+1]]%8]
  const t0=0.5-x0*x0-y0*y0, n0=t0<0?0:(t0*t0)*(t0*t0)*(g0[0]*x0+g0[1]*y0)
  const t1=0.5-x1*x1-y1*y1, n1=t1<0?0:(t1*t1)*(t1*t1)*(g1[0]*x1+g1[1]*y1)
  const t2=0.5-x2*x2-y2*y2, n2=t2<0?0:(t2*t2)*(t2*t2)*(g2[0]*x2+g2[1]*y2)
  return 70*(n0+n1+n2)  // range approx -1..1
}
// Numerical gradient — sample noise at offset ±eps, compute slope magnitude
// High gradient = caustic vein location (steep slope of noise field)
const EPS = 0.004
function causticVal(x, y) {
  const dx = (sn(x+EPS, y) - sn(x-EPS, y)) / (2*EPS)
  const dy = (sn(x, y+EPS) - sn(x, y-EPS)) / (2*EPS)
  const grad = Math.sqrt(dx*dx + dy*dy)
  // Invert and sharpen — peaks where gradient is steepest
  return Math.pow(Math.min(1, grad / 28), 0.55)
}
// ─────────────────────────────────────────────────────────────────────────────

// Render at 1/3 resolution, bilinear-scale up
const DS = 3  // downsample factor

// Four caustic layers — different noise scales/speeds for multi-layer depth
const LAYERS = [
  { ox:  0.00, oy:  0.00, freq: 8.0,  speed: 0.00016, weight: 1.00 },
  { ox: 17.30, oy:  5.50, freq: 13.5, speed: 0.00022, weight: 0.60 },
  { ox:  8.10, oy: 23.40, freq: 19.0, speed: 0.00011, weight: 0.38 },
  { ox: 31.00, oy: 12.70, freq: 6.5,  speed: 0.00027, weight: 0.28 },
]

export default function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    let animId, W = 0, H = 0, t = 0
    let targetMx = 0.70, targetMy = 0.28
    let smx = 0.70, smy = 0.28

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
      targetMx = e.clientX / window.innerWidth
      targetMy = e.clientY / window.innerHeight
    }, { passive: true })

    const draw = () => {
      t++
      smx += (targetMx - smx) * 0.04
      smy += (targetMy - smy) * 0.04

      const lW = lo.width, lH = lo.height
      const img = lctx.createImageData(lW, lH)
      const d = img.data

      // Focal centre — upper-right, mouse-reactive
      const fcx = lW * (0.60 + smx * 0.10)
      const fcy = lH * (0.28 + smy * 0.07)
      // Mouse distortion offsets to noise coords
      const mwx = (smx - 0.5) * 0.30
      const mwy = (smy - 0.5) * 0.20

      for (let py = 0; py < lH; py++) {
        const fy = py / lH
        if (fy > 0.85) continue

        for (let px = 0; px < lW; px++) {
          const fx = px / lW
          if (fx < 0.18) continue  // left 18% stays dark

          // Radial fade — falls off from focal centre
          const ddx = (px - fcx) / lW, ddy = (py - fcy) / lH
          const distSq = ddx*ddx * 1.4 + ddy*ddy
          const radFade = Math.max(0, 1 - distSq * 2.8)
          if (radFade < 0.01) continue

          // Edge dissolve
          const eL = Math.min(1, (fx - 0.18) / 0.10)
          const eR = Math.min(1, (1.0 - fx) / 0.07)
          const eT = Math.min(1, fy / 0.05 + 0.3)
          const eB = Math.min(1, (0.85 - fy) / 0.12)
          const eFade = Math.min(eL, eR, eT, eB)
          if (eFade <= 0) continue

          const mask = radFade * eFade

          // Accumulate caustic brightness from all layers
          let bright = 0
          LAYERS.forEach(L => {
            const time = t * L.speed
            const nx = fx * L.freq + L.ox + time + mwx
            const ny = fy * L.freq + L.oy + time * 0.62 + mwy
            bright += causticVal(nx, ny) * L.weight
          })
          // Normalize by sum of weights and sharpen curve
          const totalW = 1.00 + 0.60 + 0.38 + 0.28
          const norm = Math.min(1, bright / totalW)
          const sharpened = Math.pow(norm, 1.6)  // push most pixels darker, peaks brighter

          const a = sharpened * mask
          if (a < 0.015) continue

          // Color gradient: bright core = near-white lime, dimmer = deep lime
          const r = Math.round(60  + sharpened * (245 - 60))
          const g = Math.round(140 + sharpened * (255 - 140))
          const b = Math.round(10  + sharpened * (120 - 10))

          const idx = (py * lW + px) * 4
          d[idx]   = r
          d[idx+1] = g
          d[idx+2] = b
          d[idx+3] = Math.round(a * 230)
        }
      }
      lctx.putImageData(img, 0, 0)

      // ── Composite ────────────────────────────────────────────────────────
      ctx.clearRect(0, 0, W, H)

      // Bloom: 8-directional offset at low alpha
      const bo = 2 * DS
      ctx.globalAlpha = 0.18
      for (let dx = -bo; dx <= bo; dx += bo) {
        for (let dy = -bo; dy <= bo; dy += bo) {
          if (dx === 0 && dy === 0) continue
          ctx.drawImage(lo, dx, dy, W, H)
        }
      }
      // Wider bloom ring
      const bo2 = 5 * DS
      ctx.globalAlpha = 0.08
      for (let dx = -bo2; dx <= bo2; dx += bo2) {
        for (let dy = -bo2; dy <= bo2; dy += bo2) {
          if (dx === 0 && dy === 0) continue
          ctx.drawImage(lo, dx, dy, W, H)
        }
      }
      // Sharp layer
      ctx.globalAlpha = 1
      ctx.drawImage(lo, 0, 0, W, H)

      // ── Vignette ─────────────────────────────────────────────────────────
      const vx = W * 0.66, vy = H * 0.25
      const vign = ctx.createRadialGradient(vx, vy, 0, vx, vy, Math.max(W,H) * 0.80)
      vign.addColorStop(0,    'rgba(8,8,8,0)')
      vign.addColorStop(0.25, 'rgba(8,8,8,0)')
      vign.addColorStop(0.58, 'rgba(8,8,8,0.38)')
      vign.addColorStop(0.80, 'rgba(8,8,8,0.72)')
      vign.addColorStop(1,    'rgba(8,8,8,0.97)')
      ctx.fillStyle = vign
      ctx.fillRect(0, 0, W, H)

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
