import React, { useEffect } from 'react';
import Icon from './Icon.tsx';

interface NotificationProps {
  message: string;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // Auto-dismiss after 3 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-24 right-4 bg-gray-900 text-white py-3 px-5 rounded-lg shadow-lg flex items-center z-50 animate-fade-in-down">
      <span className="mr-4 text-sm font-medium">{message}</span>
      <button 
        onClick={onClose} 
        aria-label="Dismiss notification"
        className="text-gray-400 hover:text-white"
      >
        <Icon name="x" className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Notification;
