const equipment = [
  { id: 1, name: "Camera", available: true },
  { id: 2, name: "Projector", available: false },
  { id: 3, name: "Microphone", available: true },
];
console.log("GearVault Inventory");
const available = equipment.filter((item) => item.available);
console.log("Available equipment:", available.length);
available.forEach((item) => console.log(`${item.id}: ${item.name}`));
