import React, { useState, useEffect } from 'react';
import Footer from '../Components/Footer';
import Hero from '../Components/Hero';
import SideBar from '../Components/SideBar';
const Home = () => {
 
  return (
    <div>
      <SideBar />
      <Hero />
      <Footer />
    </div>
  );
};

export default Home;
