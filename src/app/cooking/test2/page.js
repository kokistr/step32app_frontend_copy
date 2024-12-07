"use client";

import { Header } from '../../components/index';
import { CookingNavBar } from '../../components/index';
import { DraggableImage } from '../../components/index';

import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FaTrashAlt } from "react-icons/fa"; // ゴミ箱アイコンをインポート
import { useRouter } from 'next/navigation'; // useRouter をインポート

// メインのレシピデータ
const initialRecipeData = [
  { id: 1, title: "牛肉とたまねぎのオムレツ風炒め", onCalendar: true, calendarDate: 12, onCandidate: false, onFavorite: true, src: "../images/dishes/dish1.jpg" },
  { id: 2, title: "世界で一番おいしい納豆ご飯", onCalendar: false, calendarDate: null, onCandidate: true, onFavorite: false, src: "../images/dishes/dish2.jpg" },
  { id: 3, title: "シンプル豚汁", onCalendar: false, calendarDate: null, onCandidate: false, onFavorite: true, src: "../images/dishes/dish3.jpg" },
  { id: 4, title: "肉じゃが風肉じゃが", onCalendar: true, calendarDate: 25, onCandidate: false, onFavorite: true, src: "../images/dishes/dish4.jpg" },
  { id: 5, title: "チキンカツレツ", onCalendar: false, calendarDate: null, onCandidate: false, onFavorite: true, src: "../images/dishes/dish5.jpg" },
  { id: 6, title: "ビーフストロガノフ", onCalendar: true, calendarDate: 8, onCandidate: false, onFavorite: false, src: "../images/dishes/dish6.jpg" },
  { id: 7, title: "麻婆豆腐", onCalendar: false, calendarDate: null, onCandidate: true, onFavorite: true, src: "../images/dishes/dish7.jpg" },
  { id: 8, title: "青椒肉絲", onCalendar: true, calendarDate: 30, onCandidate: false, onFavorite: false, src: "../images/dishes/dish8.jpg" },
  { id: 9, title: "タコス", onCalendar: false, calendarDate: null, onCandidate: true, onFavorite: false, src: "../images/dishes/dish9.jpg" },
  { id: 10, title: "ナシゴレン", onCalendar: false, calendarDate: null, onCandidate: true, onFavorite: false, src: "../images/dishes/dish10.jpg" }
];

// ドラッグ＆ドロップ用のアイテムタイプを定義
const ItemTypes = {
  IMAGE: "image",
};




export default function CalendarPage() {
  // useRouterフックを使ってページ遷移を制御
  const router = useRouter();

  // レシピデータの状態を管理
  const [recipeData, setRecipeData] = useState(initialRecipeData);

  // カレンダー用データを初期化
  const initialCalendarData = recipeData
    .filter(item => item.onCalendar)
    .reduce((acc, item) => {
      acc[item.calendarDate] = item.src;
      return acc;
    }, {});
  const [calendarData, setCalendarData] = useState(initialCalendarData);

  // 候補データ
  const candidates = recipeData.filter(item => item.onCandidate).map(item => ({
    id: item.id,
    src: item.src
  }));

  // お気に入りデータ
  const favorites = recipeData.filter(item => item.onFavorite).map(item => ({
    id: item.id,
    src: item.src
  }));

  // ドロップ可能なカレンダーセルコンポーネント
  const CalendarCell = ({ date, imageSrc, onDropImage, onDeleteImage }) => {
    const [, drop] = useDrop(() => ({
      accept: ItemTypes.IMAGE,
      drop: (item) => onDropImage(date, item.src),
    }));

    // ダブルクリックで遷移
    const handleDoubleClick = (id) => {
      router.push(`/cooking/suggestion/${id}`); // 該当レシピページに遷移
    };

    return (
      <div
        ref={drop}
        className="border rounded-lg h-24 flex flex-col items-center justify-center relative"
      >
        <div className="absolute top-1 left-1 text-xs">{date}</div>
        {imageSrc ? (
          <div className="relative">
            <img
              src={imageSrc}
              alt={`Dish for ${date}`}
              className="w-16 h-16 rounded-lg"
              onDoubleClick={() => handleDoubleClick(recipeData.find(item => item.src === imageSrc)?.id)}
            />
            {/* ゴミ箱アイコン */}
            <button
              onClick={() => onDeleteImage(date, imageSrc)}
              className="absolute top-0 right-0 text-red-500 p-1"
            >
              <FaTrashAlt />
            </button>
          </div>
        ) : (
          <div className="w-16 h-16 border border-dashed border-gray-300 flex items-center justify-center text-xs text-gray-400">
            Drop Here
          </div>
        )}
      </div>
    );
  };

  // ドロップ時の処理
  const handleDropImage = (date, src) => {
    // ドロップされた画像をカレンダーに登録
    setCalendarData((prev) => ({
      ...prev,
      [date]: src,
    }));

    // 該当のレシピデータを更新（onCalendarとcalendarDateを設定）
    setRecipeData((prevData) =>
      prevData.map((item) => {
        if (item.src === src) {
          return {
            ...item,
            onCalendar: true,
            calendarDate: date, // 1日の日付を設定
          };
        }
        return item;
      })
    );
  };

  // ゴミ箱アイコンをクリックした時の処理（カレンダー）
  const handleDeleteImage = (date, imageSrc) => {
    // カレンダーから画像を削除
    setCalendarData((prev) => {
      const newData = { ...prev };
      delete newData[date]; // 画像を削除
      return newData;
    });

    // 該当のレシピデータを更新（onCandidateをtrueに変更）
    setRecipeData((prevData) =>
      prevData.map((item) => {
        if (item.src === imageSrc) {
          return {
            ...item,
            onCalendar: false, // カレンダーから削除
            onCandidate: true, // 候補に移動
          };
        }
        return item;
      })
    );
  };

  // ゴミ箱アイコンをクリックした時の処理（候補）
  const handleDeleteFromCandidate = (src) => {
    // 候補から画像を削除
    setRecipeData((prevData) =>
      prevData.map((item) => {
        if (item.src === src) {
          return { ...item, onCandidate: false }; // onCandidateをfalseにする
        }
        return item;
      })
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <CookingNavBar />

        {/* カレンダーセクション */}
        <section className="white-container">
          <h2 className="text-lg font-bold mb-4">2024 December</h2>
          <div className="grid grid-cols-7 gap-2 text-center text-sm">
            {Array.from({ length: 31 }, (_, i) => {
              const date = (i + 1).toString();
              return (
                <CalendarCell
                  key={date}
                  date={date}
                  imageSrc={calendarData[date]}
                  onDropImage={handleDropImage}
                  onDeleteImage={handleDeleteImage}
                />
              );
            })}
          </div>
        </section>

        {/* 候補セクション */}
        <section className="white-container mt-6">
          <h2 className="text-lg font-bold mb-4">Candidate</h2>
          <div className="flex space-x-4">
            {candidates.map((candidate) => (
              <div key={candidate.id} className="flex items-center justify-center">
                <DraggableImage
                  id={candidate.id}
                  src={candidate.src}
                  onDelete={() => handleDeleteFromCandidate(candidate.src)} // ゴミ箱クリック時の処理
                />
              </div>
            ))}
          </div>
        </section>

        {/* お気に入りセクション */}
        <section className="white-container mt-6">
          <h2 className="text-lg font-bold mb-4">Favorite</h2>
          <div className="flex space-x-4">
            {favorites.map((favorite) => (
              <div key={favorite.id} className="flex items-center justify-center">
                <DraggableImage id={favorite.id} src={favorite.src} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </DndProvider>
  );
}
