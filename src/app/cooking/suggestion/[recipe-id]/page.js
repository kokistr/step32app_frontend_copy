// src/app/recipe/page.js
import { Header } from "../../../components/Index";
import { CookingNavBar } from "../../../components/Index";
// import './globals.css'


export default function RecipePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header />

      {/* Navigation Bar */}
      <CookingNavBar />

      {/* Main Content */}
      <main className="main-container">

        {/* タブ */}
        {/* <div className="flex justify-center space-x-4 mb-6">
          {["和食", "洋食", "中華", "その他"].map((tab, index) => (
            <button
              key={index}
              className={`px-4 py-2 border-b-2 ${
                tab === "洋食" ? "border-orange-500 text-orange-500" : "border-gray-300"
              }`}
            >
              {tab}
            </button>
          ))}
        </div> */}

        {/* レシピ詳細 */}
        <div className="white-container">
          {/* タイトル */}
          <h1 className="text-lg font-bold mb-4">牛肉とたまねぎのオムレツ風炒め</h1>

          {/* 画像と説明 */}
          <div className="mb-6 grid grid-cols-2 gap-8">
            <img
              src="/images/dishes/dish1.jpg"
              alt="牛肉とたまねぎのオムレツ風炒め"
              className="w-full h-56 object-cover rounded-md mb-4"
            />
            <p className="text-gray-600">
              とろり卵が牛肉とたまねぎを包み込み、まるでオムレツのような満足感。
              仕上げに醤油をひとたらしで香ばしさアップ！
            </p>
          </div>

          {/* 材料 */}
          <h2 className="text-md font-semibold mb-2">【材料】</h2>
          <ul className="grid grid-cols-2 gap-2 mb-6">
            {[
              "キャベツ: 1/4玉",
              "牛肉 (薄切り): 200g",
              "玉ねぎ: 1/2個",
              "ピーマン: 2個",
              "卵: 2個",
              "醤油: 大匙2",
              "サラダ油: 大匙1",
              "塩: 適量",
              "胡椒: 適量",
            ].map((ingredient, index) => (
              <li key={index} className="flex items-center space-x-2">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-orange-500" />
                <span className="text-gray-700">{ingredient}</span>
              </li>
            ))}
          </ul>

          {/* 発注ボタン */}
          <div className="flex justify-center items-center w-full mb-12">
            <button className="orange-btn w-1/3">
              発注
            </button>
          </div>

          {/* 作り方 */}
          <h2 className="text-md font-semibold mb-2">作り方</h2>
          <ol className="list-decimal list-inside space-y-2 mb-6 text-gray-700">
            {[
              "野菜を準備: キャベツはざく切り、玉ねぎは薄切り・・・",
              "野菜と牛肉を炒める: フライパンにサラダ油を入れて中火で熱し、まず牛肉を・・・",
              "牛肉と調味料を加える: 野菜が柔らかくなったら・・・",
              "卵を加える: 別のボウルで卵を溶き、塩、こしょうで味付けする。炒めた・・・",
              "仕上げ: 全体が程よく炒まったら、最後にお好みでごま油を少量加えて・・・",
            ].map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>

          {/* ポイント */}
          <h2 className="text-md font-semibold mb-2">ポイント</h2>
          <p className="text-gray-700 mb-12">
            ・卵を入れることで、オムレツのような触感が楽しめさらにボリュームが出ます。
            醤油ベースの味付けが、野菜と牛肉のうまみを引き出します。
          </p>

          {/* ボタン */}
          <div className="flex flex-col space-y-3">
            <button className="orange-btn">
              候補に追加して戻る
            </button>
            <button className="orange-btn">
              候補に追加してカレンダーへ
            </button>
            <button className="gray-btn">
              戻る
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
