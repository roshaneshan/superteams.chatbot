import React, { useState, useRef, useEffect } from "react";

function App() {
  const [messages, setMessages] = useState([
    { text: "Hi! 🔥 Ask me anything about your customers.", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = { text: input, sender: "user" };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput("");

    // Call backend
    try {
      const res = await fetch("http://localhost:8000/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: input }),
      });
      const data = await res.json();
      let reply = "";

      if (data.results && data.results.length > 0) {
        reply = `<span style='color:#ff9100; font-weight:500;'>Result:</span><br>` + JSON.stringify(data.results, null, 2);
      } else if (data.results && data.results.length === 0) {
        reply = "<span style='color:#ff9100'>No results found.</span>";
      } else if (data.error) {
        reply = `<span style='color:#ff4848'>Error: ${data.error}</span>`;
      } else {
        reply = "<span style='color:#ff4848'>Sorry, I didn’t understand that.</span>";
      }

      setMessages((msgs) => [...msgs, { text: reply, sender: "bot" }]);
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        { text: "<span style='color:#ff4848'>Server error. Please try again.</span>", sender: "bot" },
      ]);
    }
  };

return (
  <div style={styles.bg}>
    <div style={styles.centerWrap}>
      <div style={styles.container}>
        <div style={styles.title}>
          <span style={{ fontWeight: 700, fontSize: 22, letterSpacing: 0.2, color: "#fff", textShadow: "0 4px 24px #000b" }}>
            LLM SQL Chatbot
          </span>
          <span style={{ fontWeight: 500, fontSize: 13, color: "#ff9100", marginLeft: 7, letterSpacing: 0.3 }}>
            | Superteams.ai Project
          </span>
        </div>
        <div style={styles.chatBox}>
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                ...styles.bubble,
                alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                background:
                  msg.sender === "user"
                    ? "linear-gradient(120deg, #ff9100 20%, #ff6f00 100%)"
                    : "rgba(36,38,49,0.85)",
                color: "#fff",
                // boxShadow REMOVED!
                borderTopRightRadius: msg.sender === "user" ? 8 : 18,
                borderTopLeftRadius: msg.sender === "user" ? 18 : 8,
                borderBottomRightRadius: 18,
                borderBottomLeftRadius: 18,
                border:
                  msg.sender === "bot"
                    ? "1.2px solid #ff910033"
                    : "none",
                filter: msg.sender === "bot" ? "blur(0px)" : undefined,
                fontFamily: "Inter, sans-serif",
                fontWeight: msg.sender === "user" ? 500 : 400,
                fontSize: msg.sender === "user" ? 16.5 : 15.4,
                marginBottom: i === messages.length - 1 ? 0 : 4,
                opacity: 1,
                animation: "popin 0.22s cubic-bezier(.4,2,.6,1.0)"
              }}
              dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, "<br>") }}
            />
          ))}
          <div ref={chatEndRef} />
        </div>
        <form style={styles.inputRow} onSubmit={handleSend}>
          <input
            style={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your question and hit Enter…"
            autoFocus
          />
          <button style={styles.sendBtn} type="submit">
            <span role="img" aria-label="Send" style={{ fontSize: 20 }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="#fff">
                <circle cx="12" cy="12" r="12" fill="#ff9100"/>
                <path d="M17 6L7 12L17 18V6Z" fill="#fff"/>
              </svg>
            </span>
          </button>
        </form>
      </div>
    </div>
    <style>
      {`
      @keyframes popin {
        from { transform: scale(0.97); opacity: 0.15; }
        to   { transform: scale(1); opacity: 1; }
      }
      ::-webkit-scrollbar {
        width: 7px;
        background: #181b1f;
      }
      ::-webkit-scrollbar-thumb {
        background: #232a36;
        border-radius: 8px;
      }
      `}
    </style>
  </div>
);

}

// Enhanced dark style + orange accent
const styles = {
bg: {
  minHeight: "100vh",
  width: "100vw",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "Inter, sans-serif",
  // Layered gradients for depth + accent
  background: `
    radial-gradient(ellipse at 80% 16%, #ff910020 0%, #ff6f0025 42%, #181b1f 95%),
    radial-gradient(ellipse at 12% 85%, #fff1e020 0%, #282d38 85%),
    linear-gradient(125deg, #191b24 60%, #282d38 100%)
  `,
  // Subtle glass effect overlay (optional)
  backdropFilter: "blur(1.6px) saturate(120%)",
  WebkitBackdropFilter: "blur(1.6px) saturate(120%)",
  transition: "background 0.35s",
},

  centerWrap: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100vw",
    minHeight: "100vh",
  },
  container: {
    width: "100%",
    maxWidth: 440,
    margin: "0 auto",
    padding: 0,
    borderRadius: 24,
    boxShadow: "0 14px 80px #000c",
    background: "rgba(28,32,40,0.96)",
    display: "flex",
    flexDirection: "column",
    height: "82vh",
    minHeight: 540,
    border: "1.7px solid #1b1b26",
    overflow: "hidden",
    position: "relative",
    transition: "box-shadow 0.18s",
  },
  title: {
    padding: "32px 0 18px 0",
    textAlign: "center",
    color: "#fff",
    letterSpacing: "0.1px",
    fontFamily: "Inter, sans-serif",
    fontSize: 19,
    fontWeight: 600,
    userSelect: "none",
    textShadow: "0 4px 24px #0007",
    background: "transparent",
  },
  chatBox: {
    flex: 1,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: 16,
    padding: "12px 18px 10px 18px",
    background: "rgba(31,34,39,0.82)",
    borderRadius: 12,
    border: "1.4px solid #26293a",
    marginBottom: 8,
    minHeight: 0,
    fontSize: 15,
    scrollbarWidth: "thin",
    scrollbarColor: "#232c38 #191d22",
    backdropFilter: "blur(3px)",
    boxShadow: "0 1px 12px #ff910010",
    transition: "border 0.19s",
  },
bubble: {
    padding: "13px 18px",
    borderRadius: 18,
    maxWidth: "78%",
    marginBottom: 0,
    whiteSpace: "pre-wrap",
    fontFamily: "Inter, sans-serif",
    lineHeight: 1.68,
    wordBreak: "break-word",
    boxSizing: "border-box",
    transition: "background 0.18s, box-shadow 0.18s",
    border: "none",
},


  inputRow: {
    display: "flex",
    gap: 10,
    padding: "0 16px 24px 16px",
    alignItems: "center",
    background: "rgba(21,23,27,0.97)",
    borderRadius: 12,
    marginTop: 6,
    borderTop: "1.5px solid #22242c",
  },
  input: {
    flex: 1,
    borderRadius: 11,
    border: "1.5px solid #383e53",
    fontSize: 16.5,
    padding: "15px 15px",
    outline: "none",
    background: "#191d22",
    color: "#fff",
    fontFamily: "Inter, sans-serif",
    boxShadow: "0 2px 8px #0002",
    transition: "border 0.18s",
  },
  sendBtn: {
    padding: "9px 12px 8px 10px",
    borderRadius: 9,
    border: "none",
    background: "linear-gradient(135deg, #ff9100 55%, #ff6f00 100%)",
    color: "#fff",
    fontWeight: 700,
    fontSize: 19,
    cursor: "pointer",
    boxShadow: "0 1.5px 12px #ff910055",
    marginLeft: 0,
    transition: "background 0.18s, box-shadow 0.18s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
};

export default App;
