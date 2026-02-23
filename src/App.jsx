import React from 'react';
import './App.css'; // Or keep it if there's anything useful, otherwise might be empty
import HomeBanner from './components/HomeBanner/HomeBanner';
import Essentials from './components/Essentials/Essentials';

function App() {
  return (
    <div className="app">
      <HomeBanner />
      <Essentials />
    </div>
  );
}

export default App;
