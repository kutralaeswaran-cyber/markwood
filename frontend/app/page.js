import StatCard from "../components/StatCard";

const card = {
  background: "linear-gradient(145deg, #1f2a56, #151b35)",
  borderRadius: 20,
  padding: 20,
  marginBottom: 14
};

export default function HomePage() {
  return (
    <main style={{ padding: 16, maxWidth: 560, margin: "0 auto" }}>
      <header style={{ marginBottom: 18 }}>
        <h1 style={{ margin: 0 }}>வணக்கம் / Welcome 👋</h1>
        <p style={{ opacity: 0.8, marginTop: 6 }}>Today&apos;s current affairs quiz is ready.</p>
      </header>

      <section style={card}>
        <h2 style={{ marginTop: 0, marginBottom: 8 }}>Today&apos;s Quiz</h2>
        <p style={{ marginTop: 0, opacity: 0.85 }}>10 AI-generated TNPSC questions from latest PDF.</p>
        <button style={{ border: 0, borderRadius: 12, padding: "12px 16px", fontWeight: 700, marginTop: 8 }}>
          Start Quiz
        </button>
      </section>

      <section style={{ display: "flex", gap: 10, marginBottom: 14 }}>
        <StatCard label="Streak" value="7" />
        <StatCard label="Accuracy" value="82%" />
        <StatCard label="Rank" value="#143" />
      </section>

      <section style={card}>
        <h3 style={{ marginTop: 0 }}>Daily Current Affairs</h3>
        <ul style={{ paddingLeft: 18, marginBottom: 0, lineHeight: 1.7 }}>
          <li>One-line revision notes</li>
          <li>Important facts by topic</li>
          <li>Bookmark for offline revision</li>
        </ul>
      </section>
    </main>
  );
}
