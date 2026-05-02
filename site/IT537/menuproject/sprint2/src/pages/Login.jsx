import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Shield, AlertCircle, Coffee } from 'lucide-react';

export default function Login() {
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleDemoLogin = async (type) => {
    setMessage(null);
    setLoading(true);

    const credentials = type === 'customer'
      ? { username: 'customer', password: 'customer123' }
      : { username: 'admin', password: 'admin123' };

    try {
      const userData = await login(credentials.username, credentials.password);
      navigate(userData.type === 'admin' ? '/admin' : '/menu');
    } catch (error) {
      setMessage({ text: error.message, type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <img src="/veranda_logo.svg" alt="Veranda Cafe & Brasserie" className="login-logo" />
          <p id="modeDescription">Select a demo account to continue</p>
        </div>

        {message && (
          <div
            className="error-message"
            style={{
              backgroundColor: '#C0392B',
              color: 'white',
              padding: '10px',
              borderRadius: '8px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <AlertCircle size={20} />
            {message.text}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <button
            type="button"
            id="demoCustomerBtn"
            onClick={() => handleDemoLogin('customer')}
            disabled={loading}
            style={{
              padding: '20px',
              borderRadius: '12px',
              border: '2px solid var(--primary-color)',
              background: 'var(--card-bg)',
              color: 'var(--text-color)',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: 600,
              fontSize: '1.05rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              transition: 'all 0.2s',
              opacity: loading ? 0.6 : 1
            }}
          >
            <User size={22} />
            Customer Login
            <span style={{ fontSize: '0.8rem', fontWeight: 400, color: 'var(--text-secondary)', marginLeft: '4px' }}>
              (customer / customer123)
            </span>
          </button>

          <button
            type="button"
            id="demoAdminBtn"
            onClick={() => handleDemoLogin('admin')}
            disabled={loading}
            style={{
              padding: '20px',
              borderRadius: '12px',
              border: '2px solid var(--primary-color)',
              background: 'var(--card-bg)',
              color: 'var(--text-color)',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontWeight: 600,
              fontSize: '1.05rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              transition: 'all 0.2s',
              opacity: loading ? 0.6 : 1
            }}
          >
            <Shield size={22} />
            Admin Login
            <span style={{ fontSize: '0.8rem', fontWeight: 400, color: 'var(--text-secondary)', marginLeft: '4px' }}>
              (admin / admin123)
            </span>
          </button>
        </div>

        <div className="login-footer">
          <p style={{ color: 'var(--text-secondary)', marginTop: '20px', fontSize: '0.85rem', textAlign: 'center' }}>
            <Coffee size={14} style={{ verticalAlign: 'middle', marginRight: '4px' }} />
            Click a button above to sign in with a demo account.
          </p>
        </div>
      </div>
    </div>
  );
}
