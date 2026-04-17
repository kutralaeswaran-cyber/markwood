export default function StatCard({ label, value }) {
  return (
    <div
      style={{
        background: "#1a2140",
        borderRadius: 16,
        padding: 16,
        minWidth: 120
      }}
    >
      <div style={{ fontSize: 12, opacity: 0.8 }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 700 }}>{value}</div>
    </div>
  );
}
