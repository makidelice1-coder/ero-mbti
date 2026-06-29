import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { QUESTIONS } from '../lib/data'

export default function Home() {
  const router = useRouter()
  const [phase, setPhase] = useState('top')
  const [cur, setCur] = useState(0)
  const [ans, setAns] = useState({ E:0,I:0,S:0,N:0,T:0,F:0,J:0,P:0 })
  const [hov, setHov] = useState(null)

  const start = () => { setPhase('quiz'); setCur(0); setAns({E:0,I:0,S:0,N:0,T:0,F:0,J:0,P:0}) }

  const answer = (type) => {
    const next = { ...ans, [type]: ans[type]+1 }
    if (cur+1 < QUESTIONS.length) { setAns(next); setCur(cur+1) }
    else {
      const tp=(next.E>=next.I?'E':'I')+(next.S>=next.N?'S':'N')+(next.T>=next.F?'T':'F')+(next.J>=next.P?'J':'P')
      router.push('/result/'+tp)
    }
  }

  const base = { fontFamily:"'Helvetica Neue',Arial,sans-serif", background:'#222', color:'#f0f0f0' }

  if (phase==='top') return (
    <>
      <Head>
        <title>エロMBTI診断</title>
        <meta name="description" content="あなたの性的傾向を16タイプで丸裸にします。辛口注意。" />
        <meta property="og:title" content="エロMBTI診断 — あなたの性的タイプは？" />
        <meta property="og:description" content="全10問・約1分。あなたの性的傾向を16タイプで丸裸にします。" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>
      <div style={{...base,minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'2rem 1.5rem',textAlign:'center'}}>
        <div style={{fontSize:10,letterSpacing:'0.3em',textTransform:'uppercase',color:'#c06080',marginBottom:'2rem'}}>診断 — 16 types</div>
        <h1 style={{fontSize:42,fontWeight:200,letterSpacing:'-0.03em',lineHeight:1.1,marginBottom:'1rem'}}>
          エロ<span style={{fontWeight:700,color:'#e06080'}}>MBTI</span><br/>診断
        </h1>
        <div style={{width:28,height:1,background:'#444',margin:'1.75rem auto'}}/>
        <p style={{fontSize:14,color:'#888',lineHeight:2,marginBottom:'2.5rem'}}>
          あなたの性的傾向・タイプを<br/>16タイプで丸裸にします<br/>辛口注意。覚悟してから始めて
        </p>
        <button onClick={start} style={{background:'#e06080',color:'#fff',border:'none',padding:'13px 42px',borderRadius:50,fontSize:13,fontWeight:500,letterSpacing:'0.08em',cursor:'pointer'}}>
          診断スタート
        </button>
        <p style={{fontSize:11,color:'#555',marginTop:'1.25rem',letterSpacing:'0.1em'}}>全10問 / 約1分</p>
      </div>
    </>
  )

  const q = QUESTIONS[cur]
  return (
    <>
      <Head><title>エロMBTI診断 — Q{cur+1}</title></Head>
      <div style={{...base,minHeight:'100vh',padding:'2.5rem 1.5rem',maxWidth:600,margin:'0 auto'}}>
        <div style={{height:1,background:'#333',marginBottom:'2.5rem'}}>
          <div style={{height:'100%',background:'#e06080',width:`${Math.round((cur+1)/QUESTIONS.length*100)}%`,transition:'width .35s'}}/>
        </div>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'1.5rem'}}>
          <span style={{fontSize:11,color:'#555',letterSpacing:'0.1em'}}>{cur+1} / {QUESTIONS.length}</span>
          <span style={{fontSize:10,color:'#c06080',border:'1px solid #5a2535',padding:'3px 12px',borderRadius:20}}>{q.axis}</span>
        </div>
        <div style={{fontSize:19,fontWeight:300,lineHeight:1.6,marginBottom:'2rem'}}>{q.text}</div>
        {['a','b'].map(o=>(
          <button key={o} onClick={()=>answer(q[o].t)}
            onMouseEnter={()=>setHov(o)} onMouseLeave={()=>setHov(null)}
            style={{display:'block',width:'100%',background:hov===o?'#2f2226':'#2a2a2a',color:hov===o?'#f0f0f0':'#d0d0d0',border:hov===o?'1px solid #e06080':'1px solid #383838',padding:'15px 20px',borderRadius:10,fontSize:14,textAlign:'left',cursor:'pointer',marginBottom:10,lineHeight:1.5,transition:'all .15s'}}
          >{q[o].l}</button>
        ))}
      </div>
    </>
  )
}
