import React, {
  useState,
  useEffect
} from "react";

const blank = {
  name: "",
  category: "Camera",
  condition: "Excellent",
  dailyRate: "",
  notes: ""
};
export default function EquipmentForm({
  editing,
  onSave,
  onCancel
}) {
  const [form, setForm] = useState(blank);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    setForm(
      editing
        ? {
            name: editing.name,
            category: editing.category,
            condition: editing.condition,
            dailyRate: editing.dailyRate,
            notes: editing.notes || ""
          }
        : { ...blank }
    );

    setError("");
  }, [editing]);
  function update(event) {
    const { name, value } = event.target;

    setForm(previous => ({
      ...previous,
      [name]: value
    }));
  }
  async function submit(event) {
    event.preventDefault();

    if (!form.name.trim()) {
      setError("Equipment name is required.");
      return;
    }

    const rate = Number(form.dailyRate);
    if (!Number.isFinite(rate) || rate < 0) {
      setError("Daily rate must be zero or greater.");
      return;
    }

    setSaving(true);
    setError("");
    try {
      await onSave({
        name: form.name.trim(),
        category: form.category,
        condition: form.condition,
        dailyRate: rate,
        notes: form.notes
      });

      if (!editing) {
        setForm({ ...blank });
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }
  return (
    <form onSubmit={submit} className="form">
      <h2>
        {editing
          ? "Edit equipment"
          : "Add equipment"}
      </h2>
      <label>
        Name
        <input
          name="name"
          value={form.name}
          onChange={update}
          required
        />
      </label>
      <div className="form-grid">
        <label>
          Category
          <select
            name="category"
            value={form.category}
            onChange={update}
          >
            {[
              "Camera",
              "Audio",
              "Lighting",
              "Projector",
              "Other"
            ].map(value => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </label>
        <label>
          Condition
          <select
            name="condition"
            value={form.condition}
            onChange={update}
          >
            {[
              "Excellent",
              "Good",
              "Fair",
              "Needs Repair"
            ].map(value => (
              <option key={value}>{value}</option>
            ))}
          </select>
        </label>
        <label>
          Daily rate ($)
          <input
            name="dailyRate"
            type="number"
            min="0"
            step="0.01"
            value={form.dailyRate}
            onChange={update}
            required
          />
        </label>
      </div>
      <label>
        Notes
        <textarea
          name="notes"
          value={form.notes}
          onChange={update}
        />
      </label>
      {error && (
        <p role="alert" className="error">
          {error}
        </p>
      )}
      <div className="form-actions">
        <button
          className="primary"
          type="submit"
          disabled={saving}
        >
          {saving
            ? "Saving..."
            : editing
              ? "Save changes"
              : "Add equipment"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          disabled={saving}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
