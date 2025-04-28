import React from 'react';
import PropTypes from 'prop-types';
import { useCart } from './CartContext';

const Products = ({ filteredProducts = [] }) => { // Default to an empty array
  const { cart, addToCart, removeFromCart } = useCart();

  return (
    <div className="bg-white col-span-3 z-0 md:col-span-0 hover:scale-103">
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:grid-cols-2 sm:grid-cols-2">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group m-2 rounded overflow-hidden shadow-lg flex flex-col bg-white transition-transform duration-300 hover:scale-105"
            >
              {/* Image Section */}
              <div className="relative">
                <a href={`/product/${product.id}`} >
                  <img
                    className="w-full h-48 object-cover rounded-md"
                    src={product.thumbnail}
                    alt={product.title} // Corrected from 'name' to 'title'
                  />
                </a>
              </div>

              {/* Description Section */}
              <div className="z-0 px-6 py-4 mb-auto overflow-hidden max-h-20 transition-all duration-300 group-hover:max-h-40">
                <a
                  href={`/product/${product.id}`} 
                  className="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out mb-2"
                >
                  {product.title} {/* Corrected from 'name' to 'title' */}
                </a>
                <p className="text-gray-500 text-sm">{product.description}</p>
              </div>

              {/* Price and Buy Button / Counter */}
              <div className="px-6 py-3 flex items-center justify-between bg-blue-100">
                <span className="text-lg font-regular text-blue-900">
                  ${product.price}
                  <p className="text-yellow-500">{product.rating} ★</p>
                </span>

                {cart.some((item) => item.id === product.id) ? (
                  <div className="relative flex items-center">
                    <button
                      className="bg-white hover:bg-blue-200 border border-blue-300 rounded-l-lg p-2 h-10"
                      onClick={() => addToCart(product.id)}
                    >
                      +
                    </button>
                    <span className="px-4">
                      {cart.find((item) => item.id === product.id)?.qty}
                    </span>
                    <button
                      className="bg-white hover:bg-blue-200 border border-blue-300 rounded-r-lg p-2 h-10"
                      onClick={() => removeFromCart(product.id)}
                    >
                      -
                    </button>
                  </div>
                ) : (
                  <button
                    className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                    onClick={() => addToCart(product.id)}
                  >
                    Buy Me
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="grid grid-cols-1 justify-items-center bg-slate-100 p-8">
            <div className="text-xl text-gray-600">No Products Found!</div>
          </div>
        )}
      </div>
    </div>
  );
};

Products.propTypes = {
  filteredProducts: PropTypes.array, // Make it optional
};

export default Products;
