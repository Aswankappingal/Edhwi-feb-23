
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
import ProductPage from "./components/Pages/Productpage/ProductPage";
import Gallery from "./components/Pages/Gallery/Gallery";
import Footer from "./components/Common/Footer/Footer";
import Cart from "./components/Pages/Cart/Cart";
import BlogSub from './components/BlogSub/BlogSub';

function App() {
  return (
    <>
      <div className="app">
        {/* Global Navbar removed: <Navbar /> */}

        <Routes> {/* 🔹 NEW: Routes section */}

          {/* 🔹 Home Page */}
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <HomeBanner />
                <Essentials />
                <PuritySection />
                <SecretsOfQuality />
                <OurProducts />
                <OurProcess />
                <EdhwiMoments />
                <OurPromise />
                <VideoBanner />
                <BlogSub />

              </>
            }
          />

          {/* 🔹 Blogs Page */}
          <Route path="/blogs" element={<Blogs />} />

          {/* 🔹 My Account Page */}
          <Route path="/my-account" element={<MyAccount />} />

          {/* 🔹 Our Products Page */}
          <Route path="/our-products" element={<ExploreProducts />} />

          <Route path='/Product-page' element={<ProductPage />} />
          <Route path='/gallery' element={<Gallery />} />
          <Route path='/cart' element={<Cart />} />




        </Routes>
        <Footer />
      </div>
    </>
  );
}

export default App;