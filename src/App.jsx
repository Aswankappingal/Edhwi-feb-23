import React from 'react';
import './App.css'; // Or keep it if there's anything useful, otherwise might be empty
import HomeBanner from './components/HomeBanner/HomeBanner';
import PuritySection from './components/PuritySection/PuritySection';
import Essentials from './components/Essentials/Essentials';
import SecretsOfQuality from './components/SecretsOfQuality/SecretsOfQuality';

function App() {
  return (
    <div className="app">
      <HomeBanner />

      <Essentials />
      <PuritySection />
      <SecretsOfQuality />
    </div>
  );
}

export default App;
