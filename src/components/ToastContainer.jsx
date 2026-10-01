import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export const ToastContainer = () => {
  const { toasts } = useShop();

  if (toasts.length === 0) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle2 size={18} color="#10B981" />;
      case 'error':
        return <AlertCircle size={18} color="#EF4444" />;
      case 'warning':
        return <AlertTriangle size={18} color="#F59E0B" />;
      default:
        return <Info size={18} color="#3B82F6" />;
    }
  };

  return (
    <div className="toast-container" role="status" aria-live="polite">
      {toasts.map((t) => (
        <div key={t.id} className={`toast-item ${t.type}`}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            {getIcon(t.type)}
            <div>
              <div className="toast-title">{t.title}</div>
              {t.message && <div className="toast-message">{t.message}</div>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
