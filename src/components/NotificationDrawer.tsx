import React, { useState } from 'react';
import { Bell, X, Info, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'error';
  time: string;
  read: boolean;
}

export default function NotificationDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'New Student Enrolled',
      message: 'John Doe has completed the enrollment process for Grade 10.',
      type: 'success',
      time: '2 mins ago',
      read: false,
    },
    {
      id: '2',
      title: 'Low Inventory Alert',
      message: 'Science Lab supplies (beakers) are running low.',
      type: 'warning',
      time: '1 hour ago',
      read: false,
    },
    {
      id: '3',
      title: 'System Update',
      message: 'The ERP system will undergo maintenance at 12:00 AM UTC.',
      type: 'info',
      time: '3 hours ago',
      read: true,
    },
  ]);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'error': return <X className="w-5 h-5 text-red-500" />;
      default: return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl z-[101] flex flex-col"
          >
            <div className="p-6 border-b flex items-center justify-between bg-[#645C9A] text-white">
              <div className="flex items-center gap-2">
                <Bell className="w-6 h-6" />
                <h2 className="text-xl font-bold">Notifications</h2>
              </div>
              <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {notifications.length > 0 ? (
                notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`p-4 rounded-2xl border transition-all ${n.read ? 'bg-gray-50 border-gray-100' : 'bg-white border-blue-100 shadow-sm'}`}
                  >
                    <div className="flex gap-4">
                      <div className="shrink-0 mt-1">
                        {getIcon(n.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className={`font-semibold truncate ${n.read ? 'text-gray-700' : 'text-gray-900'}`}>
                            {n.title}
                          </h3>
                          {!n.read && <span className="w-2 h-2 bg-blue-500 rounded-full shrink-0" />}
                        </div>
                        <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                          {n.message}
                        </p>
                        <div className="flex items-center gap-1 text-[10px] text-gray-400 font-medium uppercase tracking-wider">
                          <Clock className="w-3 h-3" />
                          {n.time}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400 gap-4">
                  <Bell className="w-12 h-12 opacity-20" />
                  <p>No new notifications</p>
                </div>
              )}
            </div>

            <div className="p-4 border-t">
              <button
                onClick={markAllRead}
                className="w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition-colors"
              >
                Mark all as read
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
