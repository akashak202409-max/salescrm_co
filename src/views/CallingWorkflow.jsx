import React from 'react';
import { PhoneCall, Calendar, Clock, Upload, CheckCircle, MoreVertical, PlayCircle } from 'lucide-react';
import { useToast } from '../components/Toast';

const callingData = [
  { id: 1, name: 'Alice Walker', project: 'Office Renovation', lastCall: '5m 32s', followUp: 'Today, 4:00 PM', status: 'Follow-up Done', notes: 'Client is interested in the premium glass partition. Needs quote by EOD.' },
  { id: 2, name: 'David Smith', project: 'Commercial Kitchen', lastCall: '12m 45s', followUp: 'Tomorrow, 10:00 AM', status: 'First Call Completed', notes: 'Discussed initial requirements. Site visit to be scheduled.' },
  { id: 3, name: 'Emma Johnson', project: 'Residential Villa', lastCall: '3m 10s', followUp: 'No Date', status: 'Lead Created', notes: 'Left a voicemail. Will try again tomorrow.' },
];

const CallingTimeline = ({ currentStatus }) => {
  const steps = ['Lead Created', 'First Call Completed', 'Follow-up Done', 'Appointment Fixed'];
  const currentIndex = steps.indexOf(currentStatus);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '12px', left: '0', right: '0', height: '2px', backgroundColor: 'var(--border-color)', zIndex: 0 }}></div>
      {steps.map((step, index) => {
        const isCompleted = index <= currentIndex;
        return (
          <div key={step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', zIndex: 1, width: '25%' }}>
            <div style={{
              width: '24px', height: '24px', borderRadius: '50%',
              backgroundColor: isCompleted ? 'var(--success-color)' : 'var(--surface-color)',
              border: isCompleted ? 'none' : '2px solid var(--border-color)',
              color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {isCompleted && <CheckCircle size={14} />}
            </div>
            <span style={{ fontSize: '0.75rem', fontWeight: isCompleted ? '600' : '400', color: isCompleted ? 'var(--text-main)' : 'var(--text-muted)', textAlign: 'center' }}>
              {step}
            </span>
          </div>
        );
      })}
    </div>
  );
};

const CallingWorkflow = () => {
  const addToast = useToast();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>Calling Updates</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button style={{ 
            backgroundColor: 'var(--primary-color)', 
            color: 'white', 
            borderRadius: '9999px', 
            padding: '0.6rem 1.25rem', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            border: 'none', 
            cursor: 'pointer', 
            fontSize: '1rem', 
            fontWeight: '400',
            boxShadow: 'var(--shadow-sm)'
          }} onClick={() => addToast('Initializing Dialer...')}>
            <PhoneCall size={20} /> Start Dialing
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '1.5rem' }}>
        {callingData.map((call) => (
          <div key={call.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--primary-color)', color: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
                }}>
                  {call.name.charAt(0)}
                </div>
                <div>
                  <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '600' }}>{call.name}</h3>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>{call.project}</p>
                </div>
              </div>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <MoreVertical size={16} />
              </button>
            </div>

            <CallingTimeline currentStatus={call.status} />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', backgroundColor: '#F8FAFC', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                 <Clock size={14} color="var(--text-muted)" />
                 <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{call.lastCall}</span>
               </div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                 <Calendar size={14} color="var(--warning-color)" />
                 <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{call.followUp}</span>
               </div>
            </div>

            <div>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem', fontWeight: '500' }}>Call Notes</p>
              <p style={{ fontSize: '0.875rem', margin: 0, backgroundColor: 'var(--surface-color)', border: '1px solid var(--border-color)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
                {call.notes}
              </p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
              <button className="btn btn-outline" style={{ display: 'flex', gap: '0.5rem', padding: '0.25rem 0.75rem', fontSize: '0.75rem' }} onClick={() => addToast('Opening audio file picker...', 'primary')}>
                <Upload size={14} /> Audio Note
              </button>
              <button className="btn btn-outline" style={{ display: 'flex', gap: '0.5rem', padding: '0.25rem 0.75rem', fontSize: '0.75rem', color: 'var(--primary-color)', borderColor: 'var(--primary-color)' }} onClick={() => addToast(`Opening status updater for ${call.name}`)}>
                Update Status
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CallingWorkflow;
