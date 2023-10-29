import React, { useState, useEffect } from 'react';
import productCardData from '../Assets/products.json';

const MainContent = () => {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(6);
  const [imageNumber, setImageNumber] = useState(1); // State for changing number

  useEffect(() => {
    setProducts(productCardData);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // Cycle through numbers 1, 2, 3
      setImageNumber((prevNumber) => (prevNumber % 3) + 1);
    }, 3000); // Change every 1 second

    return () => clearInterval(interval);
  }, []);

  const handleScroll = () => {
    const bottom =
      Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight;

    if (bottom) {
      setVisibleProducts((prevVisibleProducts) => prevVisibleProducts + 6);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderedProducts = products.slice(0, visibleProducts).map((item) => (
    <div className="card" key={item.id}>
      <div className="photo">
        {/* Inserting the changing number in the image src */}
        <img src={item.image[imageNumber-1]} alt={item.name} />
      </div>
      <div className="card_header name">
        <h3>{item.name}</h3>
      </div>
      <div className="card_header quantity">
        <p>{item.quantity}</p>
      </div>
      <div className="card_header price">
        <p>{item.price}</p>
      </div>
    </div>
  ));

  return (
    <div className='main_content'>
      {renderedProducts}
    </div>
  );
};

export default MainContent;
