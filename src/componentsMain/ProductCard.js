import React, { useState } from 'react';

export function ProductCard({ product, onBack, onCustomize }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Replace all image placeholders with the provided link
  const imageLink = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrBwARZpC1OVgQCHh9JbNmL52o4rWFjVwlEw&s";
  const images = Array(5).fill(imageLink);

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="relative">
        <button onClick={onBack} className="absolute top-0 left-0 m-4 p-2 bg-white rounded-full shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="aspect-square overflow-hidden rounded-lg bg-gray-200">
          <img
            src={images[currentImageIndex]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full ${
                index === currentImageIndex ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <div className="mt-2 flex items-center gap-2">
          <div className="flex">
            {[1, 2, 3].map((_, index) => (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-yellow-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            {[1, 2].map((_, index) => (
              <svg
                key={index}
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-300"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-gray-600">(230 reviews)</span>
        </div>
        <p className="mt-4 text-2xl font-bold">Rs. {product.price.toFixed(2)}</p>
        <p className="mt-4 text-gray-600">
          A delicate blend of lush hydrangea blooms, symbolizing heartfelt emotions and timeless
          beauty, perfect for any occasion.
        </p>

        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4">Select Variant</h3>
          <div className="flex gap-4">
            {[1, 2, 3].map((variant) => (
              <button key={variant} className="relative rounded-lg overflow-hidden">
                <img
                  src={imageLink}
                  alt={`Variant ${variant}`}
                  className="w-20 h-20 object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 text-center">
                  Variant {variant}
                </div>
              </button>
            ))}
            <button className="relative rounded-lg overflow-hidden" onClick={onCustomize}>
              <img
                src={imageLink}
                alt="Customize"
                className="w-20 h-20 object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 text-center">
                Customize
              </div>
            </button>
          </div>
        </div>

        <button className="mt-8 w-full bg-[#B39B9B] hover:bg-[#A08B8B] text-white py-4 rounded-md text-lg font-medium">
          Send Now
        </button>
      </div>
    </div>
  );
}
