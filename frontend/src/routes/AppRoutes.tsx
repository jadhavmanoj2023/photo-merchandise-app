import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import Category from '../pages/Category';
import ProductDetail from '../pages/ProductDetail';
import PhotoPrintDetail from '../pages/PhotoPrintDetail';
import PhotoPrintStudio from '../pages/PhotoPrintStudio';
import Cart from '../pages/Cart';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Profile from '../pages/Profile';
import About from '../pages/About';
import Contact from '../pages/Contact';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/category/:slug" element={<Category />} />
      <Route path="/photo-print/:id" element={<PhotoPrintDetail />} />
      <Route path="/photo-print/:id/studio" element={<PhotoPrintStudio />} />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/category" element={<Navigate to="/" replace />} />
      <Route path="/frames" element={<Navigate to="/" replace />} />
      <Route path="/frame-customizer/:frameId" element={<Navigate to="/" replace />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
    </Routes>
  );
}
