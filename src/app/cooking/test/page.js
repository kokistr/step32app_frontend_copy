"use client";

import { Header } from '../../components/Index';
import { CookingNavBar } from '../../components/Index';

import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

// メインのレシピデータ
const recipeData = [
  { id: 1, title: "牛肉とたまねぎのオムレツ風炒め", onCalendar: true, calendarDate: 12, onCandidate: false, onFavorite: true, src: "../images/dishes/dish1.jpg" },
  { id: 2, title: "世界で一番おいしい納豆ご飯", onCalendar: false, calendarDate: null, onCandidate: false, onFavorite: false, src: "../images/dishes/dish2.jpg" },
  { id: 3, title: "シンプル豚汁", onCalendar: false, calendarDate: null, onCandidate: false, onFavorite: true, src: "../images/dishes/dish3.jpg" },
  { id: 4, title: "肉じゃが風肉じゃが", onCalendar: true, calendarDate: 25, onCandidate: false, onFavorite: false, src: "../images/dishes/dish4.jpg" },
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

  // ドラッグ可能な画像コンポーネント
  const DraggableImage = ({ id, src }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: ItemTypes.IMAGE,
      item: { id, src },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));

    return (
      <img
        ref={drag}
        src={src}
        alt="Draggable Dish"
        className={`w-20 h-20 rounded-lg shadow-md cursor-pointer ${
          isDragging ? "opacity-50" : "opacity-100"
        }`}
      />
    );
  };

  // ドロップ可能なカレンダーセルコンポーネント
  const CalendarCell = ({ date, imageSrc, onDropImage }) => {
    const [, drop] = useDrop(() => ({
      accept: ItemTypes.IMAGE,
      drop: (item) => onDropImage(date, item.src),
    }));

    return (
      <div
        ref={drop}
        className="border rounded-lg h-24 flex flex-col items-center justify-center relative"
      >
        <div className="absolute top-1 left-1 text-xs">{date}</div>
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={`Dish for ${date}`}
            className="w-16 h-16 rounded-lg"
          />
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
    setCalendarData((prev) => ({
      ...prev,
      [date]: src,
    }));
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
                />
              );
            })}
          </div>
        </section>

        {/* 候補セクション */}
        <section className="white-container">
          <h2 className="text-lg font-bold mb-4">Candidate</h2>
          <div className="flex space-x-4">
            {candidates.map((item) => (
              <DraggableImage key={item.id} id={item.id} src={item.src} />
            ))}
          </div>
        </section>

        {/* お気に入りセクション */}
        <section className="white-container">
          <h2 className="text-lg font-bold mb-4">Favorite</h2>
          <div className="flex space-x-4">
            {favorites.map((item) => (
              <DraggableImage key={item.id} id={item.id} src={item.src} />
            ))}
          </div>
        </section>
      </div>
    </DndProvider>
  );
}
