import React from "react";

export default function EquipmentCard({
  item,
  onEdit,
  onDelete,
  onReserve
}) {
  return (
    <article className="item-card">
      <div className="card-top">
        <span className="category">
          {item.category}
        </span>
        <span
          className={
            "status " +
            (item.available ? "available" : "rented")
          }
        >
          {item.available ? "Available" : "Unavailable"}
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
      <p>{item.notes}</p>
      <div className="meta">
        <span>Condition: {item.condition}</span>
        <strong>${item.dailyRate}/day</strong>
      </div>
      <div className="actions">
        <button onClick={() => onEdit(item)}>
          Edit
        </button>
        <button
          className="danger"
          onClick={() => onDelete(item._id)}
        >
          Delete
        </button>
        {onReserve && (
          <button
            disabled={!item.available}
            onClick={() => onReserve(item)}
          >
            Reserve
          </button>
        )}
      </div>
    </article>
  );
}
