import React, { useState, useEffect } from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Equipment from './Pages/Equipment';
import CheckOut from './Pages/CheckOut';
import PaymentSuccess from './Pages/PaymentSuccess';
import ProductDetail from './Pages/ProductDetail';
import { CartProvider } from './Components/CartContext';
import Products from './Pages/Products';

const App = () => {
  return(
    
    <BrowserRouter>
    <CartProvider>
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/products/:search" element={<Products />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
        </Route>
      </Routes>
    </CartProvider>
    </BrowserRouter>

  );
};

export default App;
