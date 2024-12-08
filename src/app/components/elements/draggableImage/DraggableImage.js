"use client"

import { useDrag } from "react-dnd";
import { FaTrashAlt } from "react-icons/fa"; // ゴミ箱アイコンをインポート
import { FaHeart } from "react-icons/fa"; // ハートアイコンをインポート
import { useRouter } from 'next/navigation'; // useRouter をインポート

// ドラッグ可能な画像コンポーネント
const DraggableImage = ({ id, src, onDelete, onFavorite, isFavorite }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image", // ドラッグのアイテムタイプ
    item: { id, src },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  // useRouterフックを使ってページ遷移を制御
  const router = useRouter();

  // ダブルクリックで遷移
  const handleDoubleClick = (id) => {
    router.push(`/cooking/suggestion/${id}`); // 該当レシピページに遷移
  };

  // ハートマークを切り替える関数
  // const toggleFavorite = () => {
  //   setOnFavorite((prev) => !prev); // onFavoriteの状態を切り替え
  // };

  return (
    <div className="relative">
      <img
        ref={drag}
        src={src}
        alt="Draggable Dish"
        className={`w-20 h-20 rounded-lg shadow-md cursor-pointer ${isDragging ? "opacity-50" : "opacity-100"}`}
        onDoubleClick={() => handleDoubleClick(id)} // id を直接渡す
      />

      {/* ハートアイコン */}
      <button
        onClick={onFavorite} // クリックでonFavoriteの状態を切り替え
        className={`absolute top-1 right-1 text-lg ${isFavorite ? "text-red-500" : "text-gray-500"}`}
      >
        <FaHeart />
      </button>

      {/* ゴミ箱アイコン */}
      {onDelete && typeof onDelete === 'function' && (
        <button
          onClick={onDelete}
          className="absolute bottom-0 right-0 text-gray-300 p-1"
        >
          <FaTrashAlt />
        </button>
        
      )}
    </div>
  );
};

export default DraggableImage;
