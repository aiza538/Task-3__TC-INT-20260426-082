import React from 'react';
import { WifiOff, Cloud } from 'lucide-react';

const OfflineAlert = ({ isOnline, pendingCount }) => {
  if (isOnline) return null;

  return (
    <div style={{
      background: "#fef2f2",
      borderBottom: "1px solid #fee2e2",
      padding: "10px 24px",
      textAlign: "center",
      transition: "all 0.3s"
    }}
    onMouseEnter={(e) => e.currentTarget.style.background = "#fee2e2"}
    onMouseLeave={(e) => e.currentTarget.style.background = "#fef2f2"}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
        <WifiOff size={16} color="#dc2626" style={{ animation: "pulse 2s infinite" }} />
        <span style={{ fontSize: "13px", color: "#991b1b" }}>
          ⚠️ You are offline. Working with local data.
        </span>
        {pendingCount > 0 && (
          <span style={{
            background: "#fef3c7",
            color: "#d97706",
            padding: "2px 10px",
            borderRadius: "20px",
            fontSize: "11px",
            display: "flex",
            alignItems: "center",
            gap: "4px",
            transition: "all 0.3s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.05)";
            e.currentTarget.style.background = "#fde68a";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.background = "#fef3c7";
          }}>
            <Cloud size={12} />
            {pendingCount} jobs pending sync
          </span>
        )}
      </div>
    </div>
  );
};

export default OfflineAlert;