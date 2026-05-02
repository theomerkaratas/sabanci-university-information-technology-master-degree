import { useState, useEffect } from 'react';
import { api } from '../services/api';

export default function CustomerTables({ onTableChanged }) {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [changingTable, setChangingTable] = useState(null); // username being edited
  const [selectedTable, setSelectedTable] = useState('');
  const [tableCount, setTableCount] = useState(10);

  const fetchCustomers = async () => {
    try {
      const [data, configData] = await Promise.all([
        api.fetchCustomers(),
        api.getTableCount()
      ]);
      setCustomers(data);
      setTableCount(configData.tableCount || 10);
    } catch (error) {
      console.error('Failed to fetch customers', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
    const interval = setInterval(fetchCustomers, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleChangeTable = async (username) => {
    const tableNum = parseInt(selectedTable);
    if (isNaN(tableNum) || tableNum < 1 || tableNum > tableCount) {
      alert(`Please select a valid table (1-${tableCount})`);
      return;
    }
    try {
      await api.adminChangeTable(username, tableNum);
      setChangingTable(null);
      setSelectedTable('');
      fetchCustomers();
      if (onTableChanged) onTableChanged();
    } catch (error) {
      alert(error.message || 'Failed to change table');
    }
  };

  const handleRemoveTable = async (username) => {
    if (!confirm(`Remove table assignment for ${username}?`)) return;
    try {
      await api.adminChangeTable(username, null);
      fetchCustomers();
      if (onTableChanged) onTableChanged();
    } catch (error) {
      alert(error.message || 'Failed to remove table');
    }
  };

  const activeCustomers = customers.filter(c => c.activeTable);
  const inactiveCustomers = customers.filter(c => !c.activeTable);

  // Which tables are occupied
  const occupiedTables = activeCustomers.map(c => c.activeTable);

  return (
    <div className="customer-tables-section">
      <div className="customer-tables-header">
        <h2>🪑 Customer Table Management</h2>
        <button className="refresh-btn" onClick={fetchCustomers} style={{ fontSize: '0.85rem', padding: '8px 14px' }}>
          🔄 Refresh
        </button>
      </div>

      {loading ? (
        <p style={{ textAlign: 'center', padding: '20px', color: 'var(--text-secondary)' }}>Loading customers...</p>
      ) : (
        <>
          {/* Active Customers (with table) */}
          <div className="customer-tables-grid">
            {activeCustomers.length === 0 ? (
              <p className="no-active-customers">No customers currently seated at a table.</p>
            ) : (
              activeCustomers.map(customer => (
                <div key={customer.username} className="customer-table-card">
                  <div className="customer-table-info">
                    <span className="customer-table-icon">🍽️</span>
                    <div>
                      <strong className="customer-name">{customer.username}</strong>
                      <span className="customer-current-table">Table {customer.activeTable}</span>
                      {customer.points > 0 && (
                        <span className="customer-points">⭐ {customer.points} pts</span>
                      )}
                    </div>
                  </div>
                  <div className="customer-table-actions">
                    {changingTable === customer.username ? (
                      <div className="change-table-form">
                        <select
                          value={selectedTable}
                          onChange={(e) => setSelectedTable(e.target.value)}
                          className="table-select"
                        >
                          <option value="">Select Table</option>
                          {Array.from({ length: tableCount }, (_, i) => i + 1).map(num => (
                            <option
                              key={num}
                              value={num}
                              disabled={occupiedTables.includes(num) && num !== customer.activeTable}
                            >
                              Table {num} {occupiedTables.includes(num) && num !== customer.activeTable ? '(Occupied)' : ''}
                            </option>
                          ))}
                        </select>
                        <button
                          className="btn-confirm-table"
                          onClick={() => handleChangeTable(customer.username)}
                          disabled={!selectedTable}
                        >
                          ✓
                        </button>
                        <button
                          className="btn-cancel-table"
                          onClick={() => { setChangingTable(null); setSelectedTable(''); }}
                        >
                          ✕
                        </button>
                      </div>
                    ) : (
                      <>
                        <button
                          className="btn-change-table"
                          onClick={() => { setChangingTable(customer.username); setSelectedTable(String(customer.activeTable)); }}
                        >
                          🔄 Change Table
                        </button>
                        <button
                          className="btn-remove-table"
                          onClick={() => handleRemoveTable(customer.username)}
                        >
                          ✕
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Inactive Customers */}
          {inactiveCustomers.length > 0 && (
            <div style={{ marginTop: '15px' }}>
              <h4 style={{ color: 'var(--text-secondary)', marginBottom: '10px', fontSize: '0.9rem' }}>
                Customers without table ({inactiveCustomers.length})
              </h4>
              <div className="customer-tables-grid">
                {inactiveCustomers.map(customer => (
                  <div key={customer.username} className="customer-table-card inactive">
                    <div className="customer-table-info">
                      <span className="customer-table-icon" style={{ opacity: 0.4 }}>👤</span>
                      <div>
                        <strong className="customer-name">{customer.username}</strong>
                        <span className="customer-current-table" style={{ color: 'var(--text-secondary)' }}>No table</span>
                        {customer.points > 0 && (
                          <span className="customer-points">⭐ {customer.points} pts</span>
                        )}
                      </div>
                    </div>
                    <div className="customer-table-actions">
                      {changingTable === customer.username ? (
                        <div className="change-table-form">
                          <select
                            value={selectedTable}
                            onChange={(e) => setSelectedTable(e.target.value)}
                            className="table-select"
                          >
                            <option value="">Select Table</option>
                            {Array.from({ length: tableCount }, (_, i) => i + 1).map(num => (
                              <option
                                key={num}
                                value={num}
                                disabled={occupiedTables.includes(num)}
                              >
                                Table {num} {occupiedTables.includes(num) ? '(Occupied)' : ''}
                              </option>
                            ))}
                          </select>
                          <button
                            className="btn-confirm-table"
                            onClick={() => handleChangeTable(customer.username)}
                            disabled={!selectedTable}
                          >
                            ✓
                          </button>
                          <button
                            className="btn-cancel-table"
                            onClick={() => { setChangingTable(null); setSelectedTable(''); }}
                          >
                            ✕
                          </button>
                        </div>
                      ) : (
                        <button
                          className="btn-assign-table"
                          onClick={() => { setChangingTable(customer.username); setSelectedTable(''); }}
                        >
                          + Assign Table
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
