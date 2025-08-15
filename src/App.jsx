import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';

import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import MenuPage from '@/pages/MenuPage';
import CartPage from '@/pages/CartPage';
import CheckoutPage from '@/pages/CheckoutPage';
import OrdersPage from '@/pages/OrdersPage';
import LoginPage from './pages/LoginPage';

import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminNovoPrato from './pages/admin/AdminNovoPrato';
import MenuPageAdmin from "./pages/admin/MenuPageAdmin";

import PublicMenu from './pages/PublicMenu';

import { CartProvider } from '@/contexts/CartContext';

const App = () => {
  return (
    <CartProvider>
      <Routes>
        {/* Página inicial agora é o menu público */}
        <Route path="/" element={<PublicMenu />} />

        {/* Layout para o cliente */}
        <Route element={<Layout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/orders" element={<OrdersPage />} />
        </Route>

        {/* Layout exclusivo para o admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="novo-prato" element={<AdminNovoPrato />} />
          <Route path="ver-ementa" element={<MenuPageAdmin />} />
        </Route>
      </Routes>

      <Toaster />
    </CartProvider>
  );
};

export default App;
