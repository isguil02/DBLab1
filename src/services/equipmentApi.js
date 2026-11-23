// src/services/equipmentApi.js

const API_URL = import.meta.env.VITE_API_URL;

async function apiRequest(path, options = {}) {
  const response = await fetch(
    `${API_URL}${path}`,
    {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options.headers
      }
    }
  );

  if (!response.ok) {
    const errorData = await response.json()
      .catch(() => ({}));

    throw new Error(
      errorData.message ||
      `HTTP error ${response.status}`
    );
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export function getEquipment() {
  return apiRequest("/equipment");
}

export function createEquipment(item) {
  return apiRequest("/equipment", {
    method: "POST",
    body: JSON.stringify(item)
  });
}

export function updateEquipment(id, item) {
  return apiRequest(`/equipment/${id}`, {
    method: "PUT",
    body: JSON.stringify(item)
  });
}

export function deleteEquipment(id) {
  return apiRequest(`/equipment/${id}`, {
    method: "DELETE"
  });
}
