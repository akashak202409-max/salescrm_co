import React, { useState } from 'react';
import { Calendar as CalendarIcon, MapPin, Clock, Edit2, User, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useToast } from '../components/Toast';

const initialAppointmentsData = [
  { id: 1, client: 'Acme Corp', projectType: 'Office Renovation', location: '123 Tech Park, Block C', date: 'Oct 24, 2026', time: '10:00 AM', manager: 'Mike Johnson', status: 'Confirmed' },
  { id: 2, client: 'John Doe', projectType: 'Residential Villa', location: '45 Beverly Hills, Plot 12', date: 'Oct 24, 2026', time: '2:30 PM', manager: 'Sarah Smith', status: 'Pending Confirmation' },
  { id: 3, client: 'Stark Industries', projectType: 'Warehouse Build', location: 'Industrial Area Phase 2', date: 'Oct 25, 2026', time: '11:00 AM', manager: 'Alex Wong', status: 'Confirmed' },
];

const Appointments = () => {
  const addToast = useToast();
  const [appointments, setAppointments] = useState(initialAppointmentsData);
  const [viewMode, setViewMode] = useState('list'); // 'list' or 'calendar'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newVisit, setNewVisit] = useState({ client: '', projectType: '', location: '', date: '', time: '', manager: 'Unassigned', status: 'Pending Confirmation' });

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    if (!newVisit.client || !newVisit.date) return;
    
    const d = new Date(newVisit.date);
    const formattedDate = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    const visit = {
      ...newVisit,
      id: Date.now(),
      date: formattedDate !== 'Invalid Date' ? formattedDate : newVisit.date
    };
    
    setAppointments([...appointments, visit]);
    setIsModalOpen(false);
    setNewVisit({ client: '', projectType: '', location: '', date: '', time: '', manager: 'Unassigned', status: 'Pending Confirmation' });
    addToast('Visit scheduled successfully!');
  };

  const renderCalendar = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dates = Array.from({length: 31}, (_, i) => i + 1);
    
    return (
      <div className="card" style={{ flex: 1, padding: '1.5rem', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ margin: 0 }}>October 2026</h3>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn btn-outline" style={{ padding: '0.25rem' }}><ChevronLeft size={16} /></button>
            <button className="btn btn-outline" style={{ padding: '0.25rem' }}><ChevronRight size={16} /></button>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem', textAlign: 'center', fontWeight: '600', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
          {days.map(d => <div key={d}>{d}</div>)}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem', flex: 1, minHeight: '600px' }}>
          {Array.from({length: 4}).map((_, i) => <div key={`empty-${i}`} />)}
          {dates.map(date => {
            const dayAppts = appointments.filter(a => a.date.includes(`Oct ${date},`) || a.date.includes(`Oct ${date < 10 ? '0'+date : date},`));
            
            return (
              <div key={date} style={{ 
                border: '1px solid var(--border-color)', 
                borderRadius: 'var(--radius-md)', 
                padding: '0.5rem',
                minHeight: '80px',
                display: 'flex', flexDirection: 'column', gap: '0.25rem',
                backgroundColor: dayAppts.length > 0 ? '#F8FAFC' : 'transparent'
              }}>
                <div style={{ fontWeight: '500', color: dayAppts.length > 0 ? 'var(--primary-color)' : 'var(--text-main)' }}>{date}</div>
                {dayAppts.map(apt => (
                  <div key={apt.id} style={{ fontSize: '0.65rem', backgroundColor: 'var(--primary-color)', color: 'white', padding: '0.15rem 0.25rem', borderRadius: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {apt.time} - {apt.client}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>Appointments & Site Visits</h2>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            className="btn btn-outline" 
            onClick={() => setViewMode(viewMode === 'list' ? 'calendar' : 'list')}
          >
            {viewMode === 'list' ? 'View Calendar' : 'View List'}
          </button>
          <button className="btn btn-primary" style={{ display: 'flex', gap: '0.5rem' }} onClick={() => setIsModalOpen(true)}>
            <CalendarIcon size={16} /> Schedule Visit
          </button>
        </div>
      </div>

      {viewMode === 'calendar' ? (
        renderCalendar()
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', flex: 1, overflowY: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ fontSize: '1.125rem', margin: 0 }}>Upcoming Visits</h3>
            {appointments.map((apt) => (
              <div key={apt.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                  <div style={{
                    width: '60px', height: '60px', borderRadius: 'var(--radius-md)',
                    backgroundColor: 'var(--primary-color)', color: 'white',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
                  }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: '700', lineHeight: 1 }}>{apt.date.split(' ')[1]?.replace(',','') || 'XX'}</span>
                    <span style={{ fontSize: '0.75rem', textTransform: 'uppercase' }}>{apt.date.split(' ')[0] || 'XXX'}</span>
                  </div>
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600' }}>{apt.client}</h4>
                    <p style={{ margin: '0.25rem 0', fontSize: '0.875rem', color: 'var(--text-muted)' }}>{apt.projectType}</p>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        <Clock size={12} /> {apt.time}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        <MapPin size={12} /> {apt.location}
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '1rem' }}>
                  <span className={`badge ${apt.status === 'Confirmed' ? 'badge-success' : 'badge-warning'}`}>{apt.status}</span>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }} onClick={() => addToast(`Rescheduling appointment for ${apt.client}`)}>Reschedule</button>
                    <button className="btn btn-outline" style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }} onClick={() => addToast(`Viewing details for ${apt.client}`)}>Details</button>
                  </div>
                </div>
              </div>
            ))}
            {appointments.length === 0 && <p>No upcoming visits.</p>}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="card">
              <h3 style={{ fontSize: '1.125rem', margin: '0 0 1rem 0' }}>Mini Calendar</h3>
              <div style={{ height: '200px', backgroundColor: '#F1F5F9', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
                Calendar Widget Placeholder
              </div>
            </div>
            <div className="card">
              <h3 style={{ fontSize: '1.125rem', margin: '0 0 1rem 0' }}>Map Preview</h3>
              <div style={{ height: '200px', backgroundColor: '#E2E8F0', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', overflow: 'hidden', position: 'relative' }}>
                 <MapPin size={32} color="var(--primary-color)" />
                 <div style={{ position: 'absolute', bottom: '1rem', backgroundColor: 'rgba(255,255,255,0.9)', padding: '0.5rem', borderRadius: 'var(--radius-md)', fontSize: '0.75rem', fontWeight: '500' }}>
                   {appointments.length > 0 ? appointments[0].location : 'No Locations'}
                 </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Visit Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div className="card" style={{ width: '450px', maxWidth: '90%', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Schedule New Visit</h3>
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }} onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleScheduleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Client Name</label>
                <input type="text" value={newVisit.client} onChange={e => setNewVisit({...newVisit, client: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', outline: 'none' }} required />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Project Type</label>
                <input type="text" value={newVisit.projectType} onChange={e => setNewVisit({...newVisit, projectType: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', outline: 'none' }} required />
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Date</label>
                  <input type="date" value={newVisit.date} onChange={e => setNewVisit({...newVisit, date: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', outline: 'none' }} required />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Time</label>
                  <input type="time" value={newVisit.time} onChange={e => setNewVisit({...newVisit, time: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', outline: 'none' }} required />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Location</label>
                <input type="text" value={newVisit.location} onChange={e => setNewVisit({...newVisit, location: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', outline: 'none' }} required />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Assign To</label>
                <select value={newVisit.manager} onChange={e => setNewVisit({...newVisit, manager: e.target.value})} style={{ width: '100%', padding: '0.75rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', outline: 'none', backgroundColor: 'var(--surface-color)' }}>
                  <option>Unassigned</option>
                  <option>Sarah Smith</option>
                  <option>Mike Johnson</option>
                  <option>Alex Wong</option>
                </select>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" className="btn btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Schedule Visit</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointments;
