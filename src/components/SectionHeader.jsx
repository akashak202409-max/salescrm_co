import React from 'react';
import { ChevronRight } from 'lucide-react';

const SectionHeader = ({ title, action }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)', marginBottom: '1rem' }}>
      <h2 style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-main)', margin: 0 }}>{title}</h2>
      {action && (
        <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', padding: '0.25rem 0.75rem', fontSize: '0.875rem' }}>
          {action}
          <ChevronRight size={16} />
        </button>
      )}
    </div>
  );
};

export default SectionHeader;
