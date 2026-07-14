import React from 'react';
import { Calendar, ChevronRight } from 'lucide-react';

export default function GlobalFilterBar() {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '2rem' }}>
      <button style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.75rem', 
        padding: '0.75rem 1rem', 
        backgroundColor: '#FFFFFF', 
        border: '1px solid #E2E8F0', 
        borderRadius: '8px', 
        color: '#1E293B', 
        fontWeight: '600', 
        cursor: 'pointer', 
        fontSize: '0.875rem',
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
      }}>
        <Calendar size={18} color="#475569" />
        Last 30 Days (Jun 14, 2026 - Jul 14, 2026)
        <ChevronRight size={16} color="#64748B" />
      </button>

      <select style={{ 
        padding: '0.75rem 2.5rem 0.75rem 1rem', 
        borderRadius: '8px', 
        border: '1px solid #E2E8F0', 
        fontSize: '0.875rem', 
        fontWeight: '500',
        color: '#475569',
        outline: 'none', 
        backgroundColor: '#FFFFFF',
        cursor: 'pointer',
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
        appearance: 'none',
        backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'16\' height=\'16\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%23475569\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'m6 9 6 6 6-6\'/%3E%3C/svg%3E")',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 0.75rem center',
        backgroundSize: '16px'
      }}>
        <option value="All Managers">All Managers</option>
        <option value="Manager A">Manager A</option>
        <option value="Manager B">Manager B</option>
      </select>
    </div>
  );
}
