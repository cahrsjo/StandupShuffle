import React from "react";

export default function EmptyState() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        height: "60vh",
      }}
    >
      <h1>🧍‍♀️ Standup Shuffle V2 🧍‍♂️</h1>
      <div style={{ lineHeight: "2em", marginBottom: "2em" }}>
        <div>You haven't added any participants yet.</div>
        <div>Please add them in the input below, then hit Shuffle!</div>
        <div>Don't worry, they will be saved for next time.</div>
      </div>
    </div>
  );
}
