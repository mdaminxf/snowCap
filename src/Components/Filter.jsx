import React, { useState, useEffect } from 'react';

const Filter = ({ setFilters }) => {
  const [categories, setCategories] = useState([]);
  const [prices, setPrices] = useState([]);
  const [ratings, setRatings] = useState([1, 2, 3, 4, 5]);

  useEffect(() => {
    // Fetch categories and prices dynamically
    fetch('https://dummyjson.com/products')
      .then((response) => response.json())
      .then((data) => {
        // Get unique categories
        const uniqueCategories = [...new Set(data.products.map((product) => product.category))];
        setCategories(uniqueCategories);

        // Get unique prices range (can define any range based on your data)
        const priceArray = data.products.map((product) => product.price);
        const minPrice = Math.min(...priceArray);
        const maxPrice = Math.max(...priceArray);
        setPrices([minPrice, maxPrice]);
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  return (
    <div className="p-3 m-1 bg-gray-100 rounded-md shadow-md md:col-span-2 lg:col-span-1">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Filter Products</h3>

      {/* Category filter */}
      <label className="block mb-4">
        <span className="text-sm font-medium text-gray-700">Category</span>
        <select
          name="category"
          onChange={handleFilterChange}
          className="block w-full mt-1 px-2 py-1 border border-gray-300 rounded-md text-gray-700"
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      {/* Price Range filter */}
      <label className="block mb-4">
        <span className="text-sm font-medium text-gray-700">Price Range</span>
        <select
          name="priceRange"
          onChange={handleFilterChange}
          className="block w-full mt-1 px-2 py-1 border border-gray-300 rounded-md text-gray-700"
        >
          <option value="">Any Price</option>
          <option value={`${prices[0]}-${prices[1]}`}>$ {prices[0]} - $ {prices[1]}</option>
        </select>
      </label>

      {/* Rating filter */}
      <label className="block mb-4">
        <span className="text-sm font-medium text-gray-700">Rating</span>
        <select
          name="rating"
          onChange={handleFilterChange}
          className="block w-full mt-1 px-2 py-1 border border-gray-300 rounded-md text-gray-700"
        >
          <option value="">Any Rating</option>
          {ratings.map((rating, index) => (
            <option key={index} value={rating}>
              {rating} Star{rating > 1 && 's'}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};

export default Filter;
