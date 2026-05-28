import React, { useState } from 'react';
import { FileText, Download, Eye, Plus, CheckCircle, Clock, X } from 'lucide-react';

const initialQuotesData = [
  { id: 'QT-5001', client: 'Acme Corp', project: 'Office Renovation', amount: '$500,000', gst: '$90,000', status: 'Approved', revision: 'Rev 1' },
  { id: 'QT-5002', client: 'John Doe', project: 'Residential Villa', amount: '$150,000', gst: '$27,000', status: 'Pending Approval', revision: 'Rev 3' },
  { id: 'QT-5003', client: 'Stark Industries', project: 'Warehouse Build', amount: '$1,200,000', gst: '$216,000', status: 'In Preparation', revision: 'Rev 0' },
];

const getStatusBadge = (status) => {
  if (status === 'Approved') return <span className="badge badge-success" style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}><CheckCircle size={12}/> Approved</span>;
  if (status === 'Pending Approval') return <span className="badge badge-warning" style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }}><Clock size={12}/> Pending</span>;
  return <span className="badge" style={{ backgroundColor: '#E2E8F0', color: '#475569' }}>{status}</span>;
}

const Quotations = () => {
  const [quotes, setQuotes] = useState(initialQuotesData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newQuote, setNewQuote] = useState({
    client: '', project: '', amount: '', gst: '', status: 'In Preparation', revision: 'Rev 0'
  });

  const handleGenerateQuote = (e) => {
    e.preventDefault();
    const newId = `QT-${5004 + quotes.length}`;
    setQuotes([...quotes, { ...newQuote, id: newId }]);
    setIsModalOpen(false);
    setNewQuote({ client: '', project: '', amount: '', gst: '', status: 'In Preparation', revision: 'Rev 0' });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: '700' }}>Quotations</h2>
        <button className="btn btn-primary" style={{ display: 'flex', gap: '0.5rem' }} onClick={() => setIsModalOpen(true)}>
          <Plus size={16} /> Generate Quotation
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '1.5rem' }}>
        <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: '#F1F5F9', borderBottom: '1px solid var(--border-color)' }}>
              <tr>
                <th style={{ padding: '1rem 1.5rem', fontWeight: '600', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Quotation ID</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: '600', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Client & Project</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: '600', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Amount (ex. GST)</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: '600', fontSize: '0.875rem', color: 'var(--text-muted)' }}>Approval Status</th>
                <th style={{ padding: '1rem 1.5rem', fontWeight: '600', fontSize: '0.875rem', color: 'var(--text-muted)', textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((quote, index) => (
                <tr key={quote.id} style={{ borderBottom: index === quotes.length - 1 ? 'none' : '1px solid var(--border-color)' }}>
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', fontWeight: '600', color: 'var(--primary-color)' }}>{quote.id}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ fontSize: '0.875rem', fontWeight: '600' }}>{quote.client}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{quote.project} • {quote.revision}</div>
                  </td>
                  <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', fontWeight: '500' }}>{quote.amount}</td>
                  <td style={{ padding: '1rem 1.5rem' }}>{getStatusBadge(quote.status)}</td>
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
                      <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }} title="Preview">
                        <Eye size={18} />
                      </button>
                      <button style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }} title="Export PDF">
                        <Download size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card">
            <h3 style={{ fontSize: '1rem', margin: '0 0 1rem 0' }}>Estimation Summary</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                 <span style={{ color: 'var(--text-muted)' }}>Material Costs</span>
                 <span style={{ fontWeight: '500' }}>$1,240,000</span>
               </div>
               <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                 <span style={{ color: 'var(--text-muted)' }}>Labor</span>
                 <span style={{ fontWeight: '500' }}>$450,000</span>
               </div>
               <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem' }}>
                 <span style={{ color: 'var(--text-muted)' }}>Overhead</span>
                 <span style={{ fontWeight: '500' }}>$160,000</span>
               </div>
               <div style={{ height: '1px', backgroundColor: 'var(--border-color)', margin: '0.5rem 0' }}></div>
               <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', fontWeight: '700', color: 'var(--primary-color)' }}>
                 <span>Total Pipeline</span>
                 <span>$1,850,000</span>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Generate Quotation Modal */}
      {isModalOpen && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 100,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <div className="card" style={{ width: '100%', maxWidth: '500px', padding: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>Generate Quotation</h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleGenerateQuote} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', color: 'var(--text-muted)' }}>Client Name</label>
                <input required value={newQuote.client} onChange={(e) => setNewQuote({...newQuote, client: e.target.value})} type="text" style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }} />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', color: 'var(--text-muted)' }}>Project Type</label>
                <select required value={newQuote.project} onChange={(e) => setNewQuote({...newQuote, project: e.target.value})} style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                  <option value="">Select project type</option>
                  <option value="Commercial Interior">Commercial Interior</option>
                  <option value="Office Renovation">Office Renovation</option>
                  <option value="Residential Villa">Residential Villa</option>
                  <option value="Warehouse Build">Warehouse Build</option>
                </select>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', color: 'var(--text-muted)' }}>Amount (ex. GST)</label>
                  <input required value={newQuote.amount} onChange={(e) => setNewQuote({...newQuote, amount: e.target.value})} type="text" placeholder="e.g. $100,000" style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', marginBottom: '0.25rem', color: 'var(--text-muted)' }}>GST Amount</label>
                  <input required value={newQuote.gst} onChange={(e) => setNewQuote({...newQuote, gst: e.target.value})} type="text" placeholder="e.g. $18,000" style={{ width: '100%', padding: '0.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }} />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-outline">Cancel</button>
                <button type="submit" className="btn btn-primary">Generate</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quotations;
