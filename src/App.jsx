import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { UiProvider } from './context/UiContext';
import { CatalogProvider } from './context/CatalogContext';
import { AccountProvider } from './context/AccountContext';
import { CartProvider } from './context/CartContext';
import { AppLayout } from './layouts/AppLayout';
import { Home } from './pages/Home';
import { Category } from './pages/Category';
import { Search } from './pages/Search';
import { ProductDetail } from './pages/ProductDetail';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Payment } from './pages/Payment';
import { Orders } from './pages/Orders';
import { OrderDetail } from './pages/OrderDetail';
import { Account } from './pages/Account';
import { Wishlist } from './pages/Wishlist';

export default function App() {
  return (
    <HashRouter>
      <UiProvider>
        <CatalogProvider>
          <AccountProvider>
            <CartProvider>
              <AppLayout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/kategori/:id" element={<Category />} />
                  <Route path="/cari" element={<Search />} />
                  <Route path="/produk/:id" element={<ProductDetail />} />
                  <Route path="/keranjang" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/pembayaran/:orderId" element={<Payment />} />
                  <Route path="/pesanan" element={<Orders />} />
                  <Route path="/pesanan/:orderId" element={<OrderDetail />} />
                  <Route path="/akun" element={<Account />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </AppLayout>
            </CartProvider>
          </AccountProvider>
        </CatalogProvider>
      </UiProvider>
    </HashRouter>
  );
}