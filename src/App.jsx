import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import MyAccount from './components/MyAccount/MyAccount';

function App() {
  return (
    <div className="app">
      {/* Wrapper to give Navbar a background since it defaults to white text */}
      <div style={{ backgroundColor: '#1e3a8a' }}>
        <Navbar />
      </div>

      <MyAccount />

      {/* 
      // Temporarily hiding the home page components to work on My Account
      <HomeBanner />
      <Essentials />
      <PuritySection />
      <SecretsOfQuality />
      <OurProducts /> 
      */}
    </div>
  );
}

export default App;
