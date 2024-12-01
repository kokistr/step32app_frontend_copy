"use client";

import { useState } from "react";
import { Header, CookingNavBar } from "../../components/Index";

// 各タブごとのレシピデータ
const recipeData = {
  和食: [
    { id: 1, title: "男は黙って鯖焼き味噌だれ", img: "../images/dishes/dish1.jpg" },
    { id: 2, title: "世界で一番おいしい納豆ご飯", img: "../images/dishes/dish2.jpg" },
    { id: 3, title: "シンプル豚汁", img: "../images/dishes/dish3.jpg" },
    { id: 4, title: "肉じゃが風肉じゃが", img: "../images/dishes/dish4.jpg" },
  ],
  洋食: [
    { id: 5, title: "チキンカツレツ", img: "../images/dishes/dish5.jpg" },
    { id: 6, title: "ビーフストロガノフ", img: "../images/dishes/dish6.jpg" },
  ],
  中華: [
    { id: 7, title: "麻婆豆腐", img: "../images/dishes/dish7.jpg" },
    { id: 8, title: "青椒肉絲", img: "../images/dishes/dish8.jpg" },
  ],
  その他: [
    { id: 9, title: "タコス", img: "../images/dishes/dish9.jpg" },
    { id: 10, title: "ナシゴレン", img: "../images/dishes/dish10.jpg" },
  ],
};

export default function SuggestPage() {
  const [activeTab, setActiveTab] = useState("和食"); // 現在選択されているタブ

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <CookingNavBar />

      {/* Suggest Section */}


      {/* <section className="max-w-4xl mx-auto p-4 bg-white mt-4 rounded-lg shadow-md"> */}
      <section className="white-container">
        <div className="mb-4">
          <h2 className="text-lg font-bold text-orange-500 mb-2">Suggestion</h2>
          <div className="flex space-x-2 border-b border-gray-200">
            {["和食", "洋食", "中華", "その他"].map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-4 py-2 text-sm font-bold ${
                  activeTab === category
                    ? "text-orange-500 border-b-2 border-orange-500"
                    : "text-gray-600 hover:text-orange-500"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Recipe Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {recipeData[activeTab].map((recipe) => (
            <div
              key={recipe.id}
              className="border rounded-lg p-2 shadow-sm hover:shadow-md transition bg-white"
            >
              <img
                src={recipe.img}
                alt={recipe.title}
                className="w-full h-36 object-cover rounded-lg"
              />
              <div className="mt-2">
                <h3 className="text-sm font-bold text-gray-700">
                  {recipe.title}
                </h3>
                <div className="flex justify-between items-center mt-2">
                  <button className="text-gray-500 hover:text-red-500">
                    ❤️
                  </button>
                  <button className="text-gray-500 hover:text-red-500">🗑️</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
