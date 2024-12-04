import React from 'react';

export default function UnderConstructionPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center mb-6">
        <img 
          src="/images/UnderConstruction.jpg" 
          alt="Don't look yet" 
          className="w-auto h-auto" 
        />
      </div>
      <h1 className="text-3xl font-bold text-pink-600">見ちゃダメ～ん！</h1>
      <p className="text-xl text-gray-700 mt-4">このページはまだ準備中です。しばらくお待ちください！</p>
      <p className="text-sm text-gray-500 mt-2">気になる？ ちょっとだけ待っててね！</p>
    </div>
  );
}
