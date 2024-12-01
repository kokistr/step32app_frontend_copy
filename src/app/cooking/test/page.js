"use client";

import { Header } from "../../components/Index";
import { CookingNavBar } from "../../components/Index";

import { useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const ItemTypes = {
  IMAGE: "image",
};

export default function CalendarPage() {
  // カレンダーに配置された画像の状態を管理
  const [calendarData, setCalendarData] = useState({
    13: "../images/dishes/dish1.jpg",
    14: "../images/dishes/dish2.jpg",
    20: "../images/dishes/dish3.jpg",
  });

  // 候補の画像リスト
  const [candidates, setCandidates] = useState([
    { id: 1, src: "../images/dishes/dish4.jpg" },
    { id: 2, src: "../images/dishes/dish5.jpg" },
  ]);

  // 履歴の画像リスト
  const [history, setHistory] = useState([
    { id: 3, src: "../images/dishes/dish6.jpg" },
  ]);

  // ドラッグ可能な画像コンポーネント
  const DraggableImage = ({ id, src, source }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: ItemTypes.IMAGE,
      item: { id, src, source },
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
      drop: (item) => onDropImage(date, item),
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
  const handleDropImage = (date, item) => {
    if (item.source === "calendar") {
      // カレンダー間の移動処理
      setCalendarData((prev) => {
        const updated = { ...prev };
        const previousDate = Object.keys(prev).find((key) => prev[key] === item.src);
        if (previousDate) updated[previousDate] = undefined; // 元のセルを空にする
        updated[date] = item.src;
        return updated;
      });
    } else if (item.source === "candidates") {
      // Candidateからカレンダーへの移動
      setCandidates((prev) => prev.filter((candidate) => candidate.src !== item.src));
      setCalendarData((prev) => ({
        ...prev,
        [date]: item.src,
      }));
    } else if (item.source === "history") {
      // Historyからカレンダーへの移動（入れ替えなし）
      setCalendarData((prev) => ({
        ...prev,
        [date]: item.src,
      }));
    }
  };

  const handleSwapImage = (date, item) => {
    if (calendarData[date]) {
      // 入れ替え処理（カレンダーまたは候補と）
      const replacedImage = calendarData[date];
      if (item.source === "candidates") {
        setCandidates((prev) => [
          ...prev,
          { id: Date.now(), src: replacedImage },
        ]);
      }
      setCalendarData((prev) => ({
        ...prev,
        [date]: item.src,
      }));
    } else {
      handleDropImage(date, item);
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <CookingNavBar />

        {/* Calendar Section */}
        <section className="white-container">
          <h2 className="text-lg font-bold mb-4">2025 August</h2>
          <div className="grid grid-cols-7 gap-2 text-center text-sm">
            {Array.from({ length: 31 }, (_, i) => {
              const date = (i + 1).toString();
              return (
                <CalendarCell
                  key={date}
                  date={date}
                  imageSrc={calendarData[date]}
                  onDropImage={(date, item) =>
                    calendarData[date]
                      ? handleSwapImage(date, item)
                      : handleDropImage(date, item)
                  }
                />
              );
            })}
          </div>
        </section>

        {/* Candidate Section */}
        <section className="white-container">
          <h2 className="text-lg font-bold mb-4">Candidate</h2>
          <div className="flex space-x-4">
            {candidates.map((item) => (
              <DraggableImage
                key={item.id}
                id={item.id}
                src={item.src}
                source="candidates"
              />
            ))}
          </div>
        </section>

        {/* History Section */}
        <section className="white-container">
          <h2 className="text-lg font-bold mb-4">History</h2>
          <div className="flex space-x-4">
            {history.map((item) => (
              <DraggableImage
                key={item.id}
                id={item.id}
                src={item.src}
                source="history"
              />
            ))}
          </div>
        </section>
      </div>
    </DndProvider>
  );
}
