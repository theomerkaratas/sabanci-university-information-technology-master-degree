import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Settings, Plus, Minus } from 'lucide-react';

export default function TableConfig() {
  const [tableCount, setTableCount] = useState(10);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetchTableCount();
  }, []);

  const fetchTableCount = async () => {
    try {
      const data = await api.getTableCount();
      setTableCount(data.tableCount);
    } catch (error) {
      console.error('Failed to fetch table count', error);
    } finally {
      setLoading(false);
    }
  };

  const updateTableCount = async (newCount) => {
    if (newCount < 1 || newCount > 100) return;
    setSaving(true);
    setMessage(null);
    try {
      await api.setTableCount(newCount);
      setTableCount(newCount);
      setMessage({ type: 'success', text: `Table count updated to ${newCount}` });
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
      setTimeout(() => setMessage(null), 5000);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="table-config-section">
        <p style={{ textAlign: 'center', padding: '15px', color: 'var(--text-secondary)' }}>Loading configuration...</p>
      </div>
    );
  }

  return (
    <div className="table-config-section">
      <div className="table-config-header">
        <h2><Settings size={20} style={{ verticalAlign: 'text-bottom', marginRight: '8px' }} />Table Configuration</h2>
      </div>
      <div className="table-config-body">
        <div className="table-config-control">
          <span className="table-config-label">Number of Tables</span>
          <div className="table-config-counter">
            <button
              className="table-config-btn decrement"
              onClick={() => updateTableCount(tableCount - 1)}
              disabled={saving || tableCount <= 1}
              title="Decrease"
            >
              <Minus size={18} />
            </button>
            <span className="table-config-value">{tableCount}</span>
            <button
              className="table-config-btn increment"
              onClick={() => updateTableCount(tableCount + 1)}
              disabled={saving || tableCount >= 100}
              title="Increase"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>
        {message && (
          <div className={`table-config-message ${message.type}`}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
}
