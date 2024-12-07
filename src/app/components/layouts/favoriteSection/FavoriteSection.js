"use client";
import DraggableImage from "../../elements/draggableImage/DraggableImage";

export default function FavoriteSection({ favorites, onDelete }) {
  return (
    <section className="white-container mt-6">
      <h2 className="text-lg font-bold mb-4">Favorite</h2>
      <div className="flex space-x-4">
        {favorites.map((favorite) => (
          <div key={favorite.id} className="flex items-center justify-center">
            <DraggableImage
              id={favorite.id}
              src={favorite.src}
              onDelete={onDelete ? () => onDelete(favorite.id) : undefined}
            />
          </div>
        ))}
      </div>
    </section>
  );
}