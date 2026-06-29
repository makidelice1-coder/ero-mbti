import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

const QUESTIONS = [
  // E/I 軸 4問
  {
    axis: 'E / I｜積極性',
    text: '初対面の相手とセックスに持ち込める？',
    choices: [
      { label: '余裕。雰囲気作ればその日でイける', score: { E: 3 } },
      { label: '仲良くなってきたらいける。数回会えば十分', score: { E: 1 } },
      { label: 'ある程度信頼できてから。焦りたくない', score: { I: 1 } },
      { label: '無理。心から信頼できる相手じゃないと絶対無理', score: { I: 3 } },
    ]
  },
  {
    axis: 'E / I｜積極性',
    text: 'エロいことを自分から言い出せる？',
    choices: [
      { label: '普通に言える。「こういうのしたい」って直接言う', score: { E: 3 } },
      { label: '雰囲気が良ければ言える。タイミング次第', score: { E: 1 } },
      { label: '言いたくても言葉が出ない。遠回しにしか言えない', score: { I: 1 } },
      { label: '絶対無理。相手から言い出してもらうしかない', score: { I: 3 } },
    ]
  },
  {
    axis: 'E / I｜積極性',
    text: '好きな人にエロい写真や動画を送れる？',
    choices: [
      { label: '余裕で送れる。むしろ自分から送りたい', score: { E: 3 } },
      { label: '仲が深まれば送れる。関係性次第', score: { E: 1 } },
      { label: 'かなり勇気がいる。言われたらギリ送れるかも', score: { I: 1 } },
      { label: '絶対無理。恥ずかしすぎて考えられない', score: { I: 3 } },
    ]
  },
  {
    axis: 'E / I｜積極性',
    text: 'セックスの誘い方はどっち寄り？',
    choices: [
      { label: '自分からガンガン誘う。断られても気にしない', score: { E: 3 } },
      { label: 'どちらかといえば自分から。でも相手の様子は見る', score: { E: 1 } },
      { label: '相手から来てくれた方が嬉しい。自分からは少し勇気がいる', score: { I: 1 } },
      { label: '完全に待ち。自分から誘うなんて恥ずかしくて無理', score: { I: 3 } },
    ]
  },

  // S/N 軸 4問
  {
    axis: 'S / N｜感覚・妄想',
    text: 'エッチな気分になるきっかけはどっち寄り？',
    choices: [
      { label: '完全に身体。触れられたとき・匂い・物理的な刺激で即スイッチ入る', score: { S: 3 } },
      { label: 'どちらかといえば身体の刺激。でも雰囲気も大事', score: { S: 1 } },
      { label: 'どちらかといえば妄想や言葉。エロい声や状況に反応する', score: { N: 1 } },
      { label: '完全に頭の中。妄想・言葉責め・シチュエーションがないと無理', score: { N: 3 } },
    ]
  },
  {
    axis: 'S / N｜感覚・妄想',
    text: '理想のエッチに近いのは？',
    choices: [
      { label: 'ガッツリ体を使う激しいやつ。汗だくになるくらいがいい', score: { S: 3 } },
      { label: '体も使いつつ、気持ちも大事。バランス重視', score: { S: 1 } },
      { label: '雰囲気・言葉・心の繋がりが7割。体は後からついてくる', score: { N: 1 } },
      { label: '心理的な繋がりと言葉が全て。感情がないと全く楽しめない', score: { N: 3 } },
    ]
  },
  {
    axis: 'S / N｜感覚・妄想',
    text: 'AVを見るとき一番興奮するのは？',
    choices: [
      { label: '映像の刺激そのもの。視覚と音だけで完結する', score: { S: 3 } },
      { label: '映像がメインだけど、セリフや状況も多少気になる', score: { S: 1 } },
      { label: 'セリフや状況設定がないと物足りない。ストーリーが大事', score: { N: 1 } },
      { label: '頭の中でシチュエーションを妄想する方が断然いい', score: { N: 3 } },
    ]
  },
  {
    axis: 'S / N｜感覚・妄想',
    text: 'エッチ中に頭の中で何かを想像することがある？',
    choices: [
      { label: 'ない。今ここの感覚だけに集中している', score: { S: 3 } },
      { label: 'あまりない。基本は今の感覚を楽しんでいる', score: { S: 1 } },
      { label: 'たまにある。シチュエーションを重ねることで興奮が増す', score: { N: 1 } },
      { label: 'よくある。頭の中の妄想が興奮の大半を占めている', score: { N: 3 } },
    ]
  },

  // T/F 軸 4問
  {
    axis: 'T / F｜支配・服従',
    text: 'ベッドでのポジションはどっち寄り？',
    choices: [
      { label: '完全にリード側。主導権は絶対渡さない', score: { T: 3 } },
      { label: 'どちらかといえばリード。でも相手に合わせることもある', score: { T: 1 } },
      { label: 'どちらかといえばリードされたい。相手に委ねるのが好き', score: { F: 1 } },
      { label: '完全に委ねたい。全部リードしてもらわないと落ち着かない', score: { F: 3 } },
    ]
  },
  {
    axis: 'T / F｜支配・服従',
    text: 'エッチ中のセリフで一番刺さるのは？',
    choices: [
      { label: '「もっと声出せ」「言うこと聞け」系の支配的なやつ', score: { T: 3 } },
      { label: '「感じてる？」「どうしてほしい？」責める系の言葉', score: { T: 1 } },
      { label: '「かわいい」「もっと見せて」褒める系の言葉', score: { F: 1 } },
      { label: '「好きだよ」「大丈夫？」愛情・安心感を伝える言葉', score: { F: 3 } },
    ]
  },
  {
    axis: 'T / F｜支配・服従',
    text: 'SEX後の満足度を決めるのは？',
    choices: [
      { label: '自分がしっかりイったかどうか。これが全て', score: { T: 3 } },
      { label: '自分がイつつ、相手も気持ちよさそうだったら最高', score: { T: 1 } },
      { label: '相手が喜んでくれてたら自分も満足。相手優先', score: { F: 1 } },
      { label: '相手が満足してくれたかどうかが全て。自分はどうでもいい', score: { F: 3 } },
    ]
  },
  {
    axis: 'T / F｜支配・服従',
    text: 'Sっ気とMっ気、どっちが強い？',
    choices: [
      { label: '完全にS。相手をコントロールするのが好き', score: { T: 3 } },
      { label: 'どちらかといえばS。でも状況によってはM側に回ることも', score: { T: 1 } },
      { label: 'どちらかといえばM。リードされると安心する', score: { F: 1 } },
      { label: '完全にM。支配されることに喜びを感じる', score: { F: 3 } },
    ]
  },

  // J/P 軸 4問
  {
    axis: 'J / P｜計画・本能',
    text: 'セックスって計画してする派？',
    choices: [
      { label: '前日から「明日しよ」と決めて準備する。計画が安心', score: { J: 3 } },
      { label: 'なんとなく予定は決める。でもガチガチではない', score: { J: 1 } },
      { label: 'その日の気分次第。なんとなく流れで決まる感じが好き', score: { P: 1 } },
      { label: '完全に勢いとノリ。計画してたら逆に萎える', score: { P: 3 } },
    ]
  },
  {
    axis: 'J / P｜計画・本能',
    text: 'エッチの後どうなる？',
    choices: [
      { label: '即シャワー→就寝。後処理まできっちりやって完結', score: { J: 3 } },
      { label: '少し休んでからシャワー。でも長居はしない', score: { J: 1 } },
      { label: 'そのままグダグダ話す。余韻が大事', score: { P: 1 } },
      { label: 'そのまま寝落ち、もしくはふたたび始まる。終わりがない', score: { P: 3 } },
    ]
  },
  {
    axis: 'J / P｜計画・本能',
    text: 'ベッドの上でのルーティンがある？',
    choices: [
      { label: 'ある。毎回だいたい同じ流れが一番安心する', score: { J: 3 } },
      { label: 'なんとなくいつもの流れはある。でも絶対ではない', score: { J: 1 } },
      { label: 'あまりない。その日の気分でやることが変わる', score: { P: 1 } },
      { label: '全くない。毎回違う方が楽しい。同じは飽きる', score: { P: 3 } },
    ]
  },
  {
    axis: 'J / P｜計画・本能',
    text: '急に誘われるのと事前に決めるのどっちが好き？',
    choices: [
      { label: '事前に決めたい。心の準備と環境整備が必要', score: { J: 3 } },
      { label: 'どちらかといえば事前派。でも急でも対応できる', score: { J: 1 } },
      { label: 'どちらかといえば急な方が興奮する。サプライズが好き', score: { P: 1 } },
      { label: '完全に急な方がいい。計画されてると冷める', score: { P: 3 } },
    ]
  },
]

export default function Home() {
  const router = useRouter()
  const [phase, setPhase] = useState('top')
  const [cur, setCur] = useState(0)
  const [scores, setScores] = useState({ E:0, I:0, S:0, N:0, T:0, F:0, J:0, P:0 })
  const [hov, setHov] = useState(null)

  const start = () => {
    setPhase('quiz')
    setCur(0)
    setScores({ E:0, I:0, S:0, N:0, T:0, F:0, J:0, P:0 })
  }

  const answer = (scoreMap) => {
    const next = { ...scores }
    Object.entries(scoreMap).forEach(([k, v]) => { next[k] = (next[k] || 0) + v })
    if (cur + 1 < QUESTIONS.length) {
      setScores(next)
      setCur(cur + 1)
    } else {
      const tp =
        (next.E >= next.I ? 'E' : 'I') +
        (next.S >= next.N ? 'S' : 'N') +
        (next.T >= next.F ? 'T' : 'F') +
        (next.J >= next.P ? 'J' : 'P')
      router.push('/result/' + tp)
    }
  }

  const base = { fontFamily:"'Helvetica Neue',Arial,sans-serif", background:'#222', color:'#f0f0f0' }

  if (phase === 'top') return (
    <>
      <Head>
        <title>エロMBTI診断</title>
        <meta name="description" content="あなたの性的傾向を16タイプで丸裸にします。辛口注意。" />
        <meta property="og:title" content="エロMBTI診断 — あなたの性的タイプは？" />
        <meta property="og:description" content="全16問・約3分。あなたの性的傾向を16タイプで丸裸にします。" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
      </Head>
      <div style={{...base, minHeight:'100vh', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'2rem 1.5rem', textAlign:'center'}}>
        <div style={{fontSize:10, letterSpacing:'0.3em', textTransform:'uppercase', color:'#c06080', marginBottom:'2rem'}}>診断 — 16 types</div>
        <h1 style={{fontSize:42, fontWeight:200, letterSpacing:'-0.03em', lineHeight:1.1, marginBottom:'1rem'}}>
          エロ<span style={{fontWeight:700, color:'#e06080'}}>MBTI</span><br/>診断
        </h1>
        <div style={{width:28, height:1, background:'#444', margin:'1.75rem auto'}}/>
        <p style={{fontSize:14, color:'#888', lineHeight:2, marginBottom:'2.5rem'}}>
          あなたの性的傾向・タイプを<br/>16タイプで丸裸にします<br/>辛口注意。覚悟してから始めて
        </p>
        <button onClick={start} style={{background:'#e06080', color:'#fff', border:'none', padding:'13px 42px', borderRadius:50, fontSize:13, fontWeight:500, letterSpacing:'0.08em', cursor:'pointer'}}>
          診断スタート
        </button>
        <p style={{fontSize:11, color:'#555', marginTop:'1.25rem', letterSpacing:'0.1em'}}>全16問 / 約3分</p>
      </div>
    </>
  )

  const q = QUESTIONS[cur]
  return (
    <>
      <Head><title>エロMBTI診断 — Q{cur + 1}</title></Head>
      <div style={{...base, minHeight:'100vh', padding:'2.5rem 1.5rem', maxWidth:600, margin:'0 auto'}}>
        <div style={{height:1, background:'#333', marginBottom:'2rem'}}>
          <div style={{height:'100%', background:'#e06080', width:`${Math.round((cur+1)/QUESTIONS.length*100)}%`, transition:'width .35s'}}/>
        </div>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.5rem'}}>
          <span style={{fontSize:11, color:'#555', letterSpacing:'0.1em'}}>{cur+1} / {QUESTIONS.length}</span>
          <span style={{fontSize:10, color:'#c06080', border:'1px solid #5a2535', padding:'3px 12px', borderRadius:20}}>{q.axis}</span>
        </div>
        <div style={{fontSize:18, fontWeight:300, lineHeight:1.6, marginBottom:'1.75rem'}}>{q.text}</div>
        {q.choices.map((c, i) => (
          <button key={i} onClick={() => answer(c.score)}
            onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
            style={{
              display:'block', width:'100%',
              background: hov===i ? '#2f2226' : '#2a2a2a',
              color: hov===i ? '#f0f0f0' : '#d0d0d0',
              border: hov===i ? '1px solid #e06080' : '1px solid #383838',
              padding:'14px 20px', borderRadius:10, fontSize:14,
              textAlign:'left', cursor:'pointer', marginBottom:10,
              lineHeight:1.5, transition:'all .15s'
            }}
          >
            <span style={{color: hov===i ? '#e06080' : '#555', marginRight:10, fontSize:12, fontWeight:600}}>
              {['A','B','C','D'][i]}
            </span>
            {c.label}
          </button>
        ))}
      </div>
    </>
  )
}
