import React, { useState, useEffect } from "react";
const blank = {
  name: "",
  category: "Camera",
  condition: "Excellent",
  status: "Available",
  dailyRate: "",
  description: "",
};
export default function EquipmentForm({ editing, onSave, onCancel }) {
  const [form, setForm] = useState(blank);
  useEffect(() => setForm(editing ? { ...editing } : blank), [editing]);
  function update(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }
  function submit(e) {
    e.preventDefault();
    if (!form.name.trim() || Number(form.dailyRate) <= 0) return;
    onSave({
      ...form,
      name: form.name.trim(),
      dailyRate: Number(form.dailyRate),
    });
    if (!editing) setForm(blank);
  }
  return (
    <form onSubmit={submit} className="form">
      <h2>{editing ? "Edit equipment" : "Add equipment"}</h2>
      <label>
        Name
        <input name="name" value={form.name} onChange={update} required />
      </label>
      <div className="form-grid">
        <label>
          Category
          <select name="category" value={form.category} onChange={update}>
            {["Camera", "Audio", "Lighting", "Projector", "Other"].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label>
          Condition
          <select name="condition" value={form.condition} onChange={update}>
            {["Excellent", "Good", "Fair"].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label>
          Status
          <select name="status" value={form.status} onChange={update}>
            {["Available", "Rented", "Maintenance"].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </label>
        <label>
          Daily rate ($)
          <input
            name="dailyRate"
            type="number"
            min="1"
            step="0.01"
            value={form.dailyRate}
            onChange={update}
            required
          />
        </label>
      </div>
      <label>
        Description
        <textarea
          name="description"
          value={form.description}
          onChange={update}
        />
      </label>
      <div className="form-actions">
        <button className="primary" type="submit">
          {editing ? "Save changes" : "Add equipment"}
        </button>
        {editing && (
          <button type="button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
