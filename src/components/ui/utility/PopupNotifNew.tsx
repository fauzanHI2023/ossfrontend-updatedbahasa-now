// components/Notification.tsx
import {cn} from '@/lib/utils'; // optional helper untuk merge className
import {XCircle, CheckCircle, AlertTriangle} from 'lucide-react';
import {useEffect} from 'react';

export type NotificationType = 'success' | 'error' | 'warning';

interface NotificationProps {
  message: string;
  type?: NotificationType;
  show: boolean;
  onClose?: () => void;
  duration?: number; // auto close in ms
}

const iconMap = {
  success: <CheckCircle className="text-blue-600" />,
  error: <XCircle className="text-red-600" />,
  warning: <AlertTriangle className="text-yellow-600" />
};

export const PopUpNotification: React.FC<NotificationProps> = ({
  message,
  type = 'success',
  show,
  onClose,
  duration = 3000
}) => {
  useEffect(() => {
    if (show && duration) {
      const timer = setTimeout(() => {
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  const bgColor = {
    success: 'bg-white border-l-blue-600 text-blue-800',
    error: 'bg-white border-l-red-600 text-red-800',
    warning: 'bg-white border-l-yellow-500 text-yellow-800'
  }[type];

  return (
    <div
      className={cn(
        'fixed top-24 right-28 z-[9999999] w-fit max-w-sm flex items-center gap-3 p-4 rounded-tr-lg rounded-br-lg border shadow-md transition-opacity duration-300',
        bgColor
      )}
    >
      {iconMap[type]}
      <div className="flex-1 text-sm">{message}</div>
      <button onClick={onClose} className="text-inherit hover:opacity-70">
        ✕
      </button>
    </div>
  );
};
