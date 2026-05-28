import React from 'react';
import { UserCheck, Clock, CheckCircle, ArrowRight, Filter } from 'lucide-react';
import { useToast } from '../components/Toast';

const assignmentsData = [
  { id: 'AL-201', leadName: 'John Doe', project: 'Commercial Interior', manager: 'Sarah Smith', aptDate: 'Oct 24, 2026', priority: 'High', status: 'Site Visit Scheduled' },
  { id: 'AL-202', leadName: 'Acme Corp', project: 'Office Renovation', manager: 'Mike Johnson', aptDate: 'Oct 25, 2026', priority: 'Medium', status: 'Measurement Pending' },
  { id: 'AL-203', leadName: 'Globex Inc', project: 'Residential Villa', manager: 'Sarah Smith', aptDate: 'Oct 28, 2026', priority: 'High', status: 'Quotation In Progress' },
];

const WorkflowTracker = ({ current }) => {
  const steps = ['Lead Assigned', 'Site Visit Scheduled', 'Measurement Pending', 'Quotation In Progress'];
  const currentIndex = steps.indexOf(current);

  return (
    <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem', width: '100%', overflowX: 'auto', paddingBottom: '0.5rem' }}>
      {steps.map((step, idx) => {
        const isCompleted = idx < currentIndex;
        const isActive = idx === currentIndex;
        return (
          <React.Fragment key={step}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', opacity: isCompleted || isActive ? 1 : 0.5 }}>
              {isCompleted ? <CheckCircle size={14} color="var(--success-color)" /> : isActive ? <Clock size={14} color="var(--warning-color)" /> : <div style={{ width: '14px', height: '14px', borderRadius: '50%', border: '2px solid var(--border-color)' }}></div>}
              <span style={{ fontSize: '0.75rem', fontWeight: isActive ? '600' : '500', whiteSpace: 'nowrap' }}>{step}</span>
            </div>
            {idx < steps.length - 1 && <ArrowRight size={14} color="var(--border-color)" style={{ opacity: 0.5 }} />}
          </React.Fragment>
        );
      })}
    </div>
  );
};

const AssignedLeads = () => {
  const addToast = useToast();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>Assigned Leads</h2>
        <button className="btn btn-outline" style={{ display: 'flex', gap: '0.5rem' }} onClick={() => addToast('Opening Priority Filters')}>
          <Filter size={16} /> Priority Filters
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', gap: '1.5rem' }}>
        {assignmentsData.map((lead) => (
          <div key={lead.id} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600' }}>{lead.leadName}</h3>
                <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.875rem', color: 'var(--text-muted)' }}>{lead.project}</p>
              </div>
              <span className={`badge ${lead.priority === 'High' ? 'badge-danger' : 'badge-warning'}`}>
                {lead.priority} Priority
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', backgroundColor: 'var(--background-light)', padding: '0.75rem', borderRadius: 'var(--radius-md)' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                 <UserCheck size={16} color="var(--primary-color)" />
                 <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>{lead.manager}</span>
               </div>
               <div style={{ width: '1px', height: '16px', backgroundColor: 'var(--border-color)' }}></div>
               <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                 <Clock size={16} color="var(--text-muted)" />
                 <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Apt: {lead.aptDate}</span>
               </div>
            </div>

            <div>
              <p style={{ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem' }}>Workflow Status</p>
              <WorkflowTracker current={lead.status} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
              <button className="btn btn-outline" style={{ padding: '0.25rem 0.75rem', fontSize: '0.75rem' }} onClick={() => addToast(`Reassigning ${lead.leadName} to a new manager`)}>Reassign Lead</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignedLeads;
