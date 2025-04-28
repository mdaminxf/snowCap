import { useState, useEffect } from 'react';

export default function Hero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('beauty');
  const [topRatedProduct, setTopRatedProduct] = useState(null);

  // Fetch data on component mount
  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        setCategories([...new Set(data.products.map((product) => product.category))]);
        
        // Find the highest-rated product
        const highestRated = data.products.reduce((prev, current) =>
          prev.rating > current.rating ? prev : current
        );
        setTopRatedProduct(highestRated);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  // Top 3 products with the highest discount
  const topDiscountedProducts = products
    .sort((a, b) => b.discountPercentage - a.discountPercentage)
    .slice(0, 3);

  // Fallback or loading state
  if (topDiscountedProducts.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid mb-4"></div>
        <h2 className="text-xl font-semibold text-gray-700">Loading...</h2>
        <p className="text-gray-500">Please wait while we fetch the data.</p>
      </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50">
      {/* Navigation Bar */}
      <header className="relative bg-gray-100">
        <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
          <div className="flex items-center">
          <div className="snowcap-container">
      <h1 className="snowcap-text">S N O W C A P</h1>
      <p className="tagline">Where the cold meets the sky in perfect harmony.</p>
    </div>
          </div>
          <div className="flex gap-x-5 underline underline-offset-2">
           
            <a href="/products" className="text-sm font-semibold text-gray-900 hover:text-gray-700">
              Products
            </a>
            <a href="/checkout" className="text-sm font-semibold text-gray-900 hover:text-gray-700">
              CheckOut
            </a>
          </div>
          
        </nav>
        {mobileMenuOpen && (
          <div className="lg:hidden">
            <div className="space-y-2 px-6 py-4">
             
              <a href="/products" className="block text-sm font-semibold text-gray-900">
                Products
              </a>
              <a href="/checkout" className="block text-sm font-semibold text-gray-900">
                CheckOut
              </a>
            </div>
          </div>
        )}
      </header>

      <main className="relative bg-white">
        {/* Top Rated Products Gallery */}
        <div className="max-w-7xl mx-auto py-8 px-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Top Discounted Products</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Side: Large Image */}
            <div className="col-span-1 lg:col-span-1">
              <a className="relative " href={`/product/${topDiscountedProducts[0]?.id}`} >
                <img
                  src={topDiscountedProducts[0]?.images[0] || 'https://dummyjson.com/image/200x100'} // First image from images array
                  alt={topDiscountedProducts[0]?.title || 'Product Image'}
                  className="w-full h-96 object-cover rounded-lg shadow-lg"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 rounded-lg"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-semibold">{topDiscountedProducts[0]?.title}</h3>
                  <p className="text-sm">{topDiscountedProducts[0]?.discountPercentage}% off</p>
                </div>
              </a>
            </div>

            {/* Right Side: Two Smaller Images */}
            <div className="col-span-1 lg:col-span-2 grid grid-rows-2 gap-6">
              {topDiscountedProducts.slice(1, 3).map((product) => (
                <a key={product.id} href={`/product/${product.id}`} className="relative">
                  <img
                    src={product.thumbnail || 'default-thumbnail.jpg'} // Thumbnail image
                    alt={product.title}
                    className="w-full h-48 object-cover rounded-lg shadow-md"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-black opacity-30 rounded-lg"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-lg font-semibold">{product.title}</h3>
                    <p className="text-sm">{product.discountPercentage}% off</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>

      <div className="mx-auto bg-gray-50 max-w-7xl px-6 py-8 lg:px-8">
        <div className="flex justify-center gap-x-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 text-sm font-semibold ${
                selectedCategory === category
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
              } rounded-md`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products
            .filter((product) => product.category === selectedCategory)
            .map((product) => (
              <a key={product.id} href={`/product/${product.id}`} className="border rounded-lg p-4 shadow-sm hover:scale-103 cursor-pointer">
                <img
                  src={product.thumbnail || 'default-thumbnail.jpg'}
                  alt={product.title}
                  className="h-40 w-full object-cover rounded-md"
                />
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{product.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{product.description}</p>
                <p className="mt-2 text-sm font-bold text-gray-900">Rating: {product.rating}</p>
                <p className="mt-2 text-sm font-bold text-green-500">${product.price}</p>
              </a>
            ))}
        </div>
      </div>
    </div>
  );
}
