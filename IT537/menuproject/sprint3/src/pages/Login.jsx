import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Shield, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function Login() {
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [userType, setUserType] = useState('customer');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null); // { text, type: 'error' | 'success' }
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleToggle = (e) => {
    e.preventDefault();
    setIsRegisterMode(!isRegisterMode);
    setMessage(null);
    setUsername('');
    setPassword('');
    // Default to customer when switching to register mode logic from original app:
    if (!isRegisterMode) {
      setUserType('customer');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    try {
      if (isRegisterMode) {
        await register(username, password);
        setMessage({ text: 'Account created! You can now login.', type: 'success' });
        setIsRegisterMode(false);
        setUsername('');
        setPassword('');
      } else {
        const userData = await login(username, password);
        
        if (userData.type !== userType) {
           // We might need to logout if the type doesn't match what they selected?
           // The API returns the user with their real type.
           // Original app: check if userData.type === userType.
           if (userData.type !== userType) {
               throw new Error(`Invalid credentials for ${userType} login.`);
           }
        }
        
        navigate(userData.type === 'admin' ? '/admin' : '/menu');
      }
    } catch (error) {
      setMessage({ text: error.message, type: 'error' });
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <img src="/veranda_logo.svg" alt="Veranda Cafe & Brasserie" className="login-logo" />
          <p id="modeDescription">
            {isRegisterMode ? 'Create a new customer account' : 'Please login to continue'}
          </p>
        </div>

        {message && (
          <div
            className={message.type === 'error' ? 'error-message' : 'success-message'}
            style={{
              backgroundColor: message.type === 'error' ? '#C0392B' : '#4A6B4A',
              color: 'white',
              padding: '10px',
              borderRadius: '8px',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
             {message.type === 'error' ? <AlertCircle size={20}/> : <CheckCircle2 size={20}/>}
             {message.text}
          </div>
        )}

        {!isRegisterMode && (
          <div className="user-type" id="userTypeContainer">
            <button
              type="button"
              className={userType === 'customer' ? 'active' : ''}
              onClick={() => setUserType('customer')}
            >
              <User size={18} style={{marginRight: '8px', verticalAlign: 'middle'}}/>
              Customer
            </button>
            <button
              type="button"
              className={userType === 'admin' ? 'active' : ''}
              onClick={() => setUserType('admin')}
            >
              <Shield size={18} style={{marginRight: '8px', verticalAlign: 'middle'}}/>
              Admin
            </button>
          </div>
        )}

        <form id="loginForm" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              required
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              required
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="login-btn" id="submitBtn">
            {isRegisterMode ? 'Register' : 'Login'}
          </button>
        </form>

        <div className="login-footer">
          <p style={{ marginTop: '15px', color: 'var(--text-secondary)' }}>
            <span id="toggleMsg">
              {isRegisterMode ? 'Already have an account?' : "Don't have an account?"}
            </span>{' '}
            <a
              href="#"
              onClick={handleToggle}
              style={{
                color: 'var(--primary-color)',
                textDecoration: 'none',
                fontWeight: 'bold',
              }}
            >
              {isRegisterMode ? 'Login' : 'Create Account'}
            </a>
          </p>
          {!isRegisterMode && (
            <p style={{ color: 'var(--text-secondary)', marginTop: '20px', fontSize: '0.9rem' }}>
              Demo: customer/customer123 or admin/admin123
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
