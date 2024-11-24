import Image from "next/image"

export default function Home(){
  return(
    <main>
      <h1 className="m-10">レシピの詳細ページ（動的ページ（引数として取得するid番号により表示されるレシピが変わる）をここに記述</h1>
      <a className="m-10 text-2xl text-blue-700" href="/cooking/calender">カレンダー ページへ</a>
    </main>
  )
}