import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, Calendar, MoreVertical, X } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import LeadDetailsDrawer from '../components/LeadDetailsDrawer';
import AddNewLeadWizard from '../components/AddNewLeadWizard';

const PIPELINE_COLUMNS = {
  'new_lead': { id: 'new_lead', title: 'New Lead', color: '#3B82F6', bg: '#EFF6FF' },
  'qualified': { id: 'qualified', title: 'Qualified', color: '#10B981', bg: '#ECFDF5' },
  'quotation_sent': { id: 'quotation_sent', title: 'Quotation Sent', color: '#8B5CF6', bg: '#F5F3FF' },
  'negotiation': { id: 'negotiation', title: 'Negotiation', color: '#F59E0B', bg: '#FFFBEB' },
  'order_confirmed': { id: 'order_confirmed', title: 'Order Confirmed', color: '#14B8A6', bg: '#F0FDFA' },
  'lost_junk': { id: 'lost_junk', title: 'Lost / Junk', color: '#64748B', bg: '#F8FAFC' }
};

const initialLeadsData = [
  { id: 'LD-1001', name: 'Reference Lead', company: 'Acme Corp', projectType: 'PEB', phone: '+91 90000 00000', budget: '₹100k', status: 'new_lead', priority: 'Medium', followUp: 'No Date' },
  { id: 'LD-1002', name: 'John Doe', company: 'TechFlow Pvt Ltd', projectType: 'Tensile', phone: '+91 91234 56789', budget: '₹500k', status: 'qualified', priority: 'High', followUp: 'Tomorrow' },
  { id: 'LD-1003', name: 'Jane Smith', company: 'Global Logistics', projectType: 'PEB', phone: '+91 99887 76655', budget: '₹150k', status: 'quotation_sent', priority: 'Medium', followUp: 'Next Week' },
  { id: 'LD-1004', name: 'Mike Johnson', company: 'Skyline Builders', projectType: 'Other roofing', phone: '+91 98765 43210', budget: '₹200k', status: 'negotiation', priority: 'Low', followUp: 'No Date' },
  { id: 'LD-1005', name: 'Alice Brown', company: 'Pioneer Enterprises', projectType: 'PEB', phone: '+91 97654 32109', budget: '₹800k', status: 'order_confirmed', priority: 'High', followUp: 'Today' },
  { id: 'LD-1006', name: 'Bob White', company: 'Zenith Mfg', projectType: 'Tensile', phone: '+91 96543 21098', budget: '₹300k', status: 'lost_junk', priority: 'Medium', followUp: 'Tomorrow' },
];

const getPriorityStyle = (priority) => {
  switch ((priority || '').toLowerCase()) {
    case 'high': return { bg: '#FEE2E2', color: '#DC2626' };
    case 'medium': return { bg: '#FEF3C7', color: '#D97706' };
    case 'low': return { bg: '#F1F5F9', color: '#475569' };
    default: return { bg: '#F1F5F9', color: '#475569' };
  }
};

const getServiceStyle = (service) => {
  switch ((service || '').toLowerCase()) {
    case 'peb': return { bg: '#EEF2FF', color: '#4F46E5' };
    case 'tensile': return { bg: '#ECFDF5', color: '#059669' };
    case 'other roofing': return { bg: '#FFF7ED', color: '#C2410C' };
    default: return { bg: '#F3F4F6', color: '#4B5563' };
  }
};

export default function Pipeline() {
  const [leads, setLeads] = useState(initialLeadsData);
  const [search, setSearch] = useState('');
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [selectedLead, setSelectedLead] = useState(null);
  const [columns, setColumns] = useState(PIPELINE_COLUMNS);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;
    
    setLeads(prev => {
      const updated = [...prev];
      const leadIndex = updated.findIndex(l => l.id === draggableId);
      if (leadIndex > -1) {
        updated[leadIndex] = { ...updated[leadIndex], status: destination.droppableId };
      }
      return updated;
    });
  };

  const getLeadsByStatus = (statusId) => {
    return leads.filter(l => l.status === statusId && (l.name.toLowerCase().includes(search.toLowerCase()) || l.company.toLowerCase().includes(search.toLowerCase()) || l.id.toLowerCase().includes(search.toLowerCase())));
  };

  return (
    <div style={{ padding: '2rem', height: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#F8FAFC', overflow: 'hidden' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem', flexShrink: 0 }}>
        <div>
          <span style={{ fontSize: '0.875rem', color: '#64748B', fontWeight: '500' }}>Pages / Sales Pipeline</span>
          <h2 style={{ fontSize: '1.875rem', fontWeight: '800', color: '#1E293B', margin: '0.5rem 0 0 0', letterSpacing: '-0.5px' }}>Sales Pipeline</h2>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <div style={{ position: 'relative' }}>
            <Search style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#94A3B8' }} size={18} />
            <input 
              type="text" 
              placeholder="Search Leads..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ padding: '0.75rem 1rem 0.75rem 2.75rem', borderRadius: '12px', border: '1px solid #E2E8F0', outline: 'none', width: '280px', fontSize: '0.875rem', fontWeight: '500', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }} 
            />
          </div>
          <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem', backgroundColor: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', color: '#475569', fontWeight: '600', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}>
            <Filter size={18} /> Filter
          </button>
          <button onClick={() => setIsAddLeadOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.25rem', backgroundColor: '#4F46E5', color: '#FFFFFF', border: 'none', borderRadius: '12px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.2)' }}>
            <Plus size={18} /> Add Lead
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '1rem', marginBottom: '2rem', flexShrink: 0 }}>
        <div style={{ backgroundColor: '#FFFFFF', padding: '1.25rem', borderRadius: '12px', border: '1px solid #E2E8F0', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
           <p style={{ color: '#64748B', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', margin: '0 0 0.5rem 0' }}>Total Pipeline</p>
           <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1E293B', margin: 0 }}>{leads.length}</h3>
        </div>
        {Object.values(PIPELINE_COLUMNS).map(col => (
          <div key={col.id} style={{ backgroundColor: col.bg, padding: '1.25rem', borderRadius: '12px', border: `1px solid ${col.color}30` }}>
             <p style={{ color: col.color, fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', margin: '0 0 0.5rem 0' }}>{col.title}</p>
             <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#1E293B', margin: 0 }}>{leads.filter(l => l.status === col.id).length}</h3>
          </div>
        ))}
      </div>

      {/* Kanban Board Container */}
      <div style={{ flex: 1, overflowX: 'auto', overflowY: 'hidden', paddingBottom: '1rem' }}>
        <DragDropContext onDragEnd={handleDragEnd}>
          <div style={{ display: 'inline-flex', gap: '1.5rem', height: '100%', minWidth: 'min-content' }}>
            {Object.values(PIPELINE_COLUMNS).map(col => {
              const columnLeads = getLeadsByStatus(col.id);
              return (
                <div key={col.id} style={{ width: '320px', display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', padding: '0 0.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: col.color }}></div>
                      <h3 style={{ fontSize: '0.9rem', fontWeight: '700', color: '#1E293B', margin: 0 }}>{col.title}</h3>
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#64748B', backgroundColor: '#E2E8F0', padding: '0.15rem 0.5rem', borderRadius: '1rem' }}>{columnLeads.length}</span>
                  </div>
                  
                  <Droppable droppableId={col.id}>
                    {(provided, snapshot) => (
                      <div 
                        ref={provided.innerRef} 
                        {...provided.droppableProps}
                        style={{ 
                          flex: 1, 
                          backgroundColor: snapshot.isDraggingOver ? `${col.color}15` : 'transparent',
                          borderRadius: '12px',
                          overflowY: 'auto',
                          padding: '0.25rem',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '1rem',
                          minHeight: '150px',
                          transition: 'background-color 0.2s ease'
                        }}
                      >
                        {columnLeads.map((lead, index) => {
                          const pStyle = getPriorityStyle(lead.priority);
                          const sStyle = getServiceStyle(lead.projectType);
                          return (
                            <Draggable key={lead.id} draggableId={lead.id} index={index}>
                              {(provided, snapshot) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  onClick={() => setSelectedLead(lead)}
                                  style={{
                                    userSelect: 'none',
                                    padding: '1.25rem',
                                    backgroundColor: '#FFFFFF',
                                    borderRadius: '12px',
                                    border: '1px solid #E2E8F0',
                                    boxShadow: snapshot.isDragging ? '0 10px 25px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.05)',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '0.75rem',
                                    cursor: 'grab',
                                    ...provided.draggableProps.style
                                  }}
                                >
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                    <div>
                                      <span style={{ fontSize: '0.7rem', fontWeight: '700', color: '#94A3B8' }}>{lead.id}</span>
                                      <h4 style={{ margin: '0.25rem 0 0 0', fontSize: '0.95rem', fontWeight: '700', color: '#1E293B' }}>{lead.name}</h4>
                                      <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.8rem', color: '#64748B' }}>{lead.company}</p>
                                    </div>
                                    <button style={{ background: 'none', border: 'none', color: '#94A3B8', cursor: 'pointer' }}><MoreVertical size={16} /></button>
                                  </div>
                                  
                                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                    <span style={{ fontSize: '0.7rem', fontWeight: '600', padding: '0.15rem 0.45rem', borderRadius: '4px', backgroundColor: sStyle.bg, color: sStyle.color }}>{lead.projectType}</span>
                                    <span style={{ fontSize: '0.7rem', fontWeight: '600', padding: '0.15rem 0.45rem', borderRadius: '4px', backgroundColor: pStyle.bg, color: pStyle.color }}>{lead.priority} Priority</span>
                                  </div>

                                  <div style={{ height: '1px', backgroundColor: '#F1F5F9', margin: '0.25rem 0' }}></div>
                                  
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                      <span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '600', color: '#94A3B8', textTransform: 'uppercase' }}>Value</span>
                                      <span style={{ fontSize: '0.875rem', fontWeight: '700', color: '#10B981' }}>{lead.budget}</span>
                                    </div>
                                    <div style={{ textAlign: 'right' }}>
                                      <span style={{ display: 'block', fontSize: '0.65rem', fontWeight: '600', color: '#94A3B8', textTransform: 'uppercase' }}>Next Follow-up</span>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#475569', fontSize: '0.75rem', fontWeight: '600' }}>
                                        <Calendar size={12} /> {lead.followUp}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              );
            })}
          </div>
        </DragDropContext>
      </div>

      <AddNewLeadWizard isOpen={isAddLeadOpen} onClose={() => setIsAddLeadOpen(false)} />
      <LeadDetailsDrawer lead={selectedLead} isOpen={!!selectedLead} onClose={() => setSelectedLead(null)} />
    </div>
  );
}
