// Amazon-style home page using React + Tailwind
import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, Search, User, ShoppingCart, Package } from 'lucide-react';

const categories = [
  'Pick up where you left off',
  'Keep shopping for',
  'Continue shopping deals'
];

const ProductRow = ({ title, products }) => {
  return (
    <div className="my-8 bg-gray-100 py-10">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 px-4 text-center">{title}</h2>
      <div className="flex overflow-x-auto gap-4 px-4 justify-center ">
        {products.map((product) => (
          <a
            key={product.id}
            href={`/product/${product.id}`}
            className="min-w-[160px] bg-white shadow cursor-pointer rounded-md p-2 hover:shadow-xl transition-transform duration-200"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-32 object-contain mb-2"
            />
            <h3 className="text-sm font-medium text-gray-700 line-clamp-2">{product.title}</h3>
            <p className="text-xs text-gray-500">${product.price}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

const HeroBanner = () => {
  return (
    <div
      className="relative h-64 bg-yellow-300 flex justify-center items-center text-center text-white"
      style={{
        backgroundImage: 'url(https://a.media-amazon.com/images/G/31/prime/MayART/header/New/AMAZON-PRIME-MAY-ART-PC-HEADER-1_4_1.gif)',
        backgroundSize: 'contain',
        backgroundPosition: 'center',
      }}
    >
    </div>
  );
};



const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=12')
      .then((res) => res.json())
      .then((data) => setProducts(data.products));
  }, []);

  return (
    <div className="bg-gray-200 min-h-screen">
      <HeroBanner />
      <main className="max-w-7xl mx-auto py-4">
        {categories.map((title, i) => (
          <ProductRow
            key={title}
            title={title}
            products={products.slice(i * 4, i * 4 + 4)}
          />
        ))}
      </main>
    </div>
  );
};

export default HomePage;

// Tailwind setup reminder (tailwind.config.js)
// module.exports = {
//   theme: {
//     extend: {
//       colors: {
//         amazon_blue: '#131921'
//       }
//     }
//   }
// }
