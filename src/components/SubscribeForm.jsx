import React, { useState } from 'react';
import { api } from '../services/api';

export default function SubscribeForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await api.subscribe(email);
      setStatus({ type: 'success', message: 'You are now tuned in to the signal.' });
      setEmail('');
    } catch (err) {
      setStatus({ type: 'error', message: 'Something went sideways. Try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '450px', margin: '0 auto', textAlign: 'center', padding: '4rem 0' }}>
      <p className="label-caps" style={{ marginBottom: '1rem' }}>Newsletter</p>
      <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Join the Signal</h3>
      <p style={{ color: 'var(--text-dimmed)', fontSize: '0.95rem', marginBottom: '2rem' }}>
        Receive letters on the intersections of code, visual form, and intentional studio practices.
      </p>
      
      <form onSubmit={handleSubscribe} style={{ position: 'relative', width: '100%' }}>
        <input 
          type="email" 
          placeholder="ENTER YOUR EMAIL ADDRESS" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
          style={{ paddingRight: '80px', textTransform: 'uppercase', fontSize: '0.85rem', letterSpacing: '0.05em' }}
        />
        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            position: 'absolute', 
            right: 0, 
            bottom: '12px', 
            fontSize: '0.8rem',
            opacity: loading ? 0.5 : 1
          }}
        >
          {loading ? '...' : 'SUBMIT'}
        </button>
      </form>
      
      {status.message && (
        <p style={{ 
          marginTop: '1.5rem', 
          fontSize: '0.8rem', 
          letterSpacing: '0.05em',
          color: status.type === 'success' ? '#ffffff' : '#ff4a4a' 
        }}>
          {status.message.toUpperCase()}
        </p>
      )}
    </div>
  );
}