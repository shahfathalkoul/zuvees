import React, { useState, useEffect } from 'react';

const RawMaterialsPage = () => {
    const images = [
        'https://florette.ae/cdn/shop/collections/Screen_Shot_2022-04-30_at_5.15.56_PM_814x796.png?v=1696050634', // Image 1
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrBwARZpC1OVgQCHh9JbNmL52o4rWFjVwlEw&s', // Image 2
        'https://fyf.tac-cdn.net/images/products/small/FYF-118.jpg?auto=webp&quality=60&width=650' // Image 3
      ];
      

        const [products, setProducts] = useState([
          { 
            id: 1, 
            name: 'Flower Bouquet', 
            code: '#0001', 
            type: 'Flower Bouquet',
            defaultVariant: '3 roses, 3 lilies, paper wrap',
            variants: [
              { id: 1, name: 'Default', description: '3 roses, 3 lilies, paper wrap' }
            ],
            categories: ['Flowers', 'Packaging'],
            image: images[Math.floor(Math.random() * images.length)], // Random image from the new array
            price: 0,
            available: true
          },
          { 
            id: 2, 
            name: 'Chocolate Cake', 
            code: '#0002', 
            type: 'Cake',
            defaultVariant: 'Chocolate sponge, chocolate frosting',
            variants: [
              { id: 1, name: 'Default', description: 'Chocolate sponge, chocolate frosting' }
            ],
            categories: ['Baked Goods', 'Packaging'],
            image: images[Math.floor(Math.random() * images.length)], // Random image from the new array
            price: 0,
            available: true
          },
          // Add more sample products here to test pagination
          ...Array.from({ length: 20 }, (_, i) => ({
            id: i + 3,
            name: `Product ${i + 3}`,
            code: `#${String(i + 3).padStart(4, '0')}`,
            type: 'Sample',
            defaultVariant: 'Default',
            variants: [{ id: 1, name: 'Default', description: 'Default' }],
            categories: ['Sample'],
            image: images[Math.floor(Math.random() * images.length)], // Random image from the new array
            price: Math.floor(Math.random() * 100) + 1,
            available: Math.random() > 0.5
          }))
        ]);
      
        
    
      const [categories, setCategories] = useState([
        { id: 1, name: 'Flowers', rawMaterials: [1, 2] },
        { id: 2, name: 'Packaging', rawMaterials: [3] },
        { id: 3, name: 'Baked Goods', rawMaterials: [4, 5] },
      ]);
    
      const [rawMaterials, setRawMaterials] = useState([
        { id: 1, name: 'Rose', price: 2, inventory: 100 },
        { id: 2, name: 'Lily', price: 3, inventory: 80 },
        { id: 3, name: 'Paper Wrap', price: 1, inventory: 200 },
        { id: 4, name: 'Flour', price: 0.5, inventory: 500 },
        { id: 5, name: 'Chocolate', price: 4, inventory: 100 },
      ]);
    
      const [orders, setOrders] = useState([]);
      const [showAddModal, setShowAddModal] = useState(false);
      const [newProduct, setNewProduct] = useState({
        name: '',
        type: '',
        defaultVariant: '',
        categories: [],
        image: '',
      });
    
      // Pagination state
      const [currentPage, setCurrentPage] = useState(1);
      const [productsPerPage] = useState(10);
    
      useEffect(() => {
        // Recalculate prices and availability whenever raw materials change
        const updatedProducts = products.map(product => ({
          ...product,
          price: calculateProductPrice(product),
          available: checkProductAvailability(product),
        }));
        setProducts(updatedProducts);
      }, [rawMaterials]);
    
      const calculateProductPrice = (product) => {
        return product.categories.reduce((total, categoryName) => {
          const category = categories.find(c => c.name === categoryName);
          if (category) {
            return total + category.rawMaterials.reduce((catTotal, materialId) => {
              const material = rawMaterials.find(m => m.id === materialId);
              return catTotal + (material ? material.price : 0);
            }, 0);
          }
          return total;
        }, 0);
      };
    
      const checkProductAvailability = (product) => {
        return product.categories.every(categoryName => {
          const category = categories.find(c => c.name === categoryName);
          if (category) {
            return category.rawMaterials.every(materialId => {
              const material = rawMaterials.find(m => m.id === materialId);
              return material && material.inventory > 0;
            });
          }
          return false;
        });
      };
    
      const addProduct = () => {
        if (newProduct.name && newProduct.type && newProduct.defaultVariant) {
          const productId = products.length + 1;
          const newProductWithId = {
            ...newProduct,
            id: productId,
            code: `#${String(productId).padStart(4, '0')}`,
            variants: [{ id: 1, name: 'Default', description: newProduct.defaultVariant }],
            price: 0,
            available: true,
          };
          setProducts([...products, newProductWithId]);
          setNewProduct({ name: '', type: '', defaultVariant: '', categories: [], image: '' });
          setShowAddModal(false);
        }
      };
    
      const addVariant = (productId, variantName, variantDescription) => {
        setProducts(products.map(product => {
          if (product.id === productId) {
            const newVariant = {
              id: product.variants.length + 1,
              name: variantName,
              description: variantDescription,
            };
            return { ...product, variants: [...product.variants, newVariant] };
          }
          return product;
        }));
      };
    
      // const placeOrder = (productId, quantity) => {
      //   const product = products.find(p => p.id === productId);
      //   if (product && product.available) {
      //     const newOrder = {
      //       id: orders.length + 1,
      //       productId,
      //       productName: product.name,
      //       quantity,
      //       totalPrice: product.price * quantity,
      //       date: new Date().toISOString(),
      //     };
      //     setOrders([...orders, newOrder]);
      //     // Update raw material inventory
      //     const updatedRawMaterials = rawMaterials.map(material => {
      //       const isUsed = product.categories.some(categoryName => {
      //         const category = categories.find(c => c.name === categoryName);
      //         return category && category.rawMaterials.includes(material.id);
      //       });
      //       if (isUsed) {
      //         return { ...material, inventory: material.inventory - quantity };
      //       }
      //       return material;
      //     });
      //     setRawMaterials(updatedRawMaterials);
      //   }
      // };
    
      // Get current products for pagination
      const indexOfLastProduct = currentPage * productsPerPage;
      const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
      const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    
      // Change page
      const paginate = (pageNumber) => setCurrentPage(pageNumber);
    
      return (
        <>
          <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md">
              <div className="p-4">
                <h1 className="text-2xl font-bold text-blue-500"><span className="text-black">Ware</span>View</h1>
              </div>
              <nav className="mt-6">
                <div className="px-4 py-2 text-gray-500 uppercase text-xs font-semibold">General</div>
                <a href="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Products</a>
                <a href="/categories" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Categories</a>
                <a href="/raw" className="block px-4 py-2 bg-blue-500 text-white">Raw Materials</a>
                <a href="/variant" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Product Variant</a>
              </nav>
            </aside>
    
            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Header */}
              <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">Inventory</h2>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <input type="text" placeholder="Search" className="pl-8 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                    <button 
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
                      onClick={() => setShowAddModal(true)}
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add RawMaterial
                    </button>
                    <div className="flex items-center space-x-2">
                      <img src="https://via.placeholder.com/32" alt="User Avatar" className="w-8 h-8 rounded-full" />
                      <span className="font-medium">Bryan Doe</span>
                      <span className="text-sm text-gray-500">Admin</span>
                    </div>
                    <button className="text-gray-500 hover:text-gray-700">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </header>
    
              {/* Product Table */}
              <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                <div className="container mx-auto px-6 py-8">
                  <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full leading-normal">
                      <thead>
                        <tr>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                          </th>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Raw Material
                          </th>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Code
                          </th>
                          {/* <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Type
                          </th> */}
                          {/* <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Default Variant
                          </th> */}
                          {/* <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Price
                          </th> */}
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Available
                          </th>
                          <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Image
                          </th>
                          {/* <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Actions
                          </th> */}
                        </tr>
                      </thead>
                      <tbody>
                        {currentProducts.map((product) => (
                          <tr key={product.id}>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <input type="checkbox" className="form-checkbox h-4 w-4 text-blue-600" />
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">{product.name}</p>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">{product.code}</p>
                            </td>
                            {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">{product.type}</p>
                            </td> */}
                            {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">{product.defaultVariant}</p>
                            </td> */}
                            {/* <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <p className="text-gray-900 whitespace-no-wrap">${product.price.toFixed(2)}</p>
                            </td> */}
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${product.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {product.available ? 'Yes' : 'No'}
                              </span>
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              <img src={'https://florette.ae/cdn/shop/collections/Screen_Shot_2022-04-30_at_5.15.56_PM_814x796.png?v=1696050634'} alt={product.name} className="h-12 w-12 rounded-full" />
                            </td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                              {/* <button 
                                onClick={() => placeOrder(product.id, 1)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                Place Order
                              </button> */}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </main>
    
              {/* Pagination */}
              <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => paginate(currentPage + 1)}
                    disabled={indexOfLastProduct >= products.length}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-center">
                  <div>
                    {/* <p className="text-sm text-gray-700">
                      Showing <span className="font-medium">{indexOfFirstProduct + 1}</span> to <span className="font-medium">{Math.min(indexOfLastProduct, products.length)}</span> of{' '}
                      <span className="font-medium">{products.length}</span> results
                    </p> */}
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                        onClick={() => paginate(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      >
                        <span className="sr-only">Previous</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                      {Array.from({ length: Math.ceil(products.length / productsPerPage) }).map((_, index) => (
                        <button
                          key={index}
                          onClick={() => paginate(index + 1)}
                          className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                            currentPage === index + 1
                              ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                              : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                          }`}
                        >
                          {index + 1}
                        </button>
                      ))}
                      <button
                        onClick={() => paginate(currentPage + 1)}
                        disabled={indexOfLastProduct >= products.length}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                      >
                        <span className="sr-only">Next</span>
                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
    
          {/* Add Product Modal */}
          {showAddModal && (
            <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
              <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Add New Product
                    </h3>
                    <div className="mt-2">
                      <input
                        type="text"
                        placeholder="Product Name"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Product Type"
                        value={newProduct.type}
                        onChange={(e) => setNewProduct({...newProduct, type: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Default Variant"
                        value={newProduct.defaultVariant}
                        onChange={(e) => setNewProduct({...newProduct, defaultVariant: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Image URL"
                        value={'https://florette.ae/cdn/shop/collections/Screen_Shot_2022-04-30_at_5.15.56_PM_814x796.png?v=1696050634'}
                        onChange={(e) => setNewProduct({...newProduct, image: e.target.value})}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                      {/* Add more fields for categories, etc. */}
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={addProduct}
                    >
                      Add Product
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setShowAddModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      );
}

export default RawMaterialsPage