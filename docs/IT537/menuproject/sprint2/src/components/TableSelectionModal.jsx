import { useState, useEffect } from 'react';
import { api } from '../services/api';
import { X } from 'lucide-react';

export default function TableSelectionModal({ isOpen, onClose, onSelectTable }) {
  const [tables, setTables] = useState(
    Array.from({ length: 10 }, (_, i) => ({ number: i + 1, occupied: false }))
  );
  const [selectedTable, setSelectedTable] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      updateTableOccupancy();
    }
  }, [isOpen]);

  const updateTableOccupancy = async () => {
    setLoading(true);
    try {
      const orders = await api.fetchOrders();
      const occupiedTables = orders
        .filter(
          (order) =>
            order.status !== 'completed' && order.status !== 'cancelled'
        )
        .map((order) => parseInt(order.table));

      setTables((prev) =>
        prev.map((table) => ({
          ...table,
          occupied: occupiedTables.includes(table.number),
        }))
      );
    } catch (error) {
      console.error('Error fetching table occupancy:', error);
      // Ensure we don't block the UI if fetch fails
    } finally {
      setLoading(false);
    }
  };

  const handleTableClick = (table) => {
    if (table.occupied) return; // Toast handled by parent or verify here?
    
    setSelectedTable(table.number);
    // Auto confirm selection after brief delay or wait for button?
    // Original UX was clicking selects it and moves on.
    // "setTimeout(() => completeOrder(tableNumber), 500);"
    onSelectTable(table.number);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className={`table-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}></div>
      <div className={`table-modal ${isOpen ? 'active' : ''}`}>
        <div className="table-modal-content">
          <div className="table-modal-header">
            <h2>Select Your Table</h2>
            <button className="close-modal" onClick={onClose}>
              <X />
            </button>
          </div>
          <div className="table-grid">
            {loading ? (
               <div style={{gridColumn: '1/-1', textAlign: 'center', padding: '20px'}}>Checking table availability...</div>
            ) : (
                tables.map((table) => (
                <div
                    key={table.number}
                    className={`table-card ${table.occupied ? 'occupied' : ''} ${selectedTable === table.number ? 'selected' : ''}`}
                    onClick={() => handleTableClick(table)}
                >
                    <div className="table-icon">🪑</div>
                    <div className="table-number">Table {table.number}</div>
                    <div className="table-status">
                    {table.occupied ? 'Occupied' : 'Available'}
                    </div>
                </div>
                ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
