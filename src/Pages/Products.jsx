import React, { useState, useEffect } from 'react';
import Filter from '../Components/Filter';
import Products from '../Components/Products';
import Footer from '../Components/Footer';
import SideBar from '../Components/SideBar';
import { useParams } from 'react-router-dom';

const Home = () => {
  const { search } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    rating: '',
  });

  useEffect(() => {
    // Fetch products based on the search parameter
    fetch(`https://dummyjson.com/products/search?q=${search}`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        setFilteredProducts(data.products); // Initially, no filters applied
      })
      .catch((error) => console.error('Error fetching products:', error));
  }, [search]);

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

  const handleFilterChange = (newFilters) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      ...newFilters,
    }));
  };

  return (
    <div>
      <SideBar />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 p-4">
        {/* Pass the filter change handler to the Filter component */}
        <Filter setFilters={handleFilterChange} products={products} />        <div className="lg:col-span-3">
          <Products filteredProducts={filteredProducts || []} />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;