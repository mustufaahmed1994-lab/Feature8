'use client'
import { useEffect, useRef } from 'react'

// ── Simplex noise 2D ───────────────────────────────────────────────────────────
const _p = new Uint8Array(512)
;(()=>{
  const b=new Uint8Array(256);for(let i=0;i<256;i++)b[i]=i
  for(let i=255;i>0;i--){const j=Math.floor(Math.random()*(i+1));[b[i],b[j]]=[b[j],b[i]]}
  for(let i=0;i<512;i++)_p[i]=b[i&255]
})()
const F2=0.5*(Math.sqrt(3)-1),G2=(3-Math.sqrt(3))/6
const GV=[[1,1],[-1,1],[1,-1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1]]
function sn(x,y){
  const s=(x+y)*F2,i=Math.floor(x+s),j=Math.floor(y+s),tt=(i+j)*G2
  const x0=x-(i-tt),y0=y-(j-tt),i1=x0>y0?1:0,j1=x0>y0?0:1
  const x1=x0-i1+G2,y1=y0-j1+G2,x2=x0-1+2*G2,y2=y0-1+2*G2
  const ii=i&255,jj=j&255
  const g0=GV[_p[ii+_p[jj]]%8],g1=GV[_p[ii+i1+_p[jj+j1]]%8],g2=GV[_p[ii+1+_p[jj+1]]%8]
  const t0=0.5-x0*x0-y0*y0,n0=t0<0?0:t0*t0*t0*t0*(g0[0]*x0+g0[1]*y0)
  const t1=0.5-x1*x1-y1*y1,n1=t1<0?0:t1*t1*t1*t1*(g1[0]*x1+g1[1]*y1)
  const t2=0.5-x2*x2-y2*y2,n2=t2<0?0:t2*t2*t2*t2*(g2[0]*x2+g2[1]*y2)
  return 70*(n0+n1+n2)
}

const LIME=[184,242,36],TEAL=[0,220,170]
function rgba(c,a){return `rgba(${c[0]},${c[1]},${c[2]},${a})`}
function mix(c1,c2,t){return[c1[0]+(c2[0]-c1[0])*t|0,c1[1]+(c2[1]-c1[1])*t|0,c1[2]+(c2[2]-c1[2])*t|0]}

class Node{
  constructor(W,H){this.init(W,H)}
  init(W,H){
    this.W=W;this.H=H
    this.depth=0.15+Math.random()*0.85
    this.baseX=Math.random()*W
    this.baseY=Math.random()*H
    this.x=this.baseX;this.y=this.baseY
    this.r=0.7+this.depth*2.2+Math.random()*0.8
    this.vx=(Math.random()-0.5)*0.22*(0.5+this.depth)
    this.vy=(Math.random()-0.5)*0.22*(0.5+this.depth)
    this.nx=Math.random()*80;this.ny=Math.random()*80
    this.pp=Math.random()*Math.PI*2
    this.ps=0.016+Math.random()*0.024
    this.col=Math.random()<0.88?LIME:TEAL
    this.br=0.35+this.depth*0.6
    this.flash=0
  }
}

export default function ParticleCanvas(){
  const canvasRef=useRef(null)
  useEffect(()=>{
    const canvas=canvasRef.current
    if(!canvas)return
    const ctx=canvas.getContext('2d',{alpha:true})
    let W=0,H=0,animId,t=0
    let mxT=0.75,myT=0.38,mx=0.75,my=0.38
    let scrollY=0
    const N=85
    let nodes=[]
    const CDIST=175

    const build=()=>{
      nodes=[]
      for(let i=0;i<N;i++){const nd=new Node(W,H);nodes.push(nd)}
    }
    const resize=()=>{
      W=canvas.width=window.innerWidth
      H=canvas.height=window.innerHeight
      build()
    }
    resize()
    window.addEventListener('resize',resize,{passive:true})
    window.addEventListener('mousemove',e=>{mxT=e.clientX/innerWidth;myT=e.clientY/innerHeight},{passive:true})
    window.addEventListener('scroll',()=>{scrollY=window.scrollY},{passive:true})

    function drawNode(n){
      const pulse=0.5+0.5*Math.sin(n.pp+t*n.ps)
      const a=n.br*(0.55+0.45*pulse)+n.flash*0.4
      const r=n.r*(1+pulse*0.35+n.flash*0.9)
      const g=ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,r*7)
      g.addColorStop(0,rgba(n.col,Math.min(1,a+n.flash*0.3)))
      g.addColorStop(0.2,rgba(n.col,(a+n.flash*0.15)*0.5))
      g.addColorStop(0.6,rgba(n.col,a*0.08))
      g.addColorStop(1,'rgba(0,0,0,0)')
      ctx.beginPath();ctx.arc(n.x,n.y,r*7,0,Math.PI*2)
      ctx.fillStyle=g;ctx.fill()
      ctx.beginPath();ctx.arc(n.x,n.y,r,0,Math.PI*2)
      ctx.fillStyle=rgba(n.col,Math.min(1,a+n.flash))
      ctx.fill()
    }

    function drawConn(a,b,dist){
      const f=1-dist/CDIST
      const df=(a.depth+b.depth)*0.5
      const alpha=f*f*df*0.6
      if(alpha<0.008)return
      const c=mix(a.col,b.col,0.5)
      ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y)
      ctx.strokeStyle=rgba(c,alpha)
      ctx.lineWidth=0.4+df*1.1
      ctx.stroke()
      // travelling dot
      const prog=((t*0.0025)+(a.nx*0.03+b.ny*0.02))%1
      const px=a.x+(b.x-a.x)*prog
      const py=a.y+(b.y-a.y)*prog
      const pa=f*df*0.65
      const gp=ctx.createRadialGradient(px,py,0,px,py,3+df*4)
      gp.addColorStop(0,rgba(c,pa))
      gp.addColorStop(1,'rgba(0,0,0,0)')
      ctx.beginPath();ctx.arc(px,py,3+df*4,0,Math.PI*2)
      ctx.fillStyle=gp;ctx.fill()
    }

    function drawAurora(){
      const bx=(0.72+sn(t*0.000075,0.2)*0.10+(mx-0.5)*0.07)*W
      const by=(0.38+sn(0.3,t*0.000085)*0.09+(my-0.5)*0.06)*H
      const g1=ctx.createRadialGradient(bx,by,0,bx,by,0.37*W)
      g1.addColorStop(0,'rgba(184,242,36,0.042)')
      g1.addColorStop(0.45,'rgba(120,210,18,0.018)')
      g1.addColorStop(1,'rgba(0,0,0,0)')
      ctx.beginPath();ctx.arc(bx,by,0.37*W,0,Math.PI*2)
      ctx.fillStyle=g1;ctx.fill()

      const bx2=(0.90+sn(t*0.00006+4,1.3)*0.07+(mx-0.5)*0.03)*W
      const by2=(0.18+sn(1.8,t*0.000055+2)*0.09+(my-0.5)*0.04)*H
      const g2=ctx.createRadialGradient(bx2,by2,0,bx2,by2,0.22*W)
      g2.addColorStop(0,'rgba(0,200,155,0.028)')
      g2.addColorStop(1,'rgba(0,0,0,0)')
      ctx.beginPath();ctx.arc(bx2,by2,0.22*W,0,Math.PI*2)
      ctx.fillStyle=g2;ctx.fill()
    }

    function drawScan(){
      const sy=((t*0.32)%H)
      const g=ctx.createLinearGradient(0,sy-8,0,sy+3)
      g.addColorStop(0,'rgba(184,242,36,0)')
      g.addColorStop(0.5,'rgba(184,242,36,0.022)')
      g.addColorStop(1,'rgba(184,242,36,0)')
      ctx.fillStyle=g;ctx.fillRect(0,sy-8,W,11)
    }

    const draw=()=>{
      t++
      mx+=(mxT-mx)*0.025;my+=(myT-my)*0.025
      canvas.style.opacity=Math.max(0,1-scrollY/(H*0.55)).toFixed(3)
      ctx.clearRect(0,0,W,H)
      drawAurora()
      const tm=t*0.000115
      nodes.forEach((n,i)=>{
        const ox=sn(n.nx+tm,i*0.048+tm*0.72)*0.013*W
        const oy=sn(i*0.063+tm*0.79,n.ny+tm)*0.010*H
        n.x=n.baseX+ox+(mx-0.5)*n.depth*52
        n.y=n.baseY+oy+(my-0.5)*n.depth*38
        n.baseX+=n.vx;n.baseY+=n.vy
        if(n.baseX<-55)n.baseX=W+55
        if(n.baseX>W+55)n.baseX=-55
        if(n.baseY<-55)n.baseY=H+55
        if(n.baseY>H+55)n.baseY=-55
        if(n.flash>0)n.flash=Math.max(0,n.flash-0.025)
      })
      ctx.save();ctx.globalCompositeOperation='screen'
      for(let i=0;i<nodes.length;i++){
        for(let j=i+1;j<nodes.length;j++){
          const a=nodes[i],b=nodes[j]
          const dx=a.x-b.x,dy=a.y-b.y,d=Math.sqrt(dx*dx+dy*dy)
          if(d<CDIST)drawConn(a,b,d)
        }
      }
      nodes.forEach(drawNode)
      ctx.restore()
      drawScan()
      animId=requestAnimationFrame(draw)
    }
    draw()
    return()=>{cancelAnimationFrame(animId);window.removeEventListener('resize',resize)}
  },[])

  return(
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  )
}
