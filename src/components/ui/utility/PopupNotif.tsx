import React, { useState, useEffect } from 'react';

interface PopupNotifProps {
  message: string;
  duration?: number;
  background?: string;
  onClose?: () => void;
}

const PopupNotif: React.FC<PopupNotifProps> = ({ message, duration = 3000, background = 'bg-sky-500', onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) {
          onClose();
        }
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration, onClose]);

  return (
    <div
      className={`fixed top-16 z-[9999999] left-1/2 transform -translate-x-1/2 ${background} text-white py-2 px-4 rounded transition-all duration-500 ease-in-out z-50 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}
    >
      {message}
    </div>
  );
};

export default PopupNotif;
