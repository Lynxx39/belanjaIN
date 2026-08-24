import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Header } from './components/Header';
import { QuickServiceGrid } from './components/QuickServiceGrid';
import { CategoryPills } from './components/CategoryPills';
import { HeroBanner } from './components/HeroBanner';
import { FlashSale } from './components/FlashSale';
import { LiveStreamFeed } from './components/LiveStreamFeed';
import { ProductGrid } from './components/ProductGrid';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccess } from './components/OrderSuccess';
import { WishlistDrawer } from './components/WishlistDrawer';
import { ChatDrawer } from './components/ChatDrawer';
import { ToastContainer } from './components/ToastContainer';
import { BottomNav } from './components/BottomNav';
import { Footer } from './components/Footer';
import { MessageSquare, Sparkles } from 'lucide-react';

const MainApp = () => {
  const { setIsChatOpen } = useShop();

  return (
    <div className="app-container">
      {/* Header */}
      <Header />

      {/* Main Content Area */}
      <main className="max-w-layout" style={{ flex: 1 }}>
        {/* Hero Carousel */}
        <HeroBanner />

        {/* Quick E-Commerce Features (10 Services Grid) */}
        <QuickServiceGrid />

        {/* Categories Bar */}
        <CategoryPills />

        {/* Flash Sale Section */}
        <FlashSale />

        {/* Shopee Live Feed */}
        <LiveStreamFeed />

        {/* Filterable Product Grid Feed */}
        <ProductGrid />
      </main>

      {/* Modals & Overlays */}
      <ProductModal />
      <CartDrawer />
      <CheckoutModal />
      <OrderSuccess />
      <WishlistDrawer />
      <ChatDrawer />
      <ToastContainer />

      {/* Floating Chat Assistant Trigger */}
      <button
        className="floating-assistant-btn"
        onClick={() => setIsChatOpen(true)}
      >
        <MessageSquare size={18} />
        <span>Chat Penjual</span>
      </button>

      {/* Mobile Bottom Navigation Bar */}
      <BottomNav />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainApp />
    </ShopProvider>
  );
}
