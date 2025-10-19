import React, { useState, useEffect } from 'react';
import Icon from './Icon.tsx';

const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set up event listener
  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isVisible && (
        <button
          type="button"
          onClick={scrollToTop}
          className="bg-oyo-red text-white rounded-full p-3 shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-oyo-red transition-transform duration-200 ease-in-out hover:scale-110"
          aria-label="Go to top"
        >
          <Icon name="arrow-up" className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
