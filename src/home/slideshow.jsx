import React, { useState, useEffect } from 'react';
import './home.css'
const Slideshow = ({ images, interval }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(intervalId);
  }, [images.length, interval]);

  const handleClick = (newIndex) => {
    setIndex(newIndex);
  };

  return (
    <div className="slideshow-container">
      <div className="slides">
        {images.map((image, idx) => (
          <img key={idx} src={image} alt={`Slide ${idx}`} style={{ display: idx === index ? 'block' : 'none',width:"100%",height:"300px" }} />
        ))}
      </div>
      <div className="points-container">
        <div className="points mb-5">
          {images.map((_, idx) => (
            <span key={idx} className={`point ${idx === index ? 'active' : ''}`} onClick={() => handleClick(idx)} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slideshow;
