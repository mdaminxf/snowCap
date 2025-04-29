import React, { useState, useEffect } from 'react';

const Filter = ({ setFilters, products }) => {
  const [categories, setCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [ratings, setRatings] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    category: '',
    priceRange: '',
    rating: '',
  });
  const [sliderValue, setSliderValue] = useState([0, 0]);

  useEffect(() => {
    if (products.length > 0) {
      // Extract unique categories from the products
      const uniqueCategories = [...new Set(products.map((product) => product.category))];
      setCategories(uniqueCategories);

      // Calculate the price range from the products
      const prices = products.map((product) => product.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      setPriceRange([minPrice, maxPrice]);
      setSliderValue([minPrice, maxPrice]);

      // Extract unique ratings from the products
      const uniqueRatings = [...new Set(products.map((product) => Math.floor(product.rating)))];
      setRatings(uniqueRatings.sort((a, b) => a - b));
    }
  }, [products]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
    
  };

  const handleSliderChange = (e) => {
    const { name, value } = e.target;
    const newSliderValue = [...sliderValue];
    if (name === 'minPrice') {
      newSliderValue[0] = Number(value);
    } else if (name === 'maxPrice') {
      newSliderValue[1] = Number(value);
    }
    setSliderValue(newSliderValue);
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      priceRange: `${newSliderValue[0]}-${newSliderValue[1]}`,
    }));
  };

  const applyFilters = () => {
    setFilters(selectedFilters);
  };

  return (
    <div className="p-3 m-1 bg-gray-100 rounded-md shadow-md md:col-span-2 lg:col-span-1">
      <h3 className="text-lg font-semibold mb-4 text-gray-800">Filter Products</h3>

      {/* Category Filter */}
      <label className="block mb-4">
        <span className="text-sm font-medium text-gray-700">Category</span>
        <select
          name="category"
          value={selectedFilters.category}
          onChange={handleInputChange}
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

      {/* Price Range Slider */}
      <div className="mb-4">
        <span className="text-sm font-medium text-gray-700">Price Range</span>
        <div className="flex items-center justify-between mt-2">
          <input
            type="number"
            name="minPrice"
            value={sliderValue[0]}
            min={priceRange[0]}
            max={sliderValue[1]}
            onChange={handleSliderChange}
            className="w-20 px-2 py-1 border border-gray-300 rounded-md text-gray-700"
          />
          <span className="mx-2 text-gray-500">to</span>
          <input
            type="number"
            name="maxPrice"
            value={sliderValue[1]}
            min={sliderValue[0]}
            max={priceRange[1]}
            onChange={handleSliderChange}
            className="w-20 px-2 py-1 border border-gray-300 rounded-md text-gray-700"
          />
        </div>
        <div className="mt-2">
          <input
            type="range"
            name="minPrice"
            min={priceRange[0]}
            max={priceRange[1]}
            value={sliderValue[0]}
            onChange={handleSliderChange}
            className="w-full"
          />
          <input
            type="range"
            name="maxPrice"
            min={priceRange[0]}
            max={priceRange[1]}
            value={sliderValue[1]}
            onChange={handleSliderChange}
            className="w-full mt-1"
          />
        </div>
      </div>

      {/* Rating Filter */}
      <label className="block mb-4">
        <span className="text-sm font-medium text-gray-700">Rating</span>
        <select
          name="rating"
          value={selectedFilters.rating}
          onChange={handleInputChange}
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

      {/* Apply Filters Button */}
      <button
        onClick={applyFilters}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-500"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default Filter;
