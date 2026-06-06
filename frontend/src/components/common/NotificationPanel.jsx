import { Bell, X } from "lucide-react";
import { useState } from "react";
import useNotifications from "../../hooks/useNotifications.js";

const NotificationPanel = () => {
  const [open, setOpen] = useState(false);
  const { notifications, clearAll } = useNotifications();

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-xl hover:bg-white/10 transition text-slate-300"
      >
        <Bell size={20} />
        {notifications.length > 0 && (
          <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[10px] font-bold flex items-center justify-center">
            {notifications.length > 9 ? "9+" : notifications.length}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-2 w-80 glass-card z-50 overflow-hidden animate-fade-in">
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <h3 className="font-semibold text-white text-sm">Notifications</h3>
              <div className="flex gap-2">
                {notifications.length > 0 && (
                  <button onClick={clearAll} className="text-xs text-teal-400 hover:text-teal-300">Clear</button>
                )}
                <button onClick={() => setOpen(false)}><X size={16} className="text-slate-400" /></button>
              </div>
            </div>
            <div className="max-h-72 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="text-slate-500 text-sm text-center py-8">No notifications yet</p>
              ) : (
                notifications.map((n, i) => (
                  <div key={n.id || i} className="px-4 py-3 border-b border-white/5 hover:bg-white/5 transition">
                    <p className="text-sm text-slate-200">{n.message}</p>
                    <p className="text-xs text-slate-500 mt-1">
                      {n.time ? new Date(n.time).toLocaleTimeString() : "Just now"}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationPanel;
