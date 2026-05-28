import React, { useState } from 'react';
import { Bell, Calendar, FileText, DollarSign, UserCheck, FolderOpen } from 'lucide-react';
import { useToast } from '../components/Toast';

const initialNotifsData = [
  { id: 1, type: 'appointment', text: 'Reminder: Site Visit at 123 Tech Park', time: '10 mins ago', icon: Calendar, color: 'var(--primary-color)', read: false, priority: 'High' },
  { id: 2, type: 'quotation', text: 'Quotation QT-5002 pending approval', time: '1 hour ago', icon: FileText, color: 'var(--warning-color)', read: false, priority: 'Medium' },
  { id: 3, type: 'payment', text: 'Payment overdue for Invoice INV-2026-01', time: '3 hours ago', icon: DollarSign, color: '#DC2626', read: false, priority: 'High' },
  { id: 4, type: 'lead', text: 'New lead assigned: Globex Inc', time: '5 hours ago', icon: UserCheck, color: 'var(--success-color)', read: true, priority: 'Low' },
  { id: 5, type: 'project', text: 'Project File PRJ-901 updated', time: '1 day ago', icon: FolderOpen, color: 'var(--text-muted)', read: true, priority: 'Low' },
];

const Notifications = () => {
  const [notifs, setNotifs] = useState(initialNotifsData);
  const addToast = useToast();

  const handleMarkAllRead = () => {
    setNotifs(notifs.map(n => ({ ...n, read: true })));
    addToast('All notifications marked as read', 'success');
  };

  const handleMarkRead = (id) => {
    setNotifs(notifs.map(n => n.id === id ? { ...n, read: true } : n));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Bell size={24} /> Notifications
        </h2>
        <button className="btn btn-outline" style={{ fontSize: '0.875rem' }} onClick={handleMarkAllRead}>Mark all as read</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {notifs.map((notif) => (
          <div key={notif.id} className="card" style={{ 
            display: 'flex', gap: '1rem', alignItems: 'flex-start', 
            opacity: notif.read ? 0.6 : 1,
            borderLeft: notif.read ? 'none' : `4px solid ${notif.color}`,
            transition: 'opacity 0.2s'
          }}>
            <div style={{
              width: '40px', height: '40px', borderRadius: '50%', backgroundColor: `${notif.color}15`, color: notif.color,
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
            }}>
              <notif.icon size={20} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                <p style={{ margin: 0, fontWeight: notif.read ? '500' : '600', color: 'var(--text-main)', fontSize: '1rem' }}>{notif.text}</p>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{notif.time}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                <span className={`badge ${notif.priority === 'High' ? 'badge-danger' : notif.priority === 'Medium' ? 'badge-warning' : 'badge-primary'}`} style={{ fontSize: '0.65rem', padding: '0.1rem 0.5rem' }}>
                  {notif.priority}
                </span>
                {!notif.read && <button style={{ background: 'none', border: 'none', color: 'var(--primary-color)', fontSize: '0.75rem', cursor: 'pointer', fontWeight: '500' }} onClick={() => handleMarkRead(notif.id)}>Mark as read</button>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
