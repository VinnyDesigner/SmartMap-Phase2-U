import React from 'react';

export default function Toast({ toastMessage }) {
  if (!toastMessage) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      background: 'rgba(15, 23, 42, 0.95)',
      color: '#ffffff',
      padding: '12px 20px',
      borderRadius: '12px',
      fontSize: '13px',
      fontWeight: 500,
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      backdropFilter: 'blur(8px)',
      animation: 'fadeIn 0.2s ease-in-out'
    }}>
      <span style={{ color: '#00f2fe' }}>ℹ</span>
      {toastMessage}
    </div>
  );
}





