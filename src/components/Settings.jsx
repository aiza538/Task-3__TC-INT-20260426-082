import React from 'react';
import { Settings, Wifi, WifiOff, HardDrive, RefreshCw, CheckCircle, TrendingUp } from 'lucide-react';

const SettingsComponent = ({ isOnline, jobs, pendingCount }) => {
  const completedCount = jobs.filter(j => j.synced === 1).length;
  const syncRate = jobs.length ? Math.round((completedCount / jobs.length) * 100) : 0;

  return (
    <div style={{ padding: "32px 28px", minHeight: "calc(100vh - 70px)", display: "flex", flexDirection: "column" }}>
      
      <div style={{ flex: 1 }}>
        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #3b82f6 100%)",
          borderRadius: "28px",
          padding: "32px 36px",
          marginBottom: "32px"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
            <Settings size={28} color="white" />
            <h2 style={{ fontSize: "28px", fontWeight: "800", color: "white" }}>Settings</h2>
          </div>
          <p style={{ color: "rgba(255,255,255,0.9)" }}>Configure your application and view system information</p>
        </div>

        {/* Stats Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
          marginBottom: "32px"
        }}>
          <div style={{ background: "white", borderRadius: "20px", padding: "20px", border: "1px solid rgba(59,130,246,0.1)" }}>
            <HardDrive size={24} color="#3b82f6" />
            <p style={{ fontSize: "12px", color: "#64748b", marginTop: "8px" }}>Total Jobs</p>
            <h3 style={{ fontSize: "28px", fontWeight: "700" }}>{jobs.length}</h3>
          </div>
          <div style={{ background: "white", borderRadius: "20px", padding: "20px", border: "1px solid rgba(59,130,246,0.1)" }}>
            <RefreshCw size={24} color="#f59e0b" />
            <p style={{ fontSize: "12px", color: "#64748b", marginTop: "8px" }}>Pending Sync</p>
            <h3 style={{ fontSize: "28px", fontWeight: "700", color: "#f59e0b" }}>{pendingCount}</h3>
          </div>
          <div style={{ background: "white", borderRadius: "20px", padding: "20px", border: "1px solid rgba(59,130,246,0.1)" }}>
            <CheckCircle size={24} color="#10b981" />
            <p style={{ fontSize: "12px", color: "#64748b", marginTop: "8px" }}>Completed</p>
            <h3 style={{ fontSize: "28px", fontWeight: "700", color: "#10b981" }}>{completedCount}</h3>
          </div>
          <div style={{ background: "white", borderRadius: "20px", padding: "20px", border: "1px solid rgba(59,130,246,0.1)" }}>
            <TrendingUp size={24} color="#8b5cf6" />
            <p style={{ fontSize: "12px", color: "#64748b", marginTop: "8px" }}>Sync Rate</p>
            <h3 style={{ fontSize: "28px", fontWeight: "700", color: "#8b5cf6" }}>{syncRate}%</h3>
          </div>
        </div>

        {/* Status Card */}
        <div style={{
          background: "white",
          borderRadius: "20px",
          padding: "24px",
          marginBottom: "32px",
          border: "1px solid rgba(59,130,246,0.1)"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
            <div style={{
              width: "50px",
              height: "50px",
              background: isOnline ? "#d1fae5" : "#fee2e2",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              {isOnline ? <Wifi size={24} color="#10b981" /> : <WifiOff size={24} color="#ef4444" />}
            </div>
            <div>
              <h3 style={{ fontWeight: "bold" }}>System Status</h3>
              <p style={{ color: isOnline ? "#10b981" : "#ef4444" }}>
                {isOnline ? "✅ All systems operational" : "❌ Offline - Working with local data"}
              </p>
            </div>
          </div>
          <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", borderTop: "1px solid #e2e8f0", paddingTop: "16px" }}>
            <div><p style={{ fontSize: "11px", color: "#64748b" }}>Uptime</p><p style={{ fontWeight: "bold" }}>99.9%</p></div>
            <div><p style={{ fontSize: "11px", color: "#64748b" }}>Version</p><p style={{ fontWeight: "bold" }}>2.0.0</p></div>
            <div><p style={{ fontSize: "11px", color: "#64748b" }}>Build</p><p style={{ fontWeight: "bold" }}>Production</p></div>
          </div>
        </div>
      </div>

      {/* Footer - Full Width at Bottom */}
      <div style={{
        background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #3b82f6 100%)",
        borderRadius: "0px",
        padding: "20px 24px",
        textAlign: "center",
        marginLeft: "-28px",
        marginRight: "-28px",
        width: "calc(100% + 56px)",
        marginBottom: "-32px"
      }}>
        <p style={{ fontSize: "12px", color: "white", opacity: 0.9 }}>
          FieldOps Pro PWA v2.0.0 | Enterprise Field Operations Management<br/>
          Offline-First Progressive Web App
        </p>
      </div>
    </div>
  );
};

export default SettingsComponent;