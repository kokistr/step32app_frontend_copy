import { useDrag } from "react-dnd";
import { FaTrashAlt } from "react-icons/fa"; // ゴミ箱アイコンをインポート
import { useRouter } from 'next/navigation'; // useRouter をインポート

// ドラッグ可能な画像コンポーネント
const DraggableImage = ({ id, src, onDelete }) => {
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

  return (
    <div className="relative">
      <img
        ref={drag}
        src={src}
        alt="Draggable Dish"
        className={`w-20 h-20 rounded-lg shadow-md cursor-pointer ${isDragging ? "opacity-50" : "opacity-100"}`}
        onDoubleClick={() => handleDoubleClick(id)} // id を直接渡す
      />
      {/* ゴミ箱アイコン */}
      {onDelete && typeof onDelete === 'function' && (
        <button
          onClick={onDelete}
          className="absolute top-0 right-0 text-red-500 p-1"
        >
          <FaTrashAlt />
        </button>
      )}
    </div>
  );
};

export default DraggableImage;
