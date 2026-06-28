import { useState } from "react";

// ─── CONFIG — edit these before deploying ────────────────────────────────────
const OWNER = {
  name: "Anshul",
  plate: "PB02EV9338",          // Replace #### with your actual numbers
  phone: "+919876957890",      // Your WhatsApp-enabled number (E.164 format)
  callPhone: "+919876957890",  // Same or different number for calls
  city: "Amritsar, Punjab",
  note: "Please leave a message if I don't answer — I'll get back ASAP.",
};
// ─────────────────────────────────────────────────────────────────────────────

const REASONS = [
  { emoji: "🚗", label: "Blocking my vehicle" },
  { emoji: "💡", label: "Headlights / door left open" },
  { emoji: "🔑", label: "Keys left in vehicle" },
  { emoji: "💥", label: "Minor accident / damage" },
  { emoji: "🚨", label: "Emergency / urgent" },
  { emoji: "✍️", label: "Other" },
];

export default function App() {
  const [selected, setSelected] = useState(null);
  const [custom, setCustom] = useState("");
  const [sent, setSent] = useState(false);

  const getMessage = () => {
    const reason =
      selected === "Other" ? custom || "Other reason" : selected || "Reason not specified";
    return encodeURIComponent(
      `Hi! I'm contacting you about your vehicle *${OWNER.plate}*.\n\nReason: ${reason}\n\nPlease respond when you can. 🙏`
    );
  };

  const handleWhatsApp = () => {
    const num = OWNER.phone.replace(/\D/g, "");
    window.open(`https://wa.me/${num}?text=${getMessage()}`, "_blank");
    setSent(true);
  };

  const handleCall = () => {
    window.location.href = `tel:${OWNER.callPhone}`;
  };

  return (
    <div style={styles.root}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerInner}>
          <span style={styles.logo}>🚘 VehicleTag</span>
          <span style={styles.headerSub}>Owner Contact</span>
        </div>
      </header>

      <main style={styles.main}>
        {/* Number Plate Card */}
        <div style={styles.plateCard}>
          <p style={styles.plateLabel}>Registered Vehicle</p>
          <div style={styles.plate}>
            <div style={styles.plateBlueBand}>
              <span style={styles.plateIND}>IND</span>
              <div style={styles.plateFlag}>
                <div style={{ background: "#FF9933", height: "33%" }} />
                <div style={{ background: "#FFFFFF", height: "33%" }} />
                <div style={{ background: "#138808", height: "34%" }} />
              </div>
              <div style={styles.plateAshok}>⊙</div>
            </div>
            <div style={styles.plateLower}>
              <span style={styles.plateText}>{OWNER.plate}</span>
            </div>
          </div>
          <p style={styles.plateCity}>{OWNER.city}</p>
        </div>

        {/* Reason selector */}
        {!sent ? (
          <>
            <div style={styles.section}>
              <p style={styles.sectionTitle}>Why are you contacting the owner?</p>
              <div style={styles.reasonGrid}>
                {REASONS.map((r) => (
                  <button
                    key={r.label}
                    style={{
                      ...styles.reasonBtn,
                      ...(selected === r.label ? styles.reasonBtnActive : {}),
                    }}
                    onClick={() => setSelected(r.label)}
                  >
                    <span style={styles.reasonEmoji}>{r.emoji}</span>
                    <span style={styles.reasonText}>{r.label}</span>
                  </button>
                ))}
              </div>
              {selected === "Other" && (
                <textarea
                  style={styles.textarea}
                  placeholder="Describe the reason briefly…"
                  value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                  rows={3}
                />
              )}
            </div>

            {/* Action Buttons */}
            <div style={styles.actions}>
              <button
                style={{
                  ...styles.actionBtn,
                  ...styles.whatsappBtn,
                  opacity: !selected ? 0.5 : 1,
                }}
                onClick={handleWhatsApp}
                disabled={!selected}
              >
                <span style={styles.btnIcon}>💬</span>
                <div>
                  <div style={styles.btnTitle}>Message on WhatsApp</div>
                  <div style={styles.btnSub}>Opens WhatsApp with your reason</div>
                </div>
              </button>

              <button
                style={{
                  ...styles.actionBtn,
                  ...styles.callBtn,
                  opacity: !selected ? 0.5 : 1,
                }}
                onClick={handleCall}
                disabled={!selected}
              >
                <span style={styles.btnIcon}>📞</span>
                <div>
                  <div style={styles.btnTitle}>Call Owner</div>
                  <div style={styles.btnSub}>Direct call to owner</div>
                </div>
              </button>

              <button style={{ ...styles.actionBtn, ...styles.emergencyBtn }} onClick={handleCall}>
                <span style={styles.btnIcon}>🚨</span>
                <div>
                  <div style={styles.btnTitle}>Emergency</div>
                  <div style={styles.btnSub}>Accident or urgent help needed</div>
                </div>
              </button>
            </div>

            {/* Note */}
            <div style={styles.noteCard}>
              <p style={styles.noteText}>💬 {OWNER.note}</p>
              <p style={styles.noteText} style={{ marginTop: 6, color: "#888", fontSize: 12 }}>
                Your contact may be shared with the owner when you reach out.
              </p>
            </div>
          </>
        ) : (
          /* Success state */
          <div style={styles.successCard}>
            <div style={styles.successIcon}>✅</div>
            <h2 style={styles.successTitle}>Message Ready!</h2>
            <p style={styles.successText}>
              WhatsApp opened with your message. The owner will be notified.
            </p>
            <button style={{ ...styles.actionBtn, ...styles.callBtn, marginTop: 20 }} onClick={handleCall}>
              <span style={styles.btnIcon}>📞</span>
              <div>
                <div style={styles.btnTitle}>Also Call Owner</div>
                <div style={styles.btnSub}>If it's urgent</div>
              </div>
            </button>
            <button
              style={styles.resetBtn}
              onClick={() => {
                setSent(false);
                setSelected(null);
                setCustom("");
              }}
            >
              ← Back
            </button>
          </div>
        )}
      </main>

      <footer style={styles.footer}>
        <p>Powered by VehicleTag · India 🇮🇳</p>
      </footer>
    </div>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────
const styles = {
  root: {
    minHeight: "100vh",
    background: "#F0F2F5",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
    color: "#0A1628",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    background: "#0A1628",
    padding: "14px 20px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
  },
  headerInner: {
    maxWidth: 480,
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    gap: 10,
  },
  logo: {
    color: "#F5A623",
    fontWeight: 800,
    fontSize: 20,
    letterSpacing: "-0.5px",
  },
  headerSub: {
    color: "#8899AA",
    fontSize: 13,
    marginLeft: "auto",
    letterSpacing: "0.5px",
  },
  main: {
    flex: 1,
    maxWidth: 480,
    width: "100%",
    margin: "0 auto",
    padding: "20px 16px 32px",
    display: "flex",
    flexDirection: "column",
    gap: 20,
  },
  plateCard: {
    background: "#fff",
    borderRadius: 16,
    padding: "24px 20px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    textAlign: "center",
  },
  plateLabel: {
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: "1px",
    color: "#8899AA",
    textTransform: "uppercase",
    marginBottom: 16,
    margin: "0 0 16px",
  },
  plate: {
    display: "inline-block",
    border: "3px solid #1a1a1a",
    borderRadius: 8,
    overflow: "hidden",
    minWidth: 240,
    boxShadow: "0 3px 10px rgba(0,0,0,0.2)",
    margin: "0 auto 12px",
  },
  plateBlueBand: {
    background: "#003087",
    display: "flex",
    alignItems: "center",
    padding: "4px 10px",
    gap: 6,
    position: "relative",
  },
  plateIND: {
    color: "#fff",
    fontSize: 11,
    fontWeight: 700,
    letterSpacing: 2,
    flex: 1,
    textAlign: "center",
  },
  plateFlag: {
    width: 18,
    height: 14,
    borderRadius: 2,
    overflow: "hidden",
    position: "absolute",
    left: 8,
  },
  plateAshok: {
    color: "#fff",
    fontSize: 14,
    position: "absolute",
    right: 8,
  },
  plateLower: {
    background: "#FFFDE7",
    padding: "8px 16px",
    textAlign: "center",
  },
  plateText: {
    fontSize: 28,
    fontWeight: 900,
    letterSpacing: "3px",
    color: "#0A0A0A",
    fontFamily: "monospace",
  },
  plateCity: {
    fontSize: 13,
    color: "#8899AA",
    margin: 0,
  },
  section: {
    background: "#fff",
    borderRadius: 16,
    padding: "20px 16px",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
  },
  sectionTitle: {
    fontWeight: 700,
    fontSize: 15,
    marginBottom: 14,
    margin: "0 0 14px",
    color: "#0A1628",
  },
  reasonGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
  },
  reasonBtn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 6,
    padding: "14px 10px",
    border: "2px solid #E5E9EF",
    borderRadius: 12,
    background: "#F8F9FA",
    cursor: "pointer",
    transition: "all 0.15s",
  },
  reasonBtnActive: {
    border: "2px solid #F5A623",
    background: "#FFF8EC",
    boxShadow: "0 0 0 3px rgba(245,166,35,0.15)",
  },
  reasonEmoji: { fontSize: 22 },
  reasonText: { fontSize: 12, fontWeight: 600, color: "#0A1628", textAlign: "center" },
  textarea: {
    marginTop: 12,
    width: "100%",
    padding: "10px 12px",
    borderRadius: 10,
    border: "2px solid #E5E9EF",
    fontSize: 14,
    resize: "none",
    fontFamily: "inherit",
    boxSizing: "border-box",
    outline: "none",
  },
  actions: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },
  actionBtn: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: "16px 18px",
    borderRadius: 14,
    border: "none",
    cursor: "pointer",
    textAlign: "left",
    transition: "transform 0.1s, box-shadow 0.1s",
    boxShadow: "0 3px 10px rgba(0,0,0,0.12)",
  },
  whatsappBtn: {
    background: "#25D366",
    color: "#fff",
  },
  callBtn: {
    background: "#0A1628",
    color: "#fff",
  },
  emergencyBtn: {
    background: "#E53935",
    color: "#fff",
  },
  btnIcon: { fontSize: 28 },
  btnTitle: { fontWeight: 700, fontSize: 15 },
  btnSub: { fontSize: 12, opacity: 0.8, marginTop: 2 },
  noteCard: {
    background: "#fff",
    borderRadius: 12,
    padding: "14px 16px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  },
  noteText: { margin: 0, fontSize: 13, color: "#555", lineHeight: 1.5 },
  successCard: {
    background: "#fff",
    borderRadius: 16,
    padding: "32px 20px",
    textAlign: "center",
    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  successIcon: { fontSize: 52, marginBottom: 12 },
  successTitle: { fontSize: 22, fontWeight: 800, margin: "0 0 8px" },
  successText: { color: "#555", fontSize: 14, lineHeight: 1.6, margin: 0 },
  resetBtn: {
    marginTop: 14,
    background: "none",
    border: "none",
    color: "#8899AA",
    fontSize: 14,
    cursor: "pointer",
    padding: "8px 0",
  },
  footer: {
    textAlign: "center",
    padding: "16px",
    fontSize: 12,
    color: "#AAB",
    background: "#0A1628",
    color: "#8899AA",
  },
};
