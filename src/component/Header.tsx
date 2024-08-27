import React, {useState, useEffect} from 'react';
import {TonConnectButton} from '@tonconnect/ui-react'

const Header = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrollPosition < 50 ? "bg-transparent py-4" : "bg-white shadow-md py-2"}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img className="rounded-full mr-4" src="/vite.svg" alt="logo" />
            <div className="text-2xl font-bold text-[#1C2B46] hidden sm:inline">
              Nikandr's Apps
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <a
              href="#"
              className="hover:bg-[#f5f8fa] text-black font-bold py-1 px-2 rounded-md text-sm hover:bg-[#0077B5] transition duration-300 flex items-center"
            >
              Telegram
            </a>
            <a
              href="#"
              className="hover:bg-[#f5f8fa] text-black font-bold py-1 px-2 rounded-md text-sm hover:bg-[#0077B5] transition duration-300 flex items-center"
            >
              YouTube
            </a>
              <TonConnectButton/> 
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
