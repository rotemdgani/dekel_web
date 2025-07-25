function App() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f2f2f2",
        fontFamily: "'Times New Roman', Times, serif",
        padding: "2rem",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "2rem",
          border: "1px solid black",
          maxWidth: "600px",
          textAlign: "center",
          boxShadow: "2px 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem", textTransform: "uppercase", letterSpacing: "1px" }}>
          Under Construction
        </h1>
        <p style={{ fontSize: "1.2rem", lineHeight: "1.6" }}>
          This website is currently being crafted with care.<br />
          Like a good headline, it'll be worth the wait.
        </p>
        <hr style={{ margin: "2rem 0", border: "none", borderTop: "1px dashed black" }} />
        <p style={{ fontSize: "1rem", fontStyle: "italic" }}>
          Stay tuned for updates.
        </p>
      </div>
    </div>
  );
}

export default App;