'use client'

import { Header } from '../components/index'
import { CookingNavBar } from '../components/index'
import Image from "next/image"
import { useState } from 'react'

export default function Home() {
  // 状態管理の追加
  const [ingredients, setIngredients] = useState(['', '', '']);
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);
  const [selectedThemes, setSelectedThemes] = useState(['健康志向']);

  // 食材をクリアする関数
  const clearIngredient = (index) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = '';
    setIngredients(newIngredients);
  };

  // 食材を追加する関数
const addIngredient = () => {
  setIngredients([...ingredients, '']);
 };

  // テーマの選択を切り替える関数
  const toggleTheme = (theme) => {
    if (selectedThemes.includes(theme)) {
      setSelectedThemes(selectedThemes.filter(t => t !== theme));
    } else {
      setSelectedThemes([...selectedThemes, theme]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <CookingNavBar />
      <main className="container mx-auto px-4 py-8">
        {/* 食材入力セクション */}
        <section className="mb-8">
          <h2 className="text-lg font-medium mb-4">使いたい食材を入力してください</h2>
          <div className="space-y-3">
            {ingredients.map((ingredient, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input
                  type="text"
                  value={ingredient}
                  onChange={(e) => {
                    const newIngredients = [...ingredients];
                    newIngredients[index] = e.target.value;
                    setIngredients(newIngredients);
                  }}
                  className="flex-1 p-2 border rounded-md"
                  placeholder={`食材${index + 1}`}
                />
                <button 
                  onClick={() => clearIngredient(index)}
                  className="px-4 py-2 bg-orange-400 text-white rounded-md hover:bg-orange-500 transition-colors"
                >
                  クリア
                </button>
              </div>
            ))}
          </div>
          {/* ingredients.length < 100 の条件チェックを削除 */}
          <button 
            onClick={addIngredient}
            className="mt-4 px-6 py-2 bg-orange-400 text-white rounded-md w-full hover:bg-orange-500 transition-colors"
          >
            追加する
          </button>
        </section>

        {/* テーマ選択セクション */}
        <section className="mb-8">
          <h2 className="text-lg font-medium mb-4">テーマを選択してください</h2>
          <div className="relative">
            <button 
              onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
              className="w-full p-2 border rounded-md text-left flex justify-between items-center bg-white"
            >
              <span>{selectedThemes.join(', ') || 'テーマを選択'}</span>
              <svg 
                className={`w-5 h-5 transition-transform ${isThemeDropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {isThemeDropdownOpen && (
              <div className="absolute w-full mt-1 bg-white border rounded-md shadow-lg z-10">
                <div className="p-2 space-y-2">
                  {[
                    '健康志向',
                    'スタミナ',
                    'バランス',
                    '季節に合う',
                    '節約',
                    '子供向け',
                    '時短・簡単',
                    '本格派'
                  ].map((theme) => (
                    <label key={theme} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedThemes.includes(theme)}
                        onChange={() => toggleTheme(theme)}
                        className="form-checkbox h-5 w-5 text-orange-400"
                      />
                      <span>{theme}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* 検索ボタン */}
        <a 
          href="/cooking/suggestion" 
          className="block w-full text-center py-3 bg-orange-400 text-white rounded-md hover:bg-orange-500 transition-colors"
        >
          レシピを検索する
        </a>
      </main>
    </div>
  );
}