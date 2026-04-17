export const metadata = {
  title: "TNPSC Daily Quiz",
  description: "Current affairs to interactive TNPSC quizzes"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "Inter, system-ui, sans-serif", background: "#0b1020", color: "#fff" }}>
        {children}
      </body>
    </html>
  );
}
