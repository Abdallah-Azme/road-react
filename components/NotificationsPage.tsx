import React from 'react';
import { SpinnerIcon, BellIcon } from './Icons';
import { useNotifications, useDeleteNotification, useDeleteAllNotifications } from '../features/notifications/hooks/use-notifications';

const NotificationsPage: React.FC = () => {
  const { data: response, isLoading: loading } = useNotifications(1);
  const deleteMutation = useDeleteNotification();
  const deleteAllMutation = useDeleteAllNotifications();
  
  const notifications = Array.isArray(response) ? response : (response as any)?.data?.data || [];

  return (
    <div className="w-full min-h-screen bg-bg p-4 pb-24 animate-fade-in" dir="rtl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-navy dark:text-slate-200">الإشعارات</h2>
        {notifications.length > 0 && (
          <button 
            onClick={() => deleteAllMutation.mutate()}
            disabled={deleteAllMutation.isPending}
            className="text-xs font-bold text-red-500 bg-red-50 dark:bg-red-950/20 px-3 py-1.5 rounded-lg active:scale-95 transition-all"
          >
            {deleteAllMutation.isPending ? 'جاري الحذف...' : 'مسح الكل'}
          </button>
        )}
      </div>
      
      {loading ? (
        <div className="flex justify-center py-20">
          <SpinnerIcon className="w-8 h-8 text-navy dark:text-blue animate-spin" />
        </div>
      ) : notifications.length > 0 ? (
        <div className="flex flex-col gap-3">
          {notifications.map((notif: any) => (
            <div key={notif.id} className={`p-4 rounded-xl shadow-sm border relative group ${notif.is_read ? 'bg-white dark:bg-slate-900 border-pale dark:border-slate-800' : 'bg-navy/5 dark:bg-blue/5 border-navy/20 dark:border-blue/20'} transition-colors duration-300`}>
              <button 
                  onClick={() => deleteMutation.mutate(notif.id.toString())}
                  className="absolute top-3 left-3 w-8 h-8 rounded-full bg-red-50 dark:bg-red-900/30 text-red-500 flex items-center justify-center opacity-70 hover:opacity-100 active:scale-95"
              >
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"><path d="M6.28 5.22a.75.75 0 0 0-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 1 0 1.06 1.06L10 11.06l3.72 3.72a.75.75 0 1 0 1.06-1.06L11.06 10l3.72-3.72a.75.75 0 0 0-1.06-1.06L10 8.94 6.28 5.22Z" /></svg>
              </button>
              <h4 className="font-bold text-navy dark:text-slate-200 text-sm mb-1 ml-6">{notif.title}</h4>
              <p className="text-xs text-gray-500 dark:text-slate-400 font-medium mb-2">{notif.body}</p>
              <span className="text-[10px] text-gray-400 dark:text-slate-500">{notif.created_at}</span>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-32 flex flex-col items-center justify-center text-center px-6">
           <div className="w-16 h-16 bg-navy/5 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
              <BellIcon className="w-8 h-8 text-navy/40 dark:text-slate-500" />
           </div>
           <p className="text-sm font-bold text-gray-500 dark:text-slate-400 leading-relaxed">لا توجد إشعارات حالياً</p>
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
