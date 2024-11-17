'use client'

import React, { useState } from 'react'
import { ProductList } from './ProductList'
import { ProductCard } from './ProductCard'
import { CustomizationPage } from './CustomisePage'

const IMAGE_URL = "https://img.freepik.com/free-photo/colorful-flower-is-vase-with-yellow-center_1340-29676.jpg";

export default function FlowerShop() {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isCustomizing, setIsCustomizing] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold">zuvees</h1>
            </div>
            <nav className="hidden sm:block flex-1 px-8">
              <div className="flex justify-center">
                <div className="flex space-x-4 bg-gray-100 rounded-full px-4 py-2">
                  <button className="px-4 py-2 rounded-full bg-[#B39B9B] text-white">Bouquets</button>
                  <button className="px-4 py-2 text-gray-600 hover:text-gray-900">Cakes</button>
                  <button className="px-4 py-2 text-gray-600 hover:text-gray-900">Cards</button>
                  <button className="px-4 py-2 text-gray-600 hover:text-gray-900">Chocolates</button>
                </div>
              </div>
            </nav>
            <div>
              <button className="p-2 rounded-full bg-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedProduct ? (
          isCustomizing ? (
            <CustomizationPage 
              product={selectedProduct} 
              onBack={() => setIsCustomizing(false)}
            />
          ) : (
            <ProductCard 
              product={selectedProduct} 
              onBack={() => setSelectedProduct(null)}
              onCustomize={() => setIsCustomizing(true)}
              imageUrl={IMAGE_URL} // Pass the image URL to ProductCard
            />
          )
        ) : (
          <ProductList 
            onSelectProduct={setSelectedProduct} 
            imageUrl={IMAGE_URL} // Pass the image URL to ProductList
          />
        )}
      </main>
    </div>
  )
}
