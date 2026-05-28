import React from 'react';
import { Calendar, FileText, DollarSign, UserPlus } from 'lucide-react';

const activities = [
  { id: 1, type: 'appointment', text: 'New appointment fixed for Client A', time: '10 mins ago', icon: Calendar, color: 'var(--primary-color)' },
  { id: 2, type: 'quotation', text: 'Quotation prepared for Project X', time: '1 hour ago', icon: FileText, color: 'var(--secondary-color)' },
  { id: 3, type: 'payment', text: 'Payment received from ABC Interiors', time: '3 hours ago', icon: DollarSign, color: 'var(--success-color)' },
  { id: 4, type: 'lead', text: 'Lead assigned to Sales Manager', time: '5 hours ago', icon: UserPlus, color: 'var(--warning-color)' },
];

const ActivityFeed = () => {
  return (
    <div style={{
      width: '320px',
      backgroundColor: 'var(--surface-color)',
      borderLeft: '1px solid var(--border-color)',
      padding: '1.5rem',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflowY: 'auto'
    }}>
      <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1.5rem', color: 'var(--text-main)' }}>Live Activity</h3>
      
      <div style={{ position: 'relative' }}>
        {/* Timeline line */}
        <div style={{
          position: 'absolute',
          left: '16px',
          top: '24px',
          bottom: '24px',
          width: '2px',
          backgroundColor: 'var(--border-color)',
          zIndex: 0
        }}></div>

        {activities.map((activity) => (
          <div key={activity.id} style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', position: 'relative', zIndex: 1 }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: `${activity.color}20`, // 20% opacity
              color: activity.color,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              boxShadow: '0 0 0 4px var(--surface-color)'
            }}>
              <activity.icon size={16} />
            </div>
            <div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-main)', margin: '0 0 0.25rem 0', fontWeight: '500' }}>
                {activity.text}
              </p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0 }}>
                {activity.time}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: 'auto', paddingTop: '2rem' }}>
         <button className="btn btn-outline" style={{ width: '100%' }}>View All Activity</button>
      </div>
    </div>
  );
};

export default ActivityFeed;
