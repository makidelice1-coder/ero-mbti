import { useRouter } from 'next/router'
import Head from 'next/head'
import { useState } from 'react'
import { TYPES, LINE_URLS } from '../../lib/data'

export default function Result() {
  const router = useRouter()
  const { type, v } = router.query
  const ver = parseInt(v) || 1
  const d = TYPES[type] || null
  const [copied, setCopied] = useState(false)

  if (!d) return (
    <div style={{background:'#222',color:'#888',minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:"'Helvetica Neue',Arial,sans-serif"}}>
      <div style={{textAlign:'center'}}>
        <div style={{fontSize:32,marginBottom:16}}>🔍</div>
        <div style={{fontSize:14,marginBottom:20}}>タイプが見つかりません</div>
        <button onClick={()=>router.push('/')} style={{background:'#e06080',color:'#fff',border:'none',padding:'10px 28px',borderRadius:50,fontSize:13,cursor:'pointer'}}>診断をやり直す</button>
      </div>
    </div>
  )

  const baseLineUrl = LINE_URLS[ver] || LINE_URLS[1]
  const lineUrl = `${baseLineUrl}?type=${type}`
  const shareText = `私のエロMBTIタイプは「${d.name}」(${type}) でした\nあなたも診断してみて👇`

  const copy = () => {
    navigator.clipboard.writeText(shareText + '\n' + (typeof window !== 'undefined' ? window.location.href : ''))
    setCopied(true); setTimeout(()=>setCopied(false),2000)
  }

  const base = {fontFamily:"'Helvetica Neue',Arial,sans-serif",background:'#222',color:'#f0f0f0'}

  return (
    <>
      <Head>
        <title>{d.name}（{type}）— エロMBTI診断</title>
        <meta name="description" content={`${d.catch} | エロMBTI診断`} />
        <meta property="og:title" content={`私のエロMBTIタイプは「${d.name}」`} />
        <meta property="og:description" content={`${d.catch}\nあなたも診断してみて`} />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>
      <div style={{...base,minHeight:'100vh',padding:'2.5rem 1.5rem',maxWidth:600,margin:'0 auto'}}>

        {/* 見えるゾーン */}
        <div style={{paddingBottom:'1.75rem',marginBottom:'1.75rem',borderBottom:'1px solid #333'}}>
          <div style={{fontSize:10,letterSpacing:'0.22em',color:'#555',textTransform:'uppercase',marginBottom:'1rem',display:'flex',alignItems:'center',gap:10}}>
            あなたのタイプ
            <span style={{fontSize:11,color:'#e06080',border:'1px solid #5a2535',padding:'2px 10px',borderRadius:4,letterSpacing:'0.14em'}}>{type}</span>
          </div>
          <div style={{fontSize:44,marginBottom:'.8rem',lineHeight:1}}>{d.emoji}</div>
          <div style={{fontSize:23,fontWeight:500,letterSpacing:'-0.02em',lineHeight:1.3,marginBottom:'.35rem'}}>{d.name}</div>
          <div style={{fontSize:13,color:'#888',fontWeight:300,marginBottom:'1rem'}}>{d.catch}</div>
          <span style={{fontSize:11,color:'#e06080',background:'rgba(224,96,128,.1)',border:'1px solid rgba(224,96,128,.25)',display:'inline-block',padding:'4px 12px',borderRadius:20}}>{d.rare}</span>
          <div style={{display:'flex',flexWrap:'wrap',gap:6,marginTop:'1rem'}}>
            {d.traits.map(t=>(
              <span key={t} style={{fontSize:11,padding:'4px 12px',borderRadius:20,border:'1px solid #3a3a3a',color:'#888',background:'#2a2a2a'}}>{t}</span>
            ))}
          </div>
        </div>

        {/* ぼかしゾーン */}
        <div style={{position:'relative',marginBottom:'1.5rem'}}>
          <div style={{filter:'blur(6px)',userSelect:'none',pointerEvents:'none',opacity:0.5}}>
            <div style={{marginBottom:'1.5rem'}}>
              <div style={{fontSize:10,letterSpacing:'0.2em',color:'#555',textTransform:'uppercase',marginBottom:'.85rem',paddingBottom:'.6rem',borderBottom:'1px solid #333'}}>基本ステータス</div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:8}}>
                {Object.entries(d.stats).map(([k,v])=>(
                  <div key={k} style={{padding:'12px 14px',background:'#2a2a2a',borderRadius:8,border:'1px solid #333'}}>
                    <div style={{fontSize:11,color:'#555',marginBottom:5}}>{k}</div>
                    <div style={{fontSize:13,color:'#e06080'}}>{v}</div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{marginBottom:'1.5rem'}}>
              <div style={{fontSize:10,letterSpacing:'0.2em',color:'#555',textTransform:'uppercase',marginBottom:'.85rem',paddingBottom:'.6rem',borderBottom:'1px solid #333'}}>詳細プロファイル</div>
              <div style={{fontSize:14,color:'#888',lineHeight:2,fontWeight:300}}>{d.desc}</div>
            </div>
            <div style={{marginBottom:'1.5rem'}}>
              <div style={{fontSize:10,letterSpacing:'0.2em',color:'#555',textTransform:'uppercase',marginBottom:'.85rem',paddingBottom:'.6rem',borderBottom:'1px solid #333'}}>相性診断</div>
              <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
                {[{label:'相性◎',icon:d.good.e,name:d.good.name},{label:'最悪の相性',icon:d.bad.e,name:d.bad.name}].map(c=>(
                  <div key={c.label} style={{padding:'14px 16px',border:'1px solid #333',borderRadius:10,background:'#2a2a2a'}}>
                    <div style={{fontSize:18,marginBottom:6}}>{c.icon}</div>
                    <div style={{fontSize:10,color:'#555',marginBottom:5,textTransform:'uppercase'}}>{c.label}</div>
                    <div style={{fontSize:13,color:'#d0d0d0',lineHeight:1.4}}>{c.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* ロックオーバーレイ */}
          <div style={{position:'absolute',inset:0,display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',zIndex:2}}>
            <div style={{fontSize:28,marginBottom:8}}>🔒</div>
            <div style={{fontSize:13,color:'#f0f0f0',fontWeight:500,textAlign:'center',lineHeight:1.5}}>続きはLINE登録で解放</div>
            <div style={{fontSize:11,color:'#888',marginTop:4,textAlign:'center'}}>ステータス・プロファイル・相性診断が全部見られる</div>
          </div>
        </div>

        {/* LINE CTA */}
        <div style={{background:'#1a1a1a',border:'1px solid #2e2e2e',borderRadius:14,padding:'1.75rem 1.5rem',marginBottom:'1.5rem',textAlign:'center'}}>
          <div style={{fontSize:10,letterSpacing:'0.2em',color:'#555',textTransform:'uppercase',marginBottom:'.75rem'}}>無料 / 1秒で受け取れます</div>
          <div style={{fontSize:18,fontWeight:500,color:'#f0f0f0',marginBottom:'.4rem',lineHeight:1.4}}>LINE登録で<br/>全コンテンツを解放</div>
          <div style={{fontSize:12,color:'#666',lineHeight:1.7,marginBottom:'1.25rem'}}>あなたの診断結果の全文＋全16タイプの取扱説明書が読み放題</div>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:6,marginBottom:'1.25rem',textAlign:'left'}}>
            {['辛口プロファイル全文','相性◎と💀の詳細','行動パターン・地雷','全16タイプ読み放題'].map(p=>(
              <div key={p} style={{fontSize:12,color:'#666',padding:'8px 10px',background:'#242424',borderRadius:6,border:'1px solid #2e2e2e',display:'flex',gap:6,lineHeight:1.4}}>
                <span style={{color:'#e06080',flexShrink:0,fontSize:10,marginTop:1}}>●</span>{p}
              </div>
            ))}
          </div>
          <a href={lineUrl} target="_blank" rel="noopener noreferrer"
            style={{display:'flex',alignItems:'center',justifyContent:'center',gap:10,background:'#06C755',color:'#fff',textDecoration:'none',width:'100%',padding:15,borderRadius:10,fontSize:14,fontWeight:500,letterSpacing:'0.04em'}}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M12 2C6.48 2 2 6.02 2 11c0 3.53 2.1 6.6 5.23 8.34L6 22l3.13-1.57C10.03 20.77 11 21 12 21c5.52 0 10-4.02 10-9S17.52 2 12 2z"/></svg>
            LINE で全文を受け取る（無料）
          </a>
          <div style={{marginTop:'1.25rem',background:'#242424',border:'1px solid #333',borderRadius:10,padding:'1rem'}}>
            <div style={{fontSize:11,color:'#555',letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:'0.5rem'}}>登録後にやること</div>
            <div style={{fontSize:13,color:'#888',lineHeight:1.8}}>LINEに追加したら、そのまま</div>
            <div style={{margin:'0.6rem 0',background:'#1a1a1a',border:'1px solid #5a2535',borderRadius:8,padding:'10px'}}>
              <span style={{fontSize:22,fontWeight:700,color:'#e06080',letterSpacing:'0.1em'}}>{type}</span>
            </div>
            <div style={{fontSize:13,color:'#888',lineHeight:1.8}}>
              と送信してください<br/>
              <span style={{fontSize:11,color:'#555'}}>あなたの詳細プロファイルが自動で届きます</span>
            </div>
          </div>
        </div>

        {/* シェア・リトライ */}
        <div style={{display:'flex',gap:8,marginBottom:10}}>
          <button onClick={copy} style={{flex:1,padding:12,border:'1px solid #383838',background:'#2a2a2a',color:copied?'#e06080':'#888',borderRadius:8,fontSize:13,cursor:'pointer'}}>
            {copied?'コピーしました':'結果をコピー'}
          </button>
          <button onClick={()=>{
            const url=typeof window!=='undefined'?window.location.href:''
            window.open(`https://x.com/intent/post?text=${encodeURIComponent(shareText+'\n'+url)}`,'_blank')
          }} style={{flex:1,padding:12,border:'1px solid #383838',background:'#2a2a2a',color:'#888',borderRadius:8,fontSize:13,cursor:'pointer'}}>
            X でシェア
          </button>
        </div>
        <button onClick={()=>router.push('/')} style={{display:'block',width:'100%',background:'none',border:'none',fontSize:12,color:'#444',cursor:'pointer',padding:8,textDecoration:'underline',textUnderlineOffset:3}}>
          もう一度診断する
        </button>

      </div>
    </>
  )
}

export async function getStaticPaths() {
  const types = ['ESTP','ESFP','ENFP','ENTP','ESTJ','ESFJ','ENFJ','ENTJ','ISTP','ISFP','INFP','INTP','ISTJ','ISFJ','INFJ','INTJ']
  return { paths: types.map(type=>({params:{type}})), fallback: true }
}

export async function getStaticProps({ params }) {
  return { props: {} }
}
