import Image from "next/image"

export default function Home(){
  return(
    <main>
      <h1 className="m-10 text-2xl">Cookingのトップ画面。ここには、使いたい食材の入力、テーマ選択等が記述される</h1>
      <a className="m-10 text-2xl text-blue-700" href="/cooking/suggestion">Suggestionページへ</a>
    </main>
  )
}