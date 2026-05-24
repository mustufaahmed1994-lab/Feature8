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
const GV=[[ 1,1],[-1, 1],[ 1,-1],[-1,-1],[ 1,0],[-1,0],[ 0,1],[ 0,-1]]
function noise(x,y){
  const s=(x+y)*F2,i=Math.floor(x+s),j=Math.floor(y+s),t=(i+j)*G2
  const x0=x-(i-t),y0=y-(j-t),i1=x0>y0?1:0,j1=x0>y0?0:1
  const x1=x0-i1+G2,y1=y0-j1+G2,x2=x0-1+2*G2,y2=y0-1+2*G2
  const ii=i&255,jj=j&255
  const g0=GV[_p[ii+_p[jj]]%8],g1=GV[_p[ii+i1+_p[jj+j1]]%8],g2=GV[_p[ii+1+_p[jj+1]]%8]
  const t0=0.5-x0*x0-y0*y0,n0=t0<0?0:t0*t0*t0*t0*(g0[0]*x0+g0[1]*y0)
  const t1=0.5-x1*x1-y1*y1,n1=t1<0?0:t1*t1*t1*t1*(g1[0]*x1+g1[1]*y1)
  const t2=0.5-x2*x2-y2*y2,n2=t2<0?0:t2*t2*t2*t2*(g2[0]*x2+g2[1]*y2)
  return 70*(n0+n1+n2)
}
// ─────────────────────────────────────────────────────────────────────────────

export default function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    let animId, W = 0, H = 0, t = 0
    let mxT = 0.65, myT = 0.40, mx = 0.65, my = 0.40
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
      mx += (mxT - mx) * 0.018
      my += (myT - my) * 0.018

      const tgt = Math.max(0, 1 - scrollY / (H * 0.5))
      canvas.style.opacity = tgt.toFixed(3)

      ctx.clearRect(0, 0, W, H)

      // ── Main large blob — the primary "lava" form ─────────────────────────
      // Mimics the Spline reference: large organic form with bright glowing rim
      // and dark deep interior, positioned right-of-center
      {
        const tm = t * 0.00012
        const ox = noise(0.0 + tm, 0.0 + tm * 0.7) * 0.12
        const oy = noise(3.3 + tm * 0.6, 1.1 + tm) * 0.10
        const cx = (0.70 + ox + (mx - 0.5) * 0.10) * W
        const cy = (0.50 + oy + (my - 0.5) * 0.08) * H

        const breathe = 1 + noise(tm * 1.2, 4.4 + tm * 0.8) * 0.08
        const rx = 0.52 * breathe * W
        const ry = 0.38 * breathe * H

        // Outermost: ambient glow (very faint lime)
        const g1 = ctx.createRadialGradient(cx, cy, ry * 0.0, cx, cy, Math.max(rx, ry) * 1.4)
        g1.addColorStop(0.0,  'rgba(0,0,0,0)')
        g1.addColorStop(0.40, 'rgba(0,0,0,0)')
        g1.addColorStop(0.62, 'rgba(30,55,4,0.12)')
        g1.addColorStop(0.78, 'rgba(60,100,8,0.22)')
        g1.addColorStop(0.88, 'rgba(90,150,12,0.30)')    // mid lime glow
        g1.addColorStop(0.94, 'rgba(160,220,28,0.55)')   // bright rim starts
        g1.addColorStop(0.98, 'rgba(184,242,36,0.75)')   // #b8f224 peak rim
        g1.addColorStop(1.00, 'rgba(220,255,60,0.20)')   // fade out

        ctx.save()
        ctx.translate(cx, cy)
        const rot = noise(tm * 0.4, 9.9) * 0.4
        ctx.rotate(rot)
        ctx.scale(rx / Math.max(rx,ry), ry / Math.max(rx,ry))
        ctx.beginPath()
        ctx.arc(0, 0, Math.max(rx,ry) * 1.4, 0, Math.PI * 2)
        ctx.fillStyle = g1
        ctx.fill()
        ctx.restore()

        // Inner: dark deep center (cool dark green)
        const g2 = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(rx, ry) * 0.9)
        g2.addColorStop(0.0,  'rgba(5,12,2,0.70)')   // near-black green center
        g2.addColorStop(0.50, 'rgba(8,20,3,0.55)')
        g2.addColorStop(0.80, 'rgba(12,30,4,0.35)')
        g2.addColorStop(1.0,  'rgba(0,0,0,0)')

        ctx.save()
        ctx.translate(cx, cy)
        ctx.scale(rx / Math.min(rx,ry), ry / Math.min(rx,ry))
        ctx.beginPath()
        ctx.arc(0, 0, Math.min(rx,ry) * 0.9, 0, Math.PI * 2)
        ctx.fillStyle = g2
        ctx.fill()
        ctx.restore()
      }

      // ── Secondary blob — smaller, offset, adds depth layering ────────────
      {
        const tm = t * 0.00015 + 10.5
        const ox = noise(5.1 + tm, 2.3 + tm * 0.8) * 0.10
        const oy = noise(8.8 + tm * 0.5, 4.4 + tm) * 0.08
        const cx = (0.88 + ox + (mx - 0.5) * 0.06) * W
        const cy = (0.28 + oy + (my - 0.5) * 0.05) * H

        const breathe = 1 + noise(tm * 1.5, 7.7) * 0.12
        const rx = 0.28 * breathe * W
        const ry = 0.22 * breathe * H
        const R = Math.max(rx, ry)

        const g3 = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 1.3)
        g3.addColorStop(0.0,  'rgba(3,8,1,0.50)')
        g3.addColorStop(0.55, 'rgba(0,0,0,0)')
        g3.addColorStop(0.72, 'rgba(40,70,5,0.18)')
        g3.addColorStop(0.86, 'rgba(120,190,20,0.45)')
        g3.addColorStop(0.94, 'rgba(184,242,36,0.65)')
        g3.addColorStop(1.0,  'rgba(0,0,0,0)')

        ctx.save()
        ctx.translate(cx, cy)
        ctx.rotate(noise(tm * 0.3, 2.1) * 0.6)
        ctx.scale(rx / R, ry / R)
        ctx.beginPath()
        ctx.arc(0, 0, R * 1.3, 0, Math.PI * 2)
        ctx.fillStyle = g3
        ctx.fill()
        ctx.restore()
      }

      // ── Third blob — bottom anchor, gives form to the "ground" ────────────
      {
        const tm = t * 0.00009 + 3.7
        const ox = noise(12.4 + tm, 7.1 + tm * 0.6) * 0.08
        const oy = noise(2.2 + tm * 0.4, 15.5 + tm) * 0.07
        const cx = (0.78 + ox + (mx - 0.5) * 0.04) * W
        const cy = (0.72 + oy + (my - 0.5) * 0.04) * H

        const R = 0.32 * W
        const g4 = ctx.createRadialGradient(cx, cy, 0, cx, cy, R)
        g4.addColorStop(0.0,  'rgba(2,6,1,0.45)')
        g4.addColorStop(0.60, 'rgba(0,0,0,0)')
        g4.addColorStop(0.78, 'rgba(25,45,3,0.15)')
        g4.addColorStop(0.90, 'rgba(100,160,16,0.38)')
        g4.addColorStop(0.97, 'rgba(184,242,36,0.55)')
        g4.addColorStop(1.0,  'rgba(0,0,0,0)')

        ctx.beginPath()
        ctx.arc(cx, cy, R, 0, Math.PI * 2)
        ctx.fillStyle = g4
        ctx.fill()
      }

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
