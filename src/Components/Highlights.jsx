import React from "react";

function Highlights({ stats }) {
  return (
    <div className="highlight-container">
      <h2 className="status-style">{stats.title}</h2>
      <div style={{ marginTop: "0.5rem" }}>
        <span style={{ fontSize: "2.25rem", margin: "0.5rem" }}>
          {stats.value}
        </span>
        <span style={{ fontSize: "1.5rem" }}>{stats.unit}</span>
      </div>
    </div>
  );
}

export default Highlights;
