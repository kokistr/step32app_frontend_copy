"use client";

import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemTypes = {
  IMAGE: "image",
};

// 初期レシピデータ
const initialRecipeData = [
  { id: 1, src: "/image1.jpg", recipeName: "Dish 1", calendarDate: null },
  { id: 2, src: "/image2.jpg", recipeName: "Dish 2", calendarDate: null },
  { id: 3, src: "/image3.jpg", recipeName: "Dish 3", calendarDate: null },
];

const CalendarPage = () => {
  const [recipeData, setRecipeData] = useState(initialRecipeData);

  // ドラッグ対象の画像コンポーネント
  const DraggableImage = ({ item }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: ItemTypes.IMAGE,
      item: { id: item.id, src: item.src, recipeName: item.recipeName },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));

    return (
      <img
        ref={drag}
        src={item.src}
        alt={item.recipeName}
        className={`w-20 h-20 rounded-lg shadow-md cursor-pointer ${
          isDragging ? "opacity-50" : "opacity-100"
        }`}
      />
    );
  };

  // カレンダーセル
  const CalendarCell = ({ date, setRecipeData }) => {
    const itemOnDate = recipeData.find(
      (item) => item.calendarDate === date
    );

    // ドロップ処理
    const [, drop] = useDrop(() => ({
      accept: ItemTypes.IMAGE,
      drop: (droppedItem) => handleDropImage(date, droppedItem),
    }));

    const handleDropImage = (date, droppedItem) => {
      // カレンダーに画像をドロップする処理
      setRecipeData((prev) => {
        const updated = prev.map((item) => {
          if (item.id === droppedItem.id) {
            return { ...item, calendarDate: date }; // ドロップした画像を更新
          }
          return item;
        });
        return updated;
      });
    };

    return (
      <div
        ref={drop}
        className="border rounded-lg h-24 flex flex-col items-center justify-center relative"
      >
        <div className="absolute top-1 left-1 text-xs">{date}</div>
        {itemOnDate ? (
          <img
            src={itemOnDate.src}
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

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-50">
        <h2 className="text-lg font-bold mb-4">2025 August</h2>
        <div className="grid grid-cols-7 gap-2 text-center text-sm">
          {Array.from({ length: 31 }, (_, i) => {
            const date = i + 1;
            return (
              <CalendarCell
                key={date}
                date={date}
                setRecipeData={setRecipeData}
              />
            );
          })}
        </div>

        {/* 候補画像表示 */}
        <div className="flex space-x-4 mt-8">
          {recipeData
            .filter((item) => !item.calendarDate) // カレンダーに未配置の画像を表示
            .map((item) => (
              <DraggableImage key={item.id} item={item} />
            ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default CalendarPage;
