const payload = {
  firstName: "טסט",
  lastName: "משתמש",
  email: "test@temple.dev",
  gender: "other",
  phone: "050-0000000",
  health: "ללא",
  natureElement: "אש",
  volunteer: "",
  notes: "הרשמת בדיקה — ניתן למחוק",
  consent0: true,
  consent1: true,
  consent2: true,
  consent3: true,
  consent4: true,
  _hp: "",
};

const res = await fetch("http://localhost:3000/api/register", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});

const body = await res.json();

if (res.ok) {
  console.log("✅ Success! Check your Google Sheet for the new row.");
} else {
  console.error("❌ Failed:", res.status, body);
}
