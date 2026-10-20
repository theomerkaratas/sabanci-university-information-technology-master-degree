import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Trophy, Medal, Star, RefreshCw } from 'lucide-react';

export default function Leaderboard({ compact = false }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      const data = await api.fetchLeaderboard();
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch leaderboard', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaderboard();
    const interval = setInterval(fetchLeaderboard, 30000);
    return () => clearInterval(interval);
  }, []);

  const getRankIcon = (index) => {
    if (index === 0) return <Trophy size={18} color="#FFD700" />;
    if (index === 1) return <Medal size={18} color="#C0C0C0" />;
    if (index === 2) return <Medal size={18} color="#CD7F32" />;
    return <Star size={14} color="var(--text-secondary)" />;
  };

  const getRankStyle = (index) => {
    if (index === 0) return { background: 'linear-gradient(135deg, rgba(255,215,0,0.15), rgba(255,215,0,0.05))', borderLeft: '3px solid #FFD700' };
    if (index === 1) return { background: 'linear-gradient(135deg, rgba(192,192,192,0.12), rgba(192,192,192,0.04))', borderLeft: '3px solid #C0C0C0' };
    if (index === 2) return { background: 'linear-gradient(135deg, rgba(205,127,50,0.12), rgba(205,127,50,0.04))', borderLeft: '3px solid #CD7F32' };
    return { borderLeft: '3px solid transparent' };
  };

  const displayUsers = compact ? users.slice(0, 5) : users;

  return (
    <div style={{
      background: 'var(--card-bg)',
      borderRadius: '12px',
      padding: compact ? '16px' : '24px',
      border: '1px solid #333',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '16px'
      }}>
        <h3 style={{
          fontSize: compact ? '1rem' : '1.2rem',
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Trophy size={compact ? 18 : 22} color="var(--primary-color)" />
          Loyalty Points Leaderboard
        </h3>
        <button
          onClick={fetchLeaderboard}
          disabled={loading}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            padding: '4px',
            display: 'flex',
            alignItems: 'center'
          }}
          title="Refresh"
        >
          <RefreshCw size={16} className={loading ? 'spinning' : ''} />
        </button>
      </div>

      {loading && users.length === 0 ? (
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '20px' }}>
          Loading...
        </p>
      ) : users.length === 0 ? (
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '20px' }}>
          No users yet. Place orders to earn points!
        </p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {displayUsers.map((user, index) => (
            <div
              key={user.username}
              style={{
                display: 'flex',
                alignItems: 'center',
                padding: compact ? '8px 12px' : '12px 16px',
                borderRadius: '8px',
                transition: 'background 0.2s',
                ...getRankStyle(index)
              }}
            >
              <span style={{
                width: '28px',
                fontWeight: 700,
                fontSize: '0.9rem',
                color: index < 3 ? 'var(--text-color)' : 'var(--text-secondary)'
              }}>
                #{index + 1}
              </span>
              <span style={{ marginRight: '10px', display: 'flex', alignItems: 'center' }}>
                {getRankIcon(index)}
              </span>
              <span style={{
                flex: 1,
                fontWeight: index < 3 ? 600 : 400,
                fontSize: compact ? '0.9rem' : '1rem'
              }}>
                {user.username}
              </span>
              <span style={{
                fontWeight: 700,
                color: 'var(--primary-color)',
                fontSize: compact ? '0.9rem' : '1rem'
              }}>
                {user.points} pts
              </span>
            </div>
          ))}
        </div>
      )}

      {compact && users.length > 5 && (
        <p style={{
          color: 'var(--text-secondary)',
          fontSize: '0.8rem',
          textAlign: 'center',
          marginTop: '10px'
        }}>
          +{users.length - 5} more users
        </p>
      )}

      <div style={{
        marginTop: '12px',
        padding: '10px',
        borderRadius: '8px',
        background: 'rgba(74, 107, 74, 0.08)',
        border: '1px solid rgba(74, 107, 74, 0.2)',
        fontSize: '0.8rem',
        color: 'var(--text-secondary)',
        textAlign: 'center'
      }}>
        Earn <strong style={{ color: 'var(--primary-color)' }}>1 point</strong> for every <strong style={{ color: 'var(--primary-color)' }}>100₺</strong> spent
      </div>
    </div>
  );
}
