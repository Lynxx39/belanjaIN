import React from 'react';
import { STATUS_FLOW, STATUS_LABEL } from '../context/AccountContext';
import { Check } from 'lucide-react';

export const OrderStatusTracker = ({ status }) => {
  if (status === 'dibatalkan') {
    return <div className="tracker-cancelled">Pesanan dibatalkan</div>;
  }

  const currentIndex = STATUS_FLOW.indexOf(status);

  return (
    <div className="tracker">
      {STATUS_FLOW.map((step, idx) => {
        const done = idx <= currentIndex;
        return (
          <React.Fragment key={step}>
            <div className={`tracker-step ${done ? 'done' : ''} ${idx === currentIndex ? 'current' : ''}`}>
              <div className="tracker-dot">{done ? <Check size={13} /> : idx + 1}</div>
              <span className="tracker-label">{STATUS_LABEL[step]}</span>
            </div>
            {idx < STATUS_FLOW.length - 1 && <div className={`tracker-line ${idx < currentIndex ? 'done' : ''}`} />}
          </React.Fragment>
        );
      })}
    </div>
  );
};