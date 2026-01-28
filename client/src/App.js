import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import styled from 'styled-components';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { GlobalStyles } from './styles/globalStyles';

// Layout Components
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Support from './pages/Support';
import UserProfile from './pages/UserProfile';
import Checkout from './pages/CheckoutPage';
import RegisterPage from './pages/RegisterPage';
import SellerDashboard from './pages/SellerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import CartPage from './pages/CartPage';
import ProductsPage from './pages/ProductsPage';
import FAQPage from './pages/FAQPage';
import ShippingReturnsPage from './pages/ShippingReturnsPage';
import SellerCenter from './pages/SellerCenter';
import OrderConfirmation from './pages/OrderConfirmation';

// Seller Pages
import AddProduct from './pages/seller/AddProduct';
import ManageProducts from './pages/seller/ManageProducts';
import Orders from './pages/seller/Orders';
import BranchManagement from './pages/seller/BranchManagement';
import PayoutsAnalytics from './pages/seller/PayoutsAnalytics';

// UI Components
import { Loading } from './components/ui';

function AppContent() {
  return (
    <AppContainer>
      <Header />
      <MainContent>
        <Suspense fallback={<Loading fullScreen />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/support" element={<Support />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/seller-dashboard" element={<SellerDashboard />} />
            <Route path="/seller-center" element={<SellerCenter />} />
            <Route path="/seller/add-product" element={<AddProduct />} />
            <Route path="/seller/manage-products" element={<ManageProducts />} />
            <Route path="/seller/orders" element={<Orders />} />
            <Route path="/seller/branch-management" element={<BranchManagement />} />
            <Route path="/seller/payouts-analytics" element={<PayoutsAnalytics />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/shipping-returns" element={<ShippingReturnsPage />} />
          </Routes>
        </Suspense>
      </MainContent>
      <Footer />
    </AppContainer>
  );
}

function App() {
  return (
    <Router>
      <GlobalStyles />
      <AuthProvider>
        <CartProvider>
          <AppContent />
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
`;

export default App;
