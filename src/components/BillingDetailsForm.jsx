import React, { useState } from 'react';
import { Building2, Save, CheckCircle2 } from 'lucide-react';

const inputBase = {
  width: '100%',
  padding: '0.75rem 1rem',
  borderRadius: '8px',
  border: '1.5px solid #E2E8F0',
  fontSize: '0.875rem',
  outline: 'none',
  backgroundColor: '#FFFFFF',
  color: '#1E293B',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  boxSizing: 'border-box',
};

const labelStyle = {
  display: 'block',
  fontSize: '0.8rem',
  fontWeight: '700',
  color: '#475569',
  marginBottom: '0.4rem',
  textTransform: 'uppercase',
  letterSpacing: '0.04em',
};

function Field({ label, required, children }) {
  return (
    <div>
      <label style={labelStyle}>{label}{required && <span style={{ color: '#EF4444', marginLeft: '3px' }}>*</span>}</label>
      {children}
    </div>
  );
}

function TextInput({ placeholder, value, onChange }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...inputBase,
        borderColor: focused ? 'var(--primary-color)' : '#E2E8F0',
        boxShadow: focused ? '0 0 0 3px rgba(99,102,241,0.1)' : 'none',
      }}
    />
  );
}

function TextAreaInput({ placeholder, value, onChange }) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      rows={3}
      style={{
        ...inputBase,
        resize: 'vertical',
        borderColor: focused ? 'var(--primary-color)' : '#E2E8F0',
        boxShadow: focused ? '0 0 0 3px rgba(99,102,241,0.1)' : 'none',
      }}
    />
  );
}

function DateInput({ value, onChange }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      type="date"
      value={value}
      onChange={e => onChange(e.target.value)}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        ...inputBase,
        color: value ? '#1E293B' : '#94A3B8',
        borderColor: focused ? 'var(--primary-color)' : '#E2E8F0',
        boxShadow: focused ? '0 0 0 3px rgba(99,102,241,0.1)' : 'none',
      }}
    />
  );
}

export default function BillingDetailsForm({ payment }) {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    clientName: payment?.customer || '',
    projectLocation: '',
    contactDetails: '',
    billingName: payment?.company || '',
    mobileNumber: '',
    altMobileNumber: '',
    siteAddress: '',
    billingAddress: '',
    gstNumber: '',
    emailWhatsapp: '',
    salespersonName: '',
    dateOfOrder: '',
    proposalRefNo: '',
  });

  const set = (key) => (val) => setForm(f => ({ ...f, [key]: val }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header Card */}
      <div style={{
        backgroundColor: '#FFFFFF', borderRadius: '12px',
        border: '1px solid #E2E8F0', overflow: 'hidden'
      }}>
        <div style={{
          padding: '1rem 1.5rem',
          borderBottom: '1px solid #F1F5F9',
          background: 'linear-gradient(135deg, #F8FAFF 0%, #EEF2FF 100%)',
          display: 'flex', alignItems: 'center', gap: '0.625rem'
        }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '8px',
            backgroundColor: 'var(--primary-color)',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Building2 size={16} color="#FFFFFF" />
          </div>
          <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: '800', color: '#1E293B' }}>
            1. Client & Project Details
          </h3>
        </div>

        <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

          {/* Row 1: Client Name | Project Location | Contact Details */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            <Field label="Client Name" required>
              <TextInput placeholder="e.g. Sree Brindaavan Kindergarten" value={form.clientName} onChange={set('clientName')} />
            </Field>
            <Field label="Project Location" required>
              <TextInput placeholder="e.g. Chitlapakkam" value={form.projectLocation} onChange={set('projectLocation')} />
            </Field>
            <Field label="Contact Details (Phone/Email)">
              <TextInput placeholder="e.g. 9840714353 / ..." value={form.contactDetails} onChange={set('contactDetails')} />
            </Field>
          </div>

          {/* Row 2: Billing Name | Mobile Number | Alt Mobile */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '1rem' }}>
            <Field label="Billing Name">
              <TextInput placeholder="e.g. Sree Brindaavan Kindergarten" value={form.billingName} onChange={set('billingName')} />
            </Field>
            <Field label="Mobile Number" required>
              <TextInput placeholder="e.g. 9551269990" value={form.mobileNumber} onChange={set('mobileNumber')} />
            </Field>
            <Field label="Alternate Mobile Number">
              <TextInput placeholder="" value={form.altMobileNumber} onChange={set('altMobileNumber')} />
            </Field>
          </div>

          {/* Row 3: Site Address | Billing Address */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <Field label="Site Address" required>
              <TextAreaInput placeholder="e.g. 46, First main Road, Venkatraman Nagar, Chennai-600064" value={form.siteAddress} onChange={set('siteAddress')} />
            </Field>
            <Field label="Billing Address">
              <TextAreaInput placeholder="" value={form.billingAddress} onChange={set('billingAddress')} />
            </Field>
          </div>

          {/* Row 4: GST | Email/WhatsApp | Salesperson */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
            <Field label="GST Number">
              <TextInput placeholder="" value={form.gstNumber} onChange={set('gstNumber')} />
            </Field>
            <Field label="Email ID / WhatsApp Number">
              <TextInput placeholder="" value={form.emailWhatsapp} onChange={set('emailWhatsapp')} />
            </Field>
            <Field label="Salesperson Name" required>
              <TextInput placeholder="e.g. Saleem Khan" value={form.salespersonName} onChange={set('salespersonName')} />
            </Field>
          </div>

          {/* Row 5: Date of Order | Proposal Ref No */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
            <Field label="Date of Order" required>
              <DateInput value={form.dateOfOrder} onChange={set('dateOfOrder')} />
            </Field>
            <Field label="Proposal Ref No" required>
              <TextInput placeholder="e.g. TES/ENT/176-R1" value={form.proposalRefNo} onChange={set('proposalRefNo')} />
            </Field>
            <div /> {/* spacer */}
          </div>

        </div>
      </div>

      {/* Save Button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <button
          onClick={handleSave}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.75rem 1.75rem', borderRadius: '10px', border: 'none',
            backgroundColor: saved ? '#10B981' : 'var(--primary-color)',
            color: '#FFFFFF', fontWeight: '700', fontSize: '0.875rem',
            cursor: 'pointer', transition: 'background-color 0.3s, transform 0.15s',
            transform: 'scale(1)',
            boxShadow: saved ? '0 4px 12px rgba(16,185,129,0.3)' : '0 4px 12px rgba(99,102,241,0.25)',
          }}
          onMouseOver={e => e.currentTarget.style.transform = 'scale(1.03)'}
          onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          {saved ? <CheckCircle2 size={16} /> : <Save size={16} />}
          {saved ? 'Saved!' : 'Save Details'}
        </button>
      </div>
    </div>
  );
}
