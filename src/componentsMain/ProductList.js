import React from 'react';

const products = [
  { id: 1, name: 'Hydrasium Bouquet with Birthday Card', price: 1900, image: 'https://florette.ae/cdn/shop/collections/Screen_Shot_2022-04-30_at_5.15.56_PM_814x796.png?v=1696050634' },
  { id: 2, name: 'Orchid Camelia with Card', price: 2500, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrBwARZpC1OVgQCHh9JbNmL52o4rWFjVwlEw&s' },
  { id: 3, name: 'Hydrangea Easophagues Classic', price: 900, image: 'https://fyf.tac-cdn.net/images/products/small/FYF-118.jpg?auto=webp&quality=60&width=650' },
  { id: 4, name: 'Hydrangea Easophagues White', price: 800, image: 'https://florette.ae/cdn/shop/collections/Screen_Shot_2022-04-30_at_5.15.56_PM_814x796.png?v=1696050634' },
  { id: 5, name: 'Hydrangea Easophagues Blue', price: 800, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrBwARZpC1OVgQCHh9JbNmL52o4rWFjVwlEw&s' },
  { id: 1, name: 'Hydrasium Bouquet with Birthday Card', price: 1900, image: 'https://florette.ae/cdn/shop/collections/Screen_Shot_2022-04-30_at_5.15.56_PM_814x796.png?v=1696050634' },
  { id: 2, name: 'Orchid Camelia with Card', price: 2500, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrBwARZpC1OVgQCHh9JbNmL52o4rWFjVwlEw&s' },
  { id: 3, name: 'Hydrangea Easophagues Classic', price: 900, image: 'https://fyf.tac-cdn.net/images/products/small/FYF-118.jpg?auto=webp&quality=60&width=650' },
  { id: 4, name: 'Hydrangea Easophagues White', price: 800, image: 'https://florette.ae/cdn/shop/collections/Screen_Shot_2022-04-30_at_5.15.56_PM_814x796.png?v=1696050634' },
  { id: 5, name: 'Hydrangea Easophagues Blue', price: 800, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrBwARZpC1OVgQCHh9JbNmL52o4rWFjVwlEw&s' },
  { id: 1, name: 'Hydrasium Bouquet with Birthday Card', price: 1900, image: 'https://florette.ae/cdn/shop/collections/Screen_Shot_2022-04-30_at_5.15.56_PM_814x796.png?v=1696050634' },
  { id: 2, name: 'Orchid Camelia with Card', price: 2500, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrBwARZpC1OVgQCHh9JbNmL52o4rWFjVwlEw&s' },
  { id: 3, name: 'Hydrangea Easophagues Classic', price: 900, image: 'https://fyf.tac-cdn.net/images/products/small/FYF-118.jpg?auto=webp&quality=60&width=650' },
  { id: 4, name: 'Hydrangea Easophagues White', price: 800, image: 'https://florette.ae/cdn/shop/collections/Screen_Shot_2022-04-30_at_5.15.56_PM_814x796.png?v=1696050634' },
  { id: 5, name: 'Hydrangea Easophagues Blue', price: 800, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrBwARZpC1OVgQCHh9JbNmL52o4rWFjVwlEw&s' },
];

export function ProductList({ onSelectProduct }) {
  return (
    <div>
      {/* Featured Section */}
      <div className="relative h-[400px] w-full overflow-hidden rounded-lg mb-8">
        <img
          src="https://fyf.tac-cdn.net/images/products/small/FYF-118.jpg?auto=webp&quality=60&width=650"
          alt="Featured bouquet"
          className="w-full h-full object-contain"
        />
        <div className="absolute bottom-8 right-8 bg-black bg-opacity-75 text-white px-4 py-2 rounded-lg flex items-center gap-2">
          <span>Summer special Handmade bouquet</span>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Product Category */}
      <h2 className="text-2xl font-bold mb-6">Birthdays</h2>
      <div className="flex space-x-4 overflow-x-auto pb-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex-none w-[250px] cursor-pointer"
            onClick={() => onSelectProduct(product)}
          >
            {/* Product Card */}
            <div className="rounded-lg overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-[250px] object-cover"
              />
            </div>
            <h3 className="mt-2 text-sm font-medium">{product.name}</h3>
            <p className="text-sm text-gray-600">Rs. {product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
