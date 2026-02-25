import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import MyAccount from './components/MyAccount/MyAccount';
import HomeBanner from './components/HomeBanner/HomeBanner';
import Essentials from './components/Essentials/Essentials';
import PuritySection from './components/PuritySection/PuritySection';
import SecretsOfQuality from './components/SecretsOfQuality/SecretsOfQuality';
import OurProducts from './components/OurProducts/OurProducts';
import OurProcess from './components/OurProcess/OurProcess';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="app">
      {currentPage === 'my-account' ? (
        <>
          {/* Wrapper to give Navbar a background since it defaults to white text */}
          <div style={{ backgroundColor: '#1e3a8a' }}>
            <Navbar setCurrentPage={setCurrentPage} />
          </div>
          <MyAccount setCurrentPage={setCurrentPage} />
        </>
      ) : (
        <>
          <HomeBanner setCurrentPage={setCurrentPage} />
          <Essentials />
          <PuritySection />
          <SecretsOfQuality />
          <OurProcess />
          <OurProducts />
        </>
      )}
    </div>
  );
}

export default App;
