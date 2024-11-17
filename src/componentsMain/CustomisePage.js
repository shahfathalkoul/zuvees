import React, { useState } from 'react'

export function CustomizationPage({ product, onBack }) {
  const [customization, setCustomization] = useState({
    roses: 2,
    leaves: 4,
    wrapper: 1,
  })

  const handleCustomization = (item, value) => {
    setCustomization(prev => ({ ...prev, [item]: value }))
  }

  return (
    <div className="grid md:grid-cols-2 gap-8">
      <div className="relative">
        <button onClick={onBack} className="absolute top-0 left-0 m-4 p-2 bg-white rounded-full shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="aspect-square overflow-hidden rounded-lg bg-gray-200">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="mt-4 text-2xl font-bold">Rs. {product.price.toFixed(2)}</p>
        <p className="mt-4 text-gray-600">Customize your bouquet to create the perfect arrangement.</p>
        
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-4">Customize Your Bouquet</h3>
          <div className="space-y-4">
            {Object.entries(customization).map(([item, quantity]) => (
              <div key={item} className="flex justify-between items-center">
                <span className="text-lg capitalize">{item}</span>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleCustomization(item, Math.max(0, quantity - 1))}
                    className="w-8 h-8 rounded-full border flex items-center justify-center"
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => handleCustomization(item, quantity + 1)}
                    className="w-8 h-8 rounded-full border flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button 
          className="mt-8 w-full bg-[#B39B9B] hover:bg-[#A08B8B] text-white py-4 rounded-md text-lg font-medium"
        >
          Send Now
        </button>
      </div>
    </div>
  )
}