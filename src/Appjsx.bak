
import React, { useState, useEffect, useMemo } from 'react';

import initialEquipment from './data/equipment.json';
import EquipmentCard from './components/EquipmentCard.jsx';
import EquipmentForm from './components/EquipmentForm.jsx';

const KEY = 'gearvault-equipment-v1';

const statuses = ['Available', 'Rented', 'Maintenance'];

export default function App() {
  // State Management

  const [equipment, setEquipment] = useState(() => {
    try {
      const stored = localStorage.getItem(KEY);

      return stored
        ? JSON.parse(stored)
        : initialEquipment;
    } catch {
      return initialEquipment;
    }
  });

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');

  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // Save Equipment to Local Storage

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(equipment));
  }, [equipment]);

  // Equipment Categories

  const categories = useMemo(() => {
    return [
      'All',
      ...new Set(equipment.map(x => x.category))
    ];
  }, [equipment]);

  // Search and Filter Equipment

  const visible = useMemo(() => {
    return equipment.filter(x =>
      x.name.toLowerCase().includes(search.toLowerCase()) &&
      (category === 'All' || x.category === category) &&
      (status === 'All' || x.status === status)
    );
  }, [equipment, search, category, status]);

  // Create or Update Equipment

  function save(item) {
    if (item.id) {
      setEquipment(prev =>
        prev.map(x =>
          x.id === item.id ? item : x
        )
      );
    } else {
      setEquipment(prev => [
        ...prev,
        {
          ...item,
          id: Math.max(0, ...prev.map(x => x.id)) + 1
        }
      ]);
    }

    setEditing(null);
    setShowForm(false);
  }

  // Delete Equipment

  function remove(id) {
    if (window.confirm('Delete this equipment item?')) {
      setEquipment(prev =>
        prev.filter(x => x.id !== id)
      );
    }
  }
  // Cycle Equipment Status

  function cycle(id) {
    setEquipment(prev =>
      prev.map(x =>
        x.id === id
          ? {
              ...x,
              status:
                statuses[
                  (statuses.indexOf(x.status) + 1) %
                    statuses.length
                ]
            }
          : x
      )
    );
  }

  // Edit Equipment

  function edit(item) {
    setEditing(item);
    setShowForm(true);

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // Reset Sample Data

  function reset() {
    if (window.confirm('Restore starter equipment?')) {
      setEquipment(initialEquipment);
      setEditing(null);
      setShowForm(false);
    }
  }
  // User Interfaces

  return (
    <div className="shell">

      {/* Sidebar Navigation */}
      <aside className="sidebar">

        <div className="brand">
          ▣ <span>GearVault</span>
        </div>

        <div className="side-label">
          WORKSPACE
        </div>

        <div className="nav active">
          ▦ &nbsp; Inventory
        </div>

        <div className="nav disabled">
          ▤ &nbsp; Rentals
          <small>Coming soon</small>
        </div>

        <div className="nav disabled">
          ♙ &nbsp; Customers
          <small>Coming soon</small>
        </div>

        <div className="nav disabled">
          ⚙ &nbsp; Settings
        </div>

        <div className="sidebar-note">
          FRONTEND STARTER
          <br />
          <span>
            React + Vite
            <br />
            Backend begins Week 1
          </span>
        </div>

      </aside>

      {/* Main Content */}
      <main>

        {/* Page Header */}
        <header>
          <div>
            <div className="eyebrow">
              EQUIPMENT MANAGEMENT
            </div>
            <h1>Inventory overview</h1>
            <p>
              Manage your rental equipment in one place.
            </p>
          </div>
          <button
            className="primary"
            onClick={() => {
              setEditing(null);
              setShowForm(v => !v);
            }}
          >
            + Add equipment
          </button>
        </header>
        {/* Learning Mode Notice */}
        <div className="notice">
          Learning mode: Data is stored in your browser
          using localStorage. This section will change as we
          build our Express API.
        </div>
        {/* Equipment Statistics */}
        <section className="stats">
          <div>
            <span>Total assets</span>
            <strong>{equipment.length}</strong>
          </div>
          <div>
            <span>Available</span>
            <strong>
              {
                equipment.filter(
                  x => x.status === 'Available'
                ).length
              }
            </strong>
          </div>
          <div>
            <span>Currently rented</span>
            <strong>
              {
                equipment.filter(
                  x => x.status === 'Rented'
                ).length
              }
            </strong>
          </div>
          <div>
            <span>Maintenance</span>
            <strong>
              {
                equipment.filter(
                  x => x.status === 'Maintenance'
                ).length
              }
            </strong>
          </div>
        </section>
        {/* Add / Edit Equipment Form */}
        {showForm && (
          <EquipmentForm
            editing={editing}
            onSave={save}
            onCancel={() => {
              setEditing(null);
              setShowForm(false);
            }}
          />
        )}
        {/* Equipment Inventory */}
        <section className="inventory">
          {/* Section Heading */}
          <div className="section-head">
            <div>
              <h2>Equipment catalog</h2>
              <p>
                {visible.length} of {equipment.length} items
              </p>
            </div>
            <button
              className="ghost"
              onClick={reset}
            >
              Reset sample data
            </button>
          </div>
          {/* Search and Filters */}
          <div className="filters">
            <input
              aria-label="Search equipment"
              placeholder="Search equipment..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <select
              aria-label="Filter category"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              {categories.map(c => (
                <option key={c}>
                  {c}
                </option>
              ))}
            </select>
            <select
              aria-label="Filter status"
              value={status}
              onChange={e => setStatus(e.target.value)}
            >
              {['All', ...statuses].map(s => (
                <option key={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          {/* Equipment Cards */}
          <div className="cards">
            {visible.map(item => (
              <EquipmentCard
                key={item.id}
                item={item}
                onEdit={edit}
                onDelete={remove}
                onStatus={cycle}
              />
            ))}
          </div>
          {/* Empty Search Results */}
          {visible.length === 0 && (
            <div className="empty">
              No matching equipment found.
              Try different filters.
            </div>
          )}
        </section>
        {/* Footer */}
        <footer>
          GearVault · Full Stack Development · Week 1 Starter
        </footer>
      </main>
    </div>
  );
}
