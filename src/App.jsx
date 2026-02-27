
import { Routes, Route } from "react-router-dom";
import './App.css';
import Navbar from './components/Navbar/Navbar';
import MyAccount from './components/MyAccount/MyAccount';
import HomeBanner from './components/HomeBanner/HomeBanner';
import Essentials from './components/Essentials/Essentials';
import PuritySection from './components/PuritySection/PuritySection';
import SecretsOfQuality from './components/SecretsOfQuality/SecretsOfQuality';
import OurProducts from './components/OurProducts/OurProducts';
import OurProcess from './components/OurProcess/OurProcess';
import EdhwiMoments from './components/EdhwiMoments/EdhwiMoments';
import OurPromise from './components/OurPromise/OurPromise';
import VideoBanner from './components/VideoBanner/VideoBanner';
import Blogs from './components/Blogs/Blogs';
import ExploreProducts from "./components/Pages/ExploreProducts/ExploreProducts";

function App() {
  return (
    <>
      <div className="app">
        <Navbar />

        <Routes> {/* 🔹 NEW: Routes section */}

          {/* 🔹 Home Page */}
          <Route
            path="/"
            element={
              <>
                <HomeBanner />
                <Essentials />
                <PuritySection />
                <SecretsOfQuality />
                <OurProducts />
                <OurProcess />
                <EdhwiMoments />
                <OurPromise />
                <VideoBanner />
                <Blogs />
              </>
            }
          />

          {/* 🔹 My Account Page */}
          <Route path="/my-account" element={<MyAccount />} />

          {/* 🔹 Our Products Page */}
          <Route path="/our-products" element={<ExploreProducts />} />




        </Routes>
      </div>
    </>
  );
}

export default App;