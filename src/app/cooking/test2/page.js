"use client";

import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const ItemType = 'IMAGE';

const ImageItem = ({ id, src, index, swapImages }) => {
  const [, dragRef] = useDrag({
    type: ItemType,
    item: { index },
  });

  const [, dropRef] = useDrop({
    accept: ItemType,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        swapImages(draggedItem.index, index);
        draggedItem.index = index; // ドラッグ中のアイテムの位置を更新
      }
    },
  });

  return (
    <div
      ref={(node) => dragRef(dropRef(node))}
      style={{
        margin: '10px',
        padding: '10px',
        border: '1px solid black',
        display: 'inline-block',
      }}
    >
      <img src={src} alt={`Image ${id}`} style={{ width: '100px', height: '100px' }} />
    </div>
  );
};

const App = () => {
  const [images, setImages] = useState([
    { id: 1, src: 'https://via.placeholder.com/100?text=1' },
    { id: 2, src: 'https://via.placeholder.com/100?text=2' },
    { id: 3, src: 'https://via.placeholder.com/100?text=3' },
  ]);

  const swapImages = (fromIndex, toIndex) => {
    const updatedImages = [...images];
    const temp = updatedImages[fromIndex];
    updatedImages[fromIndex] = updatedImages[toIndex];
    updatedImages[toIndex] = temp;
    setImages(updatedImages);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'flex' }}>
        {images.map((image, index) => (
          <ImageItem
            key={image.id}
            id={image.id}
            src={image.src}
            index={index}
            swapImages={swapImages}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default App;
