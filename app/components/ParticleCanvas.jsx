'use client'
import { useEffect, useRef } from 'react'

// ─── Simplex Noise ────────────────────────────────────────────────────────────
const _p = new Uint8Array(512)
;(function(){
  const b = new Uint8Array(256)
  for (let i=0;i<256;i++) b[i]=i
  for (let i=255;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}
  for (let i=0;i<512;i++) _p[i]=b[i&255]
})()
const F2=0.5*(Math.sqrt(3)-1),G2=(3-Math.sqrt(3))/6
const G=[[ 1,1],[-1, 1],[ 1,-1],[-1,-1],[ 1,0],[-1,0],[ 0,1],[ 0,-1]]
function noise(x,y){
  const s=(x+y)*F2,i=Math.floor(x+s),j=Math.floor(y+s),t=(i+j)*G2
  const x0=x-(i-t),y0=y-(j-t),i1=x0>y0?1:0,j1=x0>y0?0:1
  const x1=x0-i1+G2,y1=y0-j1+G2,x2=x0-1+2*G2,y2=y0-1+2*G2
  const ii=i&255,jj=j&255
  const g0=G[_p[ii+_p[jj]]%8],g1=G[_p[ii+i1+_p[jj+j1]]%8],g2=G[_p[ii+1+_p[jj+1]]%8]
  const t0=0.5-x0*x0-y0*y0,n0=t0<0?0:t0*t0*t0*t0*(g0[0]*x0+g0[1]*y0)
  const t1=0.5-x1*x1-y1*y1,n1=t1<0?0:t1*t1*t1*t1*(g1[0]*x1+g1[1]*y1)
  const t2=0.5-x2*x2-y2*y2,n2=t2<0?0:t2*t2*t2*t2*(g2[0]*x2+g2[1]*y2)
  return 70*(n0+n1+n2) // -1..1
}
// ─────────────────────────────────────────────────────────────────────────────

// 6 gradient blobs, each with its own noise-driven position and size
const BLOBS = [
  { nx:0,    ny:0,    freq:0.28, sp:0.00018, baseX:0.72, baseY:0.60, r:0.42, a:0.82 },
  { nx:5.1,  ny:2.3,  freq:0.22, sp:0.00013, baseX:0.88, baseY:0.30, r:0.30, a:0.55 },
  { nx:12.4, ny:7.1,  freq:0.35, sp:0.00024, baseX:0.60, baseY:0.72, r:0.28, a:0.48 },
  { nx:3.7,  ny:14.2, freq:0.18, sp:0.00010, baseX:0.95, baseY:0.55, r:0.22, a:0.38 },
  { nx:8.9,  ny:3.6,  freq:0.40, sp:0.00030, baseX:0.78, baseY:0.20, r:0.18, a:0.32 },
  { nx:1.2,  ny:9.8,  freq:0.25, sp:0.00016, baseX:0.55, baseY:0.45, r:0.24, a:0.42 },
]

export default function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    let animId, W = 0, H = 0, t = 0
    let mxT = 0.72, myT = 0.50, mx = 0.72, my = 0.50
    let scrollY = 0

    const resize = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })
    window.addEventListener('mousemove', e => {
      mxT = e.clientX / window.innerWidth
      myT = e.clientY / window.innerHeight
    }, { passive: true })
    window.addEventListener('scroll', () => { scrollY = window.scrollY }, { passive: true })

    const draw = () => {
      t++
      mx += (mxT - mx) * 0.02
      my += (myT - my) * 0.02

      // Scroll fade
      const tgt = Math.max(0, 1 - scrollY / (H * 0.45))
      canvas.style.opacity = tgt.toFixed(3)

      ctx.clearRect(0, 0, W, H)

      // Draw each blob as a large radial gradient
      // The blobs are positioned using noise for organic drift
      // + mouse offset for interactivity
      for (let i = 0; i < BLOBS.length; i++) {
        const b = BLOBS[i]
        const tm = t * b.sp

        // Noise-driven position offset (slow organic drift)
        const ox = noise(b.nx + tm, b.ny + tm * 0.7) * 0.18
        const oy = noise(b.nx + tm * 0.6 + 3.3, b.ny + tm + 1.1) * 0.14

        // Mouse influence (closer blobs react more)
        const mInfluence = (i % 3 === 0) ? 0.12 : (i % 3 === 1) ? 0.07 : 0.04

        const cx = (b.baseX + ox + (mx - 0.5) * mInfluence) * W
        const cy = (b.baseY + oy + (my - 0.5) * mInfluence) * H

        // Radius also slowly breathes
        const breathe = 1 + noise(b.nx + tm * 1.3, b.ny * 2 + tm) * 0.15
        const rx = b.r * breathe * W
        const ry = b.r * breathe * H * 0.7
        const R = Math.max(rx, ry)

        // Create radial gradient for this blob
        // Inner: bright lime-white core
        // Mid: rich lime
        // Outer: deep dark lime-black, transparent
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, R)
        grad.addColorStop(0.00, `rgba(220,255,60,${b.a * 0.35})`)   // bright lime core
        grad.addColorStop(0.15, `rgba(184,242,36,${b.a * 0.55})`)   // #b8f224 lime
        grad.addColorStop(0.35, `rgba(120,180,10,${b.a * 0.42})`)   // mid lime
        grad.addColorStop(0.58, `rgba(40,80,5,${b.a * 0.28})`)      // dark lime
        grad.addColorStop(0.80, `rgba(10,25,2,${b.a * 0.10})`)      // near-black
        grad.addColorStop(1.00, `rgba(0,0,0,0)`)                     // transparent

        ctx.globalCompositeOperation = 'screen'
        ctx.fillStyle = grad
        ctx.beginPath()
        // Draw an ellipse for each blob
        ctx.ellipse(cx, cy, rx, ry, noise(b.nx*2, b.ny*2+tm*0.3) * 0.8, 0, Math.PI * 2)
        ctx.fill()
      }

      // Final edge glow pass: bright lime rim along the "horizon" of all blobs
      // Uses a wide horizontal gradient that simulates the hot edge seen in the Spline reference
      ctx.globalCompositeOperation = 'screen'
      const rimGrad = ctx.createLinearGradient(W * 0.35, H * 0.15, W * 1.1, H * 0.85)
      rimGrad.addColorStop(0.0,  'rgba(0,0,0,0)')
      rimGrad.addColorStop(0.30, `rgba(184,242,36,0.04)`)
      rimGrad.addColorStop(0.50, `rgba(220,255,80,0.08)`)
      rimGrad.addColorStop(0.70, `rgba(184,242,36,0.05)`)
      rimGrad.addColorStop(1.0,  'rgba(0,0,0,0)')
      ctx.fillStyle = rimGrad
      ctx.fillRect(0, 0, W, H)

      ctx.globalCompositeOperation = 'source-over'
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
    />
  )
}
