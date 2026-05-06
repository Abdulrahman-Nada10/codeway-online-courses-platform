import React from 'react';

interface NotificationProps {
  title: string;
  category: string;
  time?: string;
  type: 'lesson' | 'live' | 'reply';
  isRead?: boolean;
}

const NotificationCard = ({ title, category, time, type, isRead }: NotificationProps) => {
  return (
    <div className={`flex items-center p-4 mb-3 border rounded-xl bg-white shadow-sm ${!isRead ? 'border-blue-100' : 'border-gray-100'}`}>
      <div className="flex-shrink-0 ml-4">
        {/* أيقونات ديناميكية بناءً على النوع */}
        {type === 'lesson' && <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-500">⭐</div>}
        {type === 'live' && <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-500">🎥</div>}
        {type === 'reply' && <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-500">👤</div>}
      </div>
      
      <div className="flex-grow text-right">
        <h3 className={`text-sm font-bold ${type === 'live' ? 'text-red-500' : 'text-gray-800'}`}>{title}</h3>
        <p className="text-xs text-gray-500 mt-1">{category}</p>
        {time && <p className="text-[10px] text-gray-400 mt-1">{time}</p>}
      </div>
    </div>
  );
};

export default NotificationCard;