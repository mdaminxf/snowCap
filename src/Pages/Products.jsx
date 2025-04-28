import React, { useState, useEffect } from 'react';
import Filter from '../Components/Filter';
import Products from '../Components/Products';
import SideBar from '../Components/SideBar';
const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    rating: '',
  });

  useEffect(() => {
    // Fetch products from API
    fetch('https://dummyjson.com/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        setFilteredProducts(data.products);  // Initially, no filters, so show all products
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, []);

  useEffect(() => {
    // Apply filters whenever filters or products change
    let filtered = [...products];

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter((product) => product.category === filters.category);
    }

    // Apply price range filter
    if (filters.priceRange) {
      const [minPrice, maxPrice] = filters.priceRange.split('-').map(Number);
      filtered = filtered.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      );
    }

    // Apply rating filter
    if (filters.rating) {
      filtered = filtered.filter((product) => product.rating >= Number(filters.rating));
    }

    setFilteredProducts(filtered);
  }, [filters, products]);

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 p-4">
        <Filter setFilters={setFilters} />
        <div className="lg:col-span-3">
        <Products filteredProducts={filteredProducts || []} />        </div>
      </div>
      <SideBar />
    </div>
  );
};

export default Home;
