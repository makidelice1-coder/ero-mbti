import Head from 'next/head'

export default function XShare() {
  const text = `流行りのエロMBTI診断が当たりすぎてこわいww\n\nたったの1分で結果がわかるから\nあなたも診断してみて👇\n【https://ero-mbti.vercel.app】\nーーーーーーー\n#エロMBTI`

  const handleShare = () => {
    const encoded = encodeURIComponent(text)
    const start = Date.now()
    window.location.href = `twitter://post?message=${encoded}`
    setTimeout(() => {
      if (Date.now() - start < 1500) {
        window.open(`https://x.com/intent/post?text=${encoded}`, '_blank')
      }
    }, 1000)
  }

  return (
    <>
      <Head>
        <title>Xでシェア — エロMBTI診断</title>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>
      <div style={{
        background:'#222',color:'#f0f0f0',minHeight:'100vh',
        display:'flex',flexDirection:'column',alignItems:'center',
        justifyContent:'center',padding:'2rem 1.5rem',
        fontFamily:"'Helvetica Neue',Arial,sans-serif",textAlign:'center'
      }}>
        <div style={{fontSize:48,marginBottom:'1.5rem'}}>🔥</div>
        <div style={{fontSize:18,fontWeight:500,color:'#f0f0f0',marginBottom:'0.75rem',lineHeight:1.5}}>
          エロMBTI診断、<br/>みんなにシェアしよう！
        </div>
        <div style={{fontSize:13,color:'#888',lineHeight:1.9,marginBottom:'2rem',
          background:'#2a2a2a',border:'1px solid #333',borderRadius:10,
          padding:'1rem 1.25rem',textAlign:'left',maxWidth:360,width:'100%'
        }}>
          流行りのエロMBTI診断が当たりすぎてこわいww<br/><br/>
          たったの1分で結果がわかるから<br/>
          あなたも診断してみて👇<br/>
          【https://ero-mbti.vercel.app】<br/>
          ーーーーーーー<br/>
          #エロMBTI
        </div>
        <button onClick={handleShare} style={{
          display:'flex',alignItems:'center',justifyContent:'center',gap:10,
          background:'#000',color:'#fff',border:'none',
          width:'100%',maxWidth:360,padding:'16px',
          borderRadius:12,fontSize:16,fontWeight:500,
          letterSpacing:'0.04em',cursor:'pointer'
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
          Xでシェアする
        </button>
        <div style={{fontSize:11,color:'#555',marginTop:'1rem'}}>
          タップするとXアプリが開きます
        </div>
      </div>
    </>
  )
}
