'use client'
import { useEffect, useRef } from 'react'

// Simplex noise
const _p = new Uint8Array(512)
;(function(){
  const b = new Uint8Array(256)
  for(let i=0;i<256;i++) b[i]=i
  for(let i=255;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}
  for(let i=0;i<512;i++) _p[i]=b[i&255]
})()
const F2=0.5*(Math.sqrt(3)-1),G2=(3-Math.sqrt(3))/6
const GV=[[1,1],[-1,1],[1,-1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1]]
function sn(x,y){
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

// Draw one blob with:
//   - transparent/dark interior (depth)
//   - bright rim edge (lime glow)
//   - transparent exterior (background stays black)
function drawBlob(ctx, cx, cy, rx, ry, rot, rimAlpha) {
  ctx.save()
  ctx.translate(cx, cy)
  ctx.rotate(rot)

  const R = Math.max(rx, ry)

  // Outer glow + rim edge
  const gOut = ctx.createRadialGradient(0,0,R*0.55, 0,0,R)
  gOut.addColorStop(0.00, 'rgba(0,0,0,0)')
  gOut.addColorStop(0.30, `rgba(15,40,3,${rimAlpha*0.18})`)
  gOut.addColorStop(0.60, `rgba(50,110,8,${rimAlpha*0.45})`)
  gOut.addColorStop(0.80, `rgba(130,200,22,${rimAlpha*0.80})`)
  gOut.addColorStop(0.92, `rgba(184,242,36,${rimAlpha*1.00})`)    // peak lime rim
  gOut.addColorStop(1.00, 'rgba(0,0,0,0)')

  ctx.scale(rx/R, ry/R)
  ctx.beginPath()
  ctx.arc(0,0,R,0,Math.PI*2)
  ctx.fillStyle = gOut
  ctx.fill()

  // Dark interior (creates the depth/3D look)
  ctx.scale(R/rx, R/ry)  // undo scale
  const innerR = Math.min(rx,ry) * 0.75
  ctx.scale(rx/R, ry/R)
  const gIn = ctx.createRadialGradient(0,0,0, 0,0,innerR*R/Math.min(rx,ry))
  gIn.addColorStop(0.00, `rgba(0,0,0,${rimAlpha*0.75})`)    // deep black center
  gIn.addColorStop(0.50, `rgba(2,8,1,${rimAlpha*0.60})`)
  gIn.addColorStop(0.80, `rgba(5,15,2,${rimAlpha*0.35})`)
  gIn.addColorStop(1.00, 'rgba(0,0,0,0)')

  ctx.beginPath()
  ctx.arc(0,0,innerR*R/Math.min(rx,ry),0,Math.PI*2)
  ctx.fillStyle = gIn
  ctx.fill()

  ctx.restore()
}

export default function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    let animId, W=0, H=0, t=0
    let mxT=0.75, myT=0.40, mx=0.75, my=0.40
    let scrollY=0

    const resize = () => { W=canvas.width=window.innerWidth; H=canvas.height=window.innerHeight }
    resize()
    window.addEventListener('resize', resize, {passive:true})
    window.addEventListener('mousemove', e=>{ mxT=e.clientX/innerWidth; myT=e.clientY/innerHeight }, {passive:true})
    window.addEventListener('scroll', ()=>{ scrollY=window.scrollY }, {passive:true})

    const draw = () => {
      t++
      mx += (mxT-mx)*0.02
      my += (myT-my)*0.02
      canvas.style.opacity = Math.max(0, 1-scrollY/(H*0.5)).toFixed(3)

      ctx.clearRect(0,0,W,H)

      // ── Blob 1: Main large orb (right side, center-right) ─────────────────
      {
        const tm = t*0.00010
        const ox = sn(0.0+tm, 0.0+tm*0.7)*0.08
        const oy = sn(3.3+tm*0.6, 1.1+tm)*0.07
        const cx = (0.80 + ox + (mx-0.5)*0.08) * W
        const cy = (0.45 + oy + (my-0.5)*0.07) * H
        const breathe = 1 + sn(tm*1.1, 4.4+tm*0.9)*0.07
        const rx = 0.32 * breathe * W
        const ry = 0.38 * breathe * H
        const rot = sn(tm*0.35, 8.8)*0.3
        drawBlob(ctx, cx, cy, rx, ry, rot, 0.90)
      }

      // ── Blob 2: Secondary orb (upper right, slightly behind) ──────────────
      {
        const tm = t*0.00013 + 7.0
        const ox = sn(5.1+tm, 2.3+tm*0.8)*0.07
        const oy = sn(8.8+tm*0.5, 4.4+tm)*0.06
        const cx = (1.00 + ox + (mx-0.5)*0.05) * W
        const cy = (0.22 + oy + (my-0.5)*0.04) * H
        const breathe = 1 + sn(tm*1.3, 6.6)*0.09
        const rx = 0.22 * breathe * W
        const ry = 0.26 * breathe * H
        const rot = sn(tm*0.4, 2.2)*0.5
        drawBlob(ctx, cx, cy, rx, ry, rot, 0.70)
      }

      // ── Blob 3: Smaller accent orb (lower right) ──────────────────────────
      {
        const tm = t*0.00008 + 14.0
        const ox = sn(12.4+tm, 7.1+tm*0.6)*0.06
        const oy = sn(2.2+tm*0.4, 15.5+tm)*0.06
        const cx = (0.92 + ox + (mx-0.5)*0.04) * W
        const cy = (0.75 + oy + (my-0.5)*0.04) * H
        const breathe = 1 + sn(tm*1.2, 3.3)*0.10
        const rx = 0.18 * breathe * W
        const ry = 0.20 * breathe * H
        const rot = sn(tm*0.5, 11.1)*0.4
        drawBlob(ctx, cx, cy, rx, ry, rot, 0.55)
      }

      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  )
}
