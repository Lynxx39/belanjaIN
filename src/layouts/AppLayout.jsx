import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { BottomNav } from '../components/BottomNav';
import { ToastContainer } from '../components/ToastContainer';
import { ChatDrawer } from '../components/ChatDrawer';
import { Mascot } from '../components/Mascot';
import { MessageSquare } from 'lucide-react';
import { useUi } from '../context/UiContext';

export const AppLayout = ({ children }) => {
  const { setIsChatOpen } = useUi();

  return (
    <div className="app-container">
      <Header />
      <main className="max-w-layout main-content">
        {children || <Outlet />}
      </main>
      <Footer />
      <ToastContainer />
      <ChatDrawer />
      <Mascot onOpenChat={() => setIsChatOpen(true)} />
      <button className="floating-assistant-btn" onClick={() => setIsChatOpen(true)} aria-label="Chat penjual">
        <MessageSquare size={18} />
        <span>Chat Penjual</span>
      </button>
      <BottomNav />
    </div>
  );
};