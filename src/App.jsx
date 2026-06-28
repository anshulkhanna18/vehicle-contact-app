import { useState } from "react";

// ─── CONFIG — edit these before deploying ────────────────────────────────────
const OWNER = {
  name: "Anshul",
  plate: "PB02EV9338",           // Replace with your actual plate number
  phone: "+919876957890",        // Your WhatsApp-enabled number (with country code)
  callPhone: "+919876957890",    // Same or different number for calls
  city: "Amritsar, Punjab",
  note: "Please leave a message if I don't answer — I'll get back ASAP.",
};
// ─────────────────────────────────────────────────────────────────────────────

const REASONS = [
  { emoji: "🚗", label: "Blocking my vehicle" },
  { emoji: "💡", label: "Lights / door open" },
  { emoji: "🔑", label: "Keys left inside" },
  { emoji: "💥", label: "Accident / damage" },
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
    <div style={s.root}>
      <header style={s.header}>
        <div style={s.headerInner}>
          <span style={s.logo}>🚘 VehicleTag</span>
          <span style={s.headerSub}>Owner Contact</span>
        </div>
      </header>

      <main style={s.main}>
        {/* Number Plate */}
        <div style={s.card}>
          <p style={s.plateLabel}>REGISTERED VEHICLE</p>
          <div style={s.plate}>
            <div style={s.plateBlueBand}>
              <div style={s.plateFlag}>
                <div style={{ background: "#FF9933", height: "33%" }} />
                <div style={{ background: "#FFFFFF", height: "33%" }} />
                <div style={{ background: "#138808", height: "34%" }} />
              </div>
              <span style={s.plateIND}>IND</span>
              <span style={s.plateAshok}>⊙</span>
            </div>
            <div style={s.plateLower}>
              <span style={s.plateText}>{OWNER.plate}</span>
            </div>
          </div>
          <p style={s.plateCity}>{OWNER.city}</p>
        </div>

        {!sent ? (
          <>
            {/* Reason Selector */}
            <div style={s.card}>
              <p style={s.sectionTitle}>Why are you contacting the owner?</p>
              <div style={s.reasonGrid}>
                {REASONS.map((r) => (
                  <button
                    key={r.label}
                    style={{ ...s.reasonBtn, ...(selected === r.label ? s.reasonBtnActive : {}) }}
                    onClick={() => setSelected(r.label)}
                  >
                    <span style={{ fontSize: 22 }}>{r.emoji}</span>
                    <span style={s.reasonText}>{r.label}</span>
                  </button>
                ))}
              </div>
              {selected === "Other" && (
                <textarea
                  style={s.textarea}
                  placeholder="Describe the reason briefly…"
                  value={custom}
                  onChange={(e) => setCustom(e.target.value)}
                  rows={3}
                />
              )}
            </div>

            {/* Action Buttons */}
            <div style={s.actions}>
              <button
                style={{ ...s.actionBtn, ...s.waBtn, opacity: !selected ? 0.5 : 1 }}
                onClick={handleWhatsApp}
                disabled={!selected}
              >
                <span style={{ fontSize: 28 }}>💬</span>
                <div>
                  <div style={s.btnTitle}>Message on WhatsApp</div>
                  <div style={s.btnSub}>Opens WhatsApp with your reason pre-filled</div>
                </div>
              </button>

              <button
                style={{ ...s.actionBtn, ...s.callBtn, opacity: !selected ? 0.5 : 1 }}
                onClick={handleCall}
                disabled={!selected}
              >
                <span style={{ fontSize: 28 }}>📞</span>
                <div>
                  <div style={s.btnTitle}>Call Owner</div>
                  <div style={s.btnSub}>Direct call to the vehicle owner</div>
                </div>
              </button>

              <button style={{ ...s.actionBtn, ...s.emergencyBtn }} onClick={handleCall}>
                <span style={{ fontSize: 28 }}>🚨</span>
                <div>
                  <div style={s.btnTitle}>Emergency</div>
                  <div style={s.btnSub}>Accident or urgent help needed</div>
                </div>
              </button>
            </div>

            <div style={s.noteCard}>
              <p style={{ margin: 0, fontSize: 13, color: "#555", lineHeight: 1.5 }}>
                💬 {OWNER.note}
              </p>
            </div>
          </>
        ) : (
          <div style={{ ...s.card, textAlign: "center", padding: "32px 20px" }}>
            <div style={{ fontSize: 52, marginBottom: 12 }}>✅</div>
            <h2 style={{ fontSize: 22, fontWeight: 800, margin: "0 0 8px", color: "#0A1628" }}>
              Message Ready!
            </h2>
            <p style={{ color: "#555", fontSize: 14, lineHeight: 1.6, margin: 0 }}>
              WhatsApp opened with your message. The owner will be notified.
            </p>
            <button
              style={{ ...s.actionBtn, ...s.callBtn, marginTop: 20 }}
              onClick={handleCall}
            >
              <span style={{ fontSize: 28 }}>📞</span>
              <div>
                <div style={s.btnTitle}>Also Call Owner</div>
                <div style={s.btnSub}>If it's urgent</div>
              </div>
            </button>
            <button
              style={{ background: "none", border: "none", color: "#8899AA", fontSize: 14, cursor: "pointer", padding: "12px 0", marginTop: 4 }}
              onClick={() => { setSent(false); setSelected(null); setCustom(""); }}
            >
              ← Back
            </button>
          </div>
        )}
      </main>

      <footer style={s.footer}>Powered by VehicleTag · India 🇮🇳</footer>
    </div>
  );
}

const s = {
  root: { minHeight: "100vh", background: "#F0F2F5", fontFamily: "'Segoe UI', system-ui, sans-serif", color: "#0A1628", display: "flex", flexDirection: "column" },
  header: { background: "#0A1628", padding: "14px 20px", boxShadow: "0 2px 8px rgba(0,0,0,0.3)" },
  headerInner: { maxWidth: 480, margin: "0 auto", display: "flex", alignItems: "center", gap: 10 },
  logo: { color: "#F5A623", fontWeight: 800, fontSize: 20, letterSpacing: "-0.5px" },
  headerSub: { color: "#8899AA", fontSize: 13, marginLeft: "auto" },
  main: { flex: 1, maxWidth: 480, width: "100%", margin: "0 auto", padding: "20px 16px 32px", display: "flex", flexDirection: "column", gap: 20, boxSizing: "border-box" },
  card: { background: "#fff", borderRadius: 16, padding: "24px 20px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", textAlign: "center" },
  plateLabel: { fontSize: 11, fontWeight: 700, letterSpacing: "1.5px", color: "#8899AA", textTransform: "uppercase", margin: "0 0 16px" },
  plate: { display: "inline-block", border: "3px solid #1a1a1a", borderRadius: 8, overflow: "hidden", minWidth: 240, boxShadow: "0 3px 10px rgba(0,0,0,0.2)", margin: "0 auto 12px" },
  plateBlueBand: { background: "#003087", display: "flex", alignItems: "center", justifyContent: "center", padding: "4px 10px", position: "relative", minHeight: 24 },
  plateFlag: { width: 18, height: 14, borderRadius: 2, overflow: "hidden", position: "absolute", left: 8 },
  plateIND: { color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: 2 },
  plateAshok: { color: "#fff", fontSize: 14, position: "absolute", right: 8 },
  plateLower: { background: "#FFFDE7", padding: "8px 16px" },
  plateText: { fontSize: 26, fontWeight: 900, letterSpacing: "3px", color: "#0A0A0A", fontFamily: "monospace" },
  plateCity: { fontSize: 13, color: "#8899AA", margin: 0 },
  sectionTitle: { fontWeight: 700, fontSize: 15, margin: "0 0 14px", color: "#0A1628", textAlign: "left" },
  reasonGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 },
  reasonBtn: { display: "flex", flexDirection: "column", alignItems: "center", gap: 6, padding: "14px 10px", border: "2px solid #E5E9EF", borderRadius: 12, background: "#F8F9FA", cursor: "pointer", transition: "all 0.15s" },
  reasonBtnActive: { border: "2px solid #F5A623", background: "#FFF8EC", boxShadow: "0 0 0 3px rgba(245,166,35,0.15)" },
  reasonText: { fontSize: 12, fontWeight: 600, color: "#0A1628", textAlign: "center" },
  textarea: { marginTop: 12, width: "100%", padding: "10px 12px", borderRadius: 10, border: "2px solid #E5E9EF", fontSize: 14, resize: "none", fontFamily: "inherit", boxSizing: "border-box", outline: "none" },
  actions: { display: "flex", flexDirection: "column", gap: 12 },
  actionBtn: { display: "flex", alignItems: "center", gap: 14, padding: "16px 18px", borderRadius: 14, border: "none", cursor: "pointer", textAlign: "left", boxShadow: "0 3px 10px rgba(0,0,0,0.12)", width: "100%", boxSizing: "border-box" },
  waBtn: { background: "#25D366", color: "#fff" },
  callBtn: { background: "#0A1628", color: "#fff" },
  emergencyBtn: { background: "#E53935", color: "#fff" },
  btnTitle: { fontWeight: 700, fontSize: 15 },
  btnSub: { fontSize: 12, opacity: 0.8, marginTop: 2 },
  noteCard: { background: "#fff", borderRadius: 12, padding: "14px 16px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" },
  footer: { textAlign: "center", padding: "16px", fontSize: 12, background: "#0A1628", color: "#8899AA" },
};
