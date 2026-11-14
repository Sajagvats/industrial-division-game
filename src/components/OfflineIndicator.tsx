import React from 'react';
import { useOnlineStatus } from '../utils/useOnlineStatus';
import { WifiOff } from 'lucide-react';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();

  if (isOnline) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50 flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 px-3.5 py-2 text-xs font-bold text-white shadow-xl border border-amber-400/50 animate-pulse">
      <WifiOff className="w-4 h-4 text-white" />
      <span>Offline Mode — Game locally running from Service Worker cache.</span>
    </div>
  );
};
