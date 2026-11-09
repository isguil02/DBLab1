import React from "react";
export default function EquipmentCard({ item, onEdit, onDelete, onStatus }) {
  return (
    <article className="item-card">
      <div className="card-top">
        <span className="category">{item.category}</span>
        <span className={"status " + item.status.toLowerCase()}>
          {item.status}
        </span>
      </div>
      <div className="equipment-icon">
        {item.category === "Camera"
          ? "📷"
          : item.category === "Audio"
            ? "🎙️"
            : item.category === "Lighting"
              ? "💡"
              : "📽️"}
      </div>
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <div className="meta">
        <span>Condition: {item.condition}</span>
        <strong>${item.dailyRate}/day</strong>
      </div>
      <div className="actions">
        <button onClick={() => onEdit(item)}>Edit</button>
        <button onClick={() => onStatus(item.id)}>Cycle status</button>
        <button className="danger" onClick={() => onDelete(item.id)}>
          Delete
        </button>
      </div>
    </article>
  );
}
