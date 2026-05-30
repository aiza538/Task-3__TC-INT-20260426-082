import React from 'react';
import { Briefcase, Clock, CheckCircle, MapPin, FileText, ArrowRight, Rocket, TrendingUp } from 'lucide-react';

const Dashboard = ({ jobs, pendingCount, completedCount, setCurrentPage }) => {
  const stats = [
    { label: "Total Jobs", value: jobs.length, icon: Briefcase, color: "#3b82f6", bg: "#dbeafe" },
    { label: "Pending Sync", value: pendingCount, icon: Clock, color: "#f59e0b", bg: "#fef3c7" },
    { label: "Completed", value: completedCount, icon: CheckCircle, color: "#10b981", bg: "#d1fae5" },
    { label: "Efficiency", value: jobs.length ? Math.round((completedCount / jobs.length) * 100) : 0, icon: TrendingUp, color: "#8b5cf6", bg: "#ede9fe", suffix: "%" }
  ];

  return (
    <div style={{ padding: "32px 28px", minHeight: "calc(100vh - 70px)", display: "flex", flexDirection: "column" }}>
      
      <div style={{ flex: 1 }}>
        {/* Hero Section */}
        <div style={{
          background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #3b82f6 100%)",
          borderRadius: "28px",
          padding: "40px 40px",
          marginBottom: "32px"
        }}>
          <h2 style={{ fontSize: "32px", fontWeight: "800", marginBottom: "12px", color: "white" }}>Welcome Back! 👋</h2>
          <p style={{ fontSize: "15px", opacity: 0.9, maxWidth: "550px", color: "white", marginBottom: "24px" }}>
            Manage your field operations efficiently with our enterprise-grade offline-first technology platform.
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <button onClick={() => setCurrentPage("add")} className="btn-hover" style={{ background: "white", color: "#1e3a8a", padding: "12px 28px", borderRadius: "40px", border: "none", fontWeight: "600", cursor: "pointer" }}>
              <Rocket size={16} style={{ marginRight: "8px" }} /> Create New Job <ArrowRight size={14} style={{ marginLeft: "8px" }} />
            </button>
            <button onClick={() => setCurrentPage("jobs")} className="btn-hover" style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "1px solid rgba(255,255,255,0.3)", padding: "12px 28px", borderRadius: "40px", cursor: "pointer" }}>
              View All Jobs
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "32px" }}>
          {stats.map((stat, idx) => (
            <div key={idx} style={{ background: "white", borderRadius: "20px", padding: "24px", border: "1px solid rgba(59,130,246,0.1)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                <div style={{ width: "48px", height: "48px", background: stat.bg, borderRadius: "14px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <stat.icon size={24} color={stat.color} />
                </div>
              </div>
              <p style={{ fontSize: "12px", color: "#64748b", marginBottom: "4px" }}>{stat.label}</p>
              <h3 style={{ fontSize: "32px", fontWeight: "700", color: "#0f172a" }}>{stat.value}{stat.suffix || ""}</h3>
              <div style={{ height: "3px", background: `linear-gradient(90deg, ${stat.color}, ${stat.color}40)`, borderRadius: "2px", marginTop: "12px", width: `${Math.min(stat.value, 100)}%` }} />
            </div>
          ))}
        </div>

        {/* Recent Jobs */}
        <div style={{ background: "white", borderRadius: "20px", border: "1px solid rgba(59,130,246,0.1)", overflow: "hidden", marginBottom: "32px" }}>
          <div style={{ padding: "20px 24px", borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a" }}>Recent Jobs</h3>
            <button onClick={() => setCurrentPage("jobs")} className="btn-hover" style={{ background: "#3b82f6", color: "white", padding: "8px 20px", borderRadius: "30px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: "500" }}>View All →</button>
          </div>
          <div style={{ padding: "0 24px" }}>
            {jobs.slice(0, 4).map((job, idx) => (
              <div key={job.id} style={{ padding: "16px 0", borderBottom: idx < 3 ? "1px solid #f1f5f9" : "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    <h4 style={{ fontWeight: "600", fontSize: "14px" }}>{job.title}</h4>
                    <span style={{ fontSize: "10px", background: job.priority === "high" ? "#fee2e2" : job.priority === "medium" ? "#fef3c7" : "#d1fae5", color: job.priority === "high" ? "#dc2626" : job.priority === "medium" ? "#d97706" : "#10b981", padding: "2px 10px", borderRadius: "20px" }}>{job.priority}</span>
                  </div>
                  {job.location && <div style={{ display: "flex", alignItems: "center", gap: "4px" }}><MapPin size={10} color="#94a3b8" /><span style={{ fontSize: "11px", color: "#64748b" }}>{job.location}</span></div>}
                </div>
                {job.synced === 0 ? <span style={{ fontSize: "10px", background: "#fef3c7", padding: "4px 10px", borderRadius: "20px", color: "#d97706" }}>Pending</span> : <CheckCircle size={14} color="#10b981" />}
              </div>
            ))}
            {jobs.length === 0 && (
              <div style={{ textAlign: "center", padding: "40px" }}>
                <FileText size={40} color="#cbd5e1" />
                <p style={{ marginTop: "8px", color: "#64748b" }}>No jobs created yet</p>
                <button onClick={() => setCurrentPage("add")} className="btn-hover" style={{ marginTop: "12px", background: "#3b82f6", color: "white", border: "none", padding: "8px 20px", borderRadius: "30px", cursor: "pointer" }}>+ Create Job</button>
              </div>
            )}
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

export default Dashboard;