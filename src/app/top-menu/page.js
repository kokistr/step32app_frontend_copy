import Image from "next/image"

export default function Home(){
  return(
    <main>
      <h1 className="m-10 text-2xl">Top-menu ページをここに記述</h1>
      <a className="m-10 text-2xl text-blue-700" href="/cooking">Cooking Topページへ</a>
      <a className="m-10 text-2xl text-blue-700" href="/shopping">Shopping Topページへ</a>
      <a className="m-10 text-2xl text-blue-700" href="/health">Health Topページへ</a>
    </main>
  )
}
