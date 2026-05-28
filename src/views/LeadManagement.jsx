import React, { useState } from 'react';
import { Search, Filter, Phone, MoreVertical, X, Edit2, Mail, Trash2, Users, Flame, CalendarCheck, Clock, Calendar, ChevronDown, ChevronUp, MapPin, Activity, User, FileText, UserPlus } from 'lucide-react';

const initialLeadsData = [
  { id: 'LD-1029', date: 'Oct 24, 2026', name: 'John Doe', projectType: 'Commercial Interior', phone: '+1 234 567 8900', source: 'Website', budget: '$150k - $200k', status: 'Hot Leads', manager: 'Sarah Smith', followUp: 'Today, 2:00 PM', priority: 'High', notes: 'Interested in open plan layout' },
  { id: 'LD-1030', date: 'Oct 23, 2026', name: 'Acme Corp', projectType: 'Office Renovation', phone: '+1 987 654 3210', source: 'Referral', budget: '$500k+', status: 'Appointment Fixed', manager: 'Mike Johnson', followUp: 'Tomorrow', priority: 'Medium', notes: 'Needs quote ASAP' },
  { id: 'LD-1031', date: 'Oct 21, 2026', name: 'Globex Inc', projectType: 'Residential Villa', phone: '+1 555 123 4567', source: 'Cold Call', budget: '$80k - $120k', status: 'Warm Leads', manager: 'Sarah Smith', followUp: 'Next Week', priority: 'Medium', notes: 'Follow up after holidays' },
  { id: 'LD-1032', date: 'Oct 18, 2026', name: 'Stark Industries', projectType: 'Warehouse Build', phone: '+1 444 987 1234', source: 'LinkedIn', budget: 'Pending', status: 'Cold Leads', manager: 'Alex Wong', followUp: 'No Date', priority: 'Low', notes: 'Sent initial brochure' },
];

const getStatusStyles = (status) => {
  const s = (status || '').toLowerCase();
  switch(s) {
    case 'hot': case 'hot leads': return { bg: '#FEE2E2', color: '#991B1B' };
    case 'warm': case 'warm leads': return { bg: '#FEF3C7', color: '#92400E' };
    case 'cold': case 'cold leads': return { bg: '#E2E8F0', color: '#475569' };
    case 'appointment fixed': return { bg: '#DCFCE7', color: '#166534' };
    case 'new lead': return { bg: '#DBEAFE', color: '#1E40AF' };
    case 'qutation send': case 'quotation send': return { bg: '#E0E7FF', color: '#4338CA' };
    case 'negotation': case 'negotiation': return { bg: '#FEF3C7', color: '#B45309' };
    case 'order confirmed': return { bg: '#DCFCE7', color: '#15803D' };
    case 'junk': return { bg: '#F3F4F6', color: '#374151' };
    default: return { bg: '#F1F5F9', color: '#475569' };
  }
};

const LeadOverviewCard = ({ title, value, subtitle, icon: Icon, color, bg, borderColor }) => (
  <div className="card" style={{ display: 'flex', flexDirection: 'column', padding: '1.25rem', backgroundColor: bg || 'var(--surface-color)', border: `1px solid ${borderColor || 'var(--border-color)'}`, boxShadow: '0 2px 4px rgba(0,0,0,0.02)', borderRadius: 'var(--radius-lg)' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: '500', margin: 0 }}>{title}</p>
      <Icon size={18} color={color} />
    </div>
    <div>
      <h3 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--text-main)', margin: '0 0 0.5rem 0', letterSpacing: '-0.5px' }}>{value}</h3>
      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '500' }}>{subtitle}</span>
    </div>
  </div>
);

const LeadManagement = () => {
  const [leads, setLeads] = useState(initialLeadsData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dateRange, setDateRange] = useState({
    start: new Date(new Date().setDate(new Date().getDate() - 30)).toISOString().split('T')[0],
    end: new Date().toISOString().split('T')[0]
  });
  const [expandedLeadId, setExpandedLeadId] = useState(null);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editingNoteText, setEditingNoteText] = useState('');
  const [newLead, setNewLead] = useState({
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    name: '', projectType: '', phone: '', budget: '', source: '', status: 'Lead Received', notes: ''
  });

  const [isApptModalOpen, setIsApptModalOpen] = useState(false);
  const [activeApptLeadId, setActiveApptLeadId] = useState(null);
  const [apptDetails, setApptDetails] = useState({
    date: '',
    time: '',
    location: '',
    remark: ''
  });

  const saveNote = (id) => {
    setLeads(leads.map(l => l.id === id ? { ...l, notes: editingNoteText } : l));
    setEditingNoteId(null);
  };

  const updateLeadStatus = (id, newStatus) => {
    if (newStatus === 'Appointment Fixed') {
      setActiveApptLeadId(id);
      setIsApptModalOpen(true);
      // Ensure the dropdown reverts if cancelled by NOT updating leads yet
    } else {
      setLeads(leads.map(l => l.id === id ? { ...l, status: newStatus } : l));
    }
  };

  const handleApptSubmit = (e) => {
    e.preventDefault();
    setLeads(leads.map(l => 
      l.id === activeApptLeadId 
        ? { 
            ...l, 
            status: 'Appointment Fixed', 
            followUp: `${apptDetails.date}, ${apptDetails.time}`,
            appointmentLocation: apptDetails.location,
            appointmentRemark: apptDetails.remark
          } 
        : l
    ));
    setIsApptModalOpen(false);
    setActiveApptLeadId(null);
    setApptDetails({ date: '', time: '', location: '', remark: '' });
  };

  const cancelApptModal = () => {
    setIsApptModalOpen(false);
    setActiveApptLeadId(null);
    setApptDetails({ date: '', time: '', location: '', remark: '' });
  };

  const updateLeadManager = (id, newManager) => {
    setLeads(leads.map(l => l.id === id ? { ...l, manager: newManager } : l));
  };

  const handleAddLead = (e) => {
    e.preventDefault();
    const newId = `LD-${1033 + leads.length}`;
    setLeads([...leads, { ...newLead, id: newId, manager: 'Unassigned', followUp: 'Pending', priority: 'Medium' }]);
    setIsModalOpen(false);
    setNewLead({ 
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      name: '', projectType: '', phone: '', budget: '', source: '', status: 'Lead Received', notes: '' 
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>Lead Management</h2>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search leads..." 
              style={{
                padding: '0.5rem 1rem 0.5rem 2.5rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--surface-color)',
                outline: 'none',
                width: '250px'
              }}
            />
          </div>
          <button className="btn btn-outline" style={{ display: 'flex', gap: '0.5rem' }}>
            <Filter size={16} /> Filters
          </button>
          <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>Add New Lead</button>
        </div>
      </div>

      {/* Overview Section */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: '600', color: 'var(--text-main)' }}>Overview</h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'var(--surface-color)', padding: '0.5rem 1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: '500' }}>From</span>
            <input type="date" value={dateRange.start} onChange={(e) => setDateRange({...dateRange, start: e.target.value})} style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.875rem', color: 'var(--text-main)' }} />
            <span style={{ color: 'var(--text-muted)' }}>-</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: '500' }}>To</span>
            <input type="date" value={dateRange.end} onChange={(e) => setDateRange({...dateRange, end: e.target.value})} style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.875rem', color: 'var(--text-main)' }} />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          <LeadOverviewCard title="Total Leads" value="156" subtitle="+12% from last month" icon={Users} color="#4F46E5" bg="#EEF4FF" borderColor="#C7D2FE" />
          <LeadOverviewCard title="Hot Leads" value="24" subtitle="High conversion chance" icon={Flame} color="#E11D48" bg="#FFF1F2" borderColor="#FECDD3" />
          <LeadOverviewCard title="Appointments Fixed" value="18" subtitle="+5 New Today" icon={CalendarCheck} color="#22C55E" bg="#ECFDF5" borderColor="#BBF7D0" />
          <LeadOverviewCard title="Follow-ups Today" value="8" subtitle="3 overdue" icon={Clock} color="#F97316" bg="#FFF7ED" borderColor="#FED7AA" />
        </div>
      </div>

      <div className="card" style={{ flex: 1, padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <div style={{ overflowX: 'auto', width: '100%' }}>
          <table style={{ width: '100%', minWidth: '1100px', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: '#F1F5F9', borderBottom: '1px solid var(--border-color)' }}>
              <tr>
                <th style={{ width: '40px', padding: '0.75rem 0.5rem', textAlign: 'center' }}></th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '600', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', whiteSpace: 'nowrap' }}>Date</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '600', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', whiteSpace: 'nowrap' }}>Lead ID</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '600', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', whiteSpace: 'nowrap' }}>Customer Name</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '600', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', whiteSpace: 'nowrap' }}>Services</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '600', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', whiteSpace: 'nowrap' }}>Phone Number</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '600', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', whiteSpace: 'nowrap' }}>Status</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '600', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', whiteSpace: 'nowrap' }}>Assign To</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '600', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', whiteSpace: 'nowrap' }}>Follow-up</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '600', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', whiteSpace: 'nowrap' }}>Actions</th>
                <th style={{ padding: '0.75rem 1rem', fontWeight: '600', fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', whiteSpace: 'nowrap' }}>Notes</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead, index) => (
              <React.Fragment key={lead.id}>
              <tr style={{ borderBottom: (index === leads.length - 1 && expandedLeadId !== lead.id) ? 'none' : '1px solid var(--border-color)', backgroundColor: expandedLeadId === lead.id ? 'rgba(79, 70, 229, 0.02)' : 'transparent' }}>
                <td style={{ padding: '0.75rem 0.5rem', textAlign: 'center' }}>
                  <button onClick={() => setExpandedLeadId(expandedLeadId === lead.id ? null : lead.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {expandedLeadId === lead.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>
                </td>
                <td style={{ padding: '0.75rem 1rem', fontSize: '0.8125rem', color: 'var(--text-muted)', textAlign: 'center', whiteSpace: 'nowrap' }}>{lead.date}</td>
                <td style={{ padding: '0.75rem 1rem', fontSize: '0.8125rem', fontWeight: '500', color: 'var(--primary-color)', textAlign: 'center', whiteSpace: 'nowrap' }}>{lead.id}</td>
                <td style={{ padding: '0.75rem 1rem', fontSize: '0.8125rem', fontWeight: '600', textAlign: 'center', whiteSpace: 'nowrap' }}>
                  {lead.name}
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: '400' }}>{lead.source}</div>
                </td>
                <td style={{ padding: '0.75rem 1rem', fontSize: '0.8125rem', color: 'var(--text-main)', textAlign: 'center', whiteSpace: 'nowrap' }}>{lead.projectType}</td>
                <td style={{ padding: '0.75rem 1rem', fontSize: '0.8125rem', color: 'var(--text-muted)', textAlign: 'center', whiteSpace: 'nowrap' }}>{lead.phone}</td>
                <td style={{ padding: '0.75rem 1rem', textAlign: 'center', whiteSpace: 'nowrap' }}>
                  <select 
                    value={lead.status}
                    onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                    style={{
                      padding: '0.25rem 1.5rem 0.25rem 0.75rem',
                      borderRadius: '9999px',
                      border: '1px solid transparent',
                      fontSize: '0.65rem',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px',
                      backgroundColor: getStatusStyles(lead.status).bg,
                      color: getStatusStyles(lead.status).color,
                      cursor: 'pointer',
                      outline: 'none',
                      appearance: 'none',
                      WebkitAppearance: 'none',
                      backgroundImage: `url("data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23${getStatusStyles(lead.status).color.replace('#', '')}%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.5rem center',
                      backgroundSize: '0.65rem auto'
                    }}
                  >
                    <option value="New Lead">NEW LEAD</option>
                    <option value="Hot">HOT</option>
                    <option value="Warm">WARM</option>
                    <option value="Cold">COLD</option>
                    <option value="Appointment Fixed">APPT FIXED</option>
                    <option value="Quotation Send">QUOTATION SEND</option>
                    <option value="Negotiation">NEGOTIATION</option>
                    <option value="Order Confirmed">ORDER CONFIRMED</option>
                    <option value="Junk">JUNK</option>
                  </select>
                </td>
                <td style={{ padding: '0.75rem 1rem', textAlign: 'center', whiteSpace: 'nowrap' }}>
                  <select 
                    value={lead.manager}
                    onChange={(e) => updateLeadManager(lead.id, e.target.value)}
                    style={{
                      padding: '0.25rem 0.5rem',
                      borderRadius: '4px',
                      border: '1px solid var(--border-color)',
                      fontSize: '0.8125rem',
                      backgroundColor: 'var(--surface-color)',
                      color: 'var(--text-main)',
                      cursor: 'pointer',
                      outline: 'none'
                    }}
                  >
                    <option value="Unassigned">Unassigned</option>
                    <option value="Sarah Smith">Sarah Smith</option>
                    <option value="Mike Johnson">Mike Johnson</option>
                    <option value="Alex Wong">Alex Wong</option>
                  </select>
                </td>
                <td style={{ padding: '0.75rem 1rem', fontSize: '0.8125rem', color: 'var(--text-muted)', textAlign: 'center', whiteSpace: 'nowrap' }}>{lead.followUp}</td>
                <td style={{ padding: '0.75rem 1rem', textAlign: 'center', whiteSpace: 'nowrap' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                    <button title="Call" style={{ background: '#E0E7FF', border: 'none', color: 'var(--primary-color)', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                      <Phone size={12} />
                    </button>
                    <button title="Mail" style={{ background: '#E0E7FF', border: 'none', color: 'var(--primary-color)', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                      <Mail size={12} />
                    </button>
                    <button title="Edit" style={{ background: '#E0E7FF', border: 'none', color: 'var(--primary-color)', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                      <Edit2 size={12} />
                    </button>
                    <button title="Delete" onClick={() => setLeads(leads.filter(l => l.id !== lead.id))} style={{ background: '#FEE2E2', border: 'none', color: 'var(--danger-color, #991B1B)', width: '28px', height: '28px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                      <Trash2 size={12} />
                    </button>
                  </div>
                </td>
                <td style={{ padding: '0.75rem 1rem', fontSize: '0.8125rem', color: 'var(--text-muted)', textAlign: 'center', maxWidth: '120px' }}>
                  {editingNoteId === lead.id ? (
                    <input
                      autoFocus
                      type="text"
                      value={editingNoteText}
                      onChange={(e) => setEditingNoteText(e.target.value)}
                      onBlur={() => saveNote(lead.id)}
                      onKeyDown={(e) => e.key === 'Enter' && saveNote(lead.id)}
                      style={{ width: '100%', padding: '0.25rem 0.5rem', borderRadius: '4px', border: '1px solid var(--primary-color)', outline: 'none', fontSize: '0.8125rem' }}
                    />
                  ) : (
                    <div 
                      onClick={() => { setEditingNoteId(lead.id); setEditingNoteText(lead.notes || ''); }}
                      title="Click to edit notes"
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', cursor: 'pointer', whiteSpace: 'nowrap', overflow: 'hidden' }}
                    >
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{lead.notes || 'Add note...'}</span>
                      <Edit2 size={12} style={{ opacity: 0.5, flexShrink: 0 }} />
                    </div>
                  )}
                </td>
              </tr>
              {expandedLeadId === lead.id && (
                <tr style={{ backgroundColor: 'rgba(79, 70, 229, 0.02)' }}>
                  <td colSpan="11" style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>
                    <div style={{ padding: '1rem 2rem', background: 'white', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                      <h4 style={{ margin: '0 0 1.5rem 0', fontSize: '0.875rem', fontWeight: '600', color: 'var(--text-main)' }}>Lead History Timeline</h4>
                      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: '16px', left: '40px', right: '40px', height: '2px', backgroundColor: 'var(--border-color)', zIndex: 0 }}></div>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', zIndex: 1, flex: 1 }}>
                          <div style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundColor: 'var(--primary-color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><UserPlus size={16} /></div>
                          <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-main)', textAlign: 'center' }}>New Lead Assign Date</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>{lead.date}</span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', zIndex: 1, flex: 1 }}>
                          <div style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundColor: 'var(--success-color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Activity size={16} /></div>
                          <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-main)', textAlign: 'center' }}>Status</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>{lead.status}</span>
                        </div>

                        <div className="timeline-tooltip-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', zIndex: 1, flex: 1, cursor: 'pointer' }}>
                          <div style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundColor: 'var(--warning-color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CalendarCheck size={16} /></div>
                          <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-main)', textAlign: 'center' }}>Schedule Appointment</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                            {lead.followUp !== 'Pending' && lead.followUp !== 'No Date' ? 'Hover for details' : 'N/A'}
                          </span>
                          {lead.followUp !== 'Pending' && lead.followUp !== 'No Date' && (
                            <div className="timeline-tooltip">
                              <strong style={{ color: '#E0E7FF' }}>Date/Time:</strong> {lead.followUp}<br/>
                              {lead.appointmentLocation && <><strong style={{ color: '#E0E7FF' }}>Location:</strong> {lead.appointmentLocation}<br/></>}
                              {lead.appointmentRemark && <><strong style={{ color: '#E0E7FF' }}>Remark:</strong> {lead.appointmentRemark}</>}
                            </div>
                          )}
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', zIndex: 1, flex: 1 }}>
                          <div style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundColor: '#8B5CF6', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FileText size={16} /></div>
                          <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-main)', textAlign: 'center' }}>Notes</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', maxWidth: '150px' }}>{lead.notes || 'No notes'}</span>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', zIndex: 1, flex: 1 }}>
                          <div style={{ width: '34px', height: '34px', borderRadius: '50%', backgroundColor: 'var(--secondary-color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Users size={16} /></div>
                          <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--text-main)', textAlign: 'center' }}>Assigned To</span>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>{lead.manager}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        </div>
      </div>

      {/* Add New Lead Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div className="card" style={{ width: '100%', maxWidth: '500px', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Add New Lead</h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddLead} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', color: 'var(--text-muted)' }}>Customer Name</label>
                <input required value={newLead.name} onChange={(e) => setNewLead({...newLead, name: e.target.value})} type="text" style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }} />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', color: 'var(--text-muted)' }}>Services</label>
                  <select required value={newLead.projectType} onChange={(e) => setNewLead({...newLead, projectType: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                    <option value="">Select type</option>
                    <option value="Commercial Interior">Commercial Interior</option>
                    <option value="Office Renovation">Office Renovation</option>
                    <option value="Residential Villa">Residential Villa</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', color: 'var(--text-muted)' }}>Phone Number</label>
                  <input required value={newLead.phone} onChange={(e) => setNewLead({...newLead, phone: e.target.value})} type="text" style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', color: 'var(--text-muted)' }}>Lead Source</label>
                  <select required value={newLead.source} onChange={(e) => setNewLead({...newLead, source: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                    <option value="">Select source</option>
                    <option value="Website">Website</option>
                    <option value="Referral">Referral</option>
                    <option value="Cold Call">Cold Call</option>
                  </select>
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', color: 'var(--text-muted)' }}>Notes</label>
                <textarea rows="3" value={newLead.notes} onChange={(e) => setNewLead({...newLead, notes: e.target.value})} placeholder="Any additional context..." style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', resize: 'vertical' }}></textarea>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-outline">Cancel</button>
                <button type="submit" className="btn btn-primary">Save Lead</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Appointment Fixed Modal */}
      {isApptModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div className="card" style={{ width: '100%', maxWidth: '500px', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Schedule Appointment</h3>
              <button onClick={cancelApptModal} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleApptSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', color: 'var(--text-muted)' }}>Appointment from (Date)</label>
                  <input required value={apptDetails.date} onChange={(e) => setApptDetails({...apptDetails, date: e.target.value})} type="date" style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', color: 'var(--text-muted)' }}>Meeting timing (Time)</label>
                  <input required value={apptDetails.time} onChange={(e) => setApptDetails({...apptDetails, time: e.target.value})} type="time" style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', color: 'var(--text-muted)' }}>Location / Address</label>
                <input required value={apptDetails.location} onChange={(e) => setApptDetails({...apptDetails, location: e.target.value})} type="text" placeholder="Office address or site location..." style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', color: 'var(--text-muted)' }}>Remark</label>
                <textarea rows="3" value={apptDetails.remark} onChange={(e) => setApptDetails({...apptDetails, remark: e.target.value})} placeholder="Any notes for the meeting..." style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', resize: 'vertical' }}></textarea>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={cancelApptModal} className="btn btn-outline">Cancel</button>
                <button type="submit" className="btn btn-primary">Confirm Appointment</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeadManagement;
