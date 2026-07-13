import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { TYPES } from '../../lib/data'

export default function Share() {
  const router = useRouter()
  const { type } = router.query

  useEffect(() => {
    if (!type) return
    const d = TYPES[type]
    if (!d) { router.push('/'); return }

    const text = `流行りのエロMBTI診断が当たりすぎてこわいww\n\nーーーーーーー\n私のタイプは…\n《${d.name}》(${type}) \nでした🔥\n\nたったの1分で結果がわかるから\nあなたも診断してみて👇\n【https://ero-mbti.vercel.app】\nーーーーーーー\n#エロMBTI`
    const encoded = encodeURIComponent(text)
    const appUrl = `twitter://post?message=${encoded}`
    const webUrl = `https://x.com/intent/post?text=${encoded}`

    const start = Date.now()
    window.location.href = appUrl

    setTimeout(() => {
      if (Date.now() - start < 1500) {
        window.open(webUrl, '_blank')
      }
    }, 1000)
  }, [type])

  return (
    <div style={{
      background:'#222',color:'#f0f0f0',minHeight:'100vh',
      display:'flex',flexDirection:'column',alignItems:'center',
      justifyContent:'center',fontFamily:"'Helvetica Neue',Arial,sans-serif"
    }}>
      <div style={{fontSize:32,marginBottom:16}}>𝕏</div>
      <div style={{fontSize:14,color:'#888'}}>Xを開いています...</div>
    </div>
  )
}

export async function getStaticPaths() {
  const types = ['ESTP','ESFP','ENFP','ENTP','ESTJ','ESFJ','ENFJ','ENTJ',
                 'ISTP','ISFP','INFP','INTP','ISTJ','ISFJ','INFJ','INTJ']
  return { paths: types.map(type=>({params:{type}})), fallback: false }
}

export async function getStaticProps() {
  return { props: {} }
}
