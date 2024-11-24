import Image from "next/image"

export default function Home(){
  return(
    <main>
      <h1 className="m-10 text-2xl">Suggestion ページをここに記述。ここには、タブ（和食・洋食・中華・その他）と画像が入るページが作成される</h1>
      <p className="m-10 text-2xl">レシピの詳細ページは、同フォルダにある「recipe-id」のフォルダ内に作成される</p>
      <a className="m-10 text-2xl text-blue-700" href="/cooking/suggestion/[recipe-id]">Recipe-id ページへ</a>
    </main>
  )
}