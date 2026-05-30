import React, { useState } from 'react';
import { Briefcase, PlusCircle, MapPin, Calendar, CheckCircle, Trash2, Clock, FileText, Search, Grid3x3, List } from 'lucide-react';

const JobsList = ({ jobs, setCurrentPage, deleteJob }) => {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  const filteredJobs = jobs.filter(job => {
    if (filter === "pending") return job.synced === 0;
    if (filter === "synced") return job.synced === 1;
    return true;
  }).filter(job => job.title.toLowerCase().includes(search.toLowerCase()) || (job.location && job.location.toLowerCase().includes(search.toLowerCase())));

  const tabs = [
    { id: "all", label: "All Jobs", count: jobs.length, icon: Briefcase, color: "#3b82f6" },
    { id: "pending", label: "Pending", count: jobs.filter(j => j.synced === 0).length, icon: Clock, color: "#f59e0b" },
    { id: "synced", label: "Synced", count: jobs.filter(j => j.synced === 1).length, icon: CheckCircle, color: "#10b981" }
  ];

  return (
    <div style={{ padding: "32px 28px", minHeight: "calc(100vh - 70px)", display: "flex", flexDirection: "column" }}>
      
      <div style={{ flex: 1 }}>
        {/* Header */}
        <div style={{ background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #3b82f6 100%)", borderRadius: "28px", padding: "32px 36px", marginBottom: "32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "20px" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                <Briefcase size={28} color="white" />
                <h2 style={{ fontSize: "28px", fontWeight: "800", color: "white" }}>Job Management</h2>
              </div>
              <p style={{ color: "rgba(255,255,255,0.9)" }}>Manage and track all your field jobs</p>
            </div>
            <button onClick={() => setCurrentPage("add")} className="btn-hover" style={{ background: "white", color: "#1e3a8a", padding: "12px 28px", borderRadius: "40px", display: "flex", alignItems: "center", gap: "8px", border: "none", cursor: "pointer", fontWeight: "600" }}>
              <PlusCircle size={16} /> Create New Job
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div style={{ background: "white", borderRadius: "20px", padding: "20px", marginBottom: "28px", border: "1px solid rgba(59,130,246,0.1)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", marginBottom: "20px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", flex: 1, maxWidth: "400px" }}>
              <Search size={18} color="#94a3b8" />
              <input type="text" placeholder="Search jobs by title or location..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ border: "none", outline: "none", fontSize: "14px", width: "100%", padding: "8px 0", background: "transparent" }} />
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <div style={{ display: "flex", gap: "4px", background: "#f1f5f9", padding: "4px", borderRadius: "12px" }}>
                <button onClick={() => setViewMode("grid")} style={{ padding: "8px 12px", background: viewMode === "grid" ? "white" : "transparent", border: "none", borderRadius: "8px", cursor: "pointer", boxShadow: viewMode === "grid" ? "0 2px 6px rgba(0,0,0,0.08)" : "none" }}>
                  <Grid3x3 size={16} color={viewMode === "grid" ? "#3b82f6" : "#64748b"} />
                </button>
                <button onClick={() => setViewMode("list")} style={{ padding: "8px 12px", background: viewMode === "list" ? "white" : "transparent", border: "none", borderRadius: "8px", cursor: "pointer", boxShadow: viewMode === "list" ? "0 2px 6px rgba(0,0,0,0.08)" : "none" }}>
                  <List size={16} color={viewMode === "list" ? "#3b82f6" : "#64748b"} />
                </button>
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            {tabs.map((tab) => (
              <button key={tab.id} onClick={() => setFilter(tab.id)} style={{ display: "flex", alignItems: "center", gap: "8px", background: filter === tab.id ? `linear-gradient(135deg, ${tab.color}, ${tab.color}80)` : "transparent", border: "none", padding: "8px 20px", borderRadius: "40px", color: filter === tab.id ? "white" : "#64748b", cursor: "pointer", fontSize: "13px", fontWeight: filter === tab.id ? "600" : "500", boxShadow: filter === tab.id ? `0 4px 12px ${tab.color}40` : "none" }}>
                <tab.icon size={14} /> {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Jobs Display */}
        {filteredJobs.length === 0 ? (
          <div style={{
            textAlign: "center",
            padding: "40px 20px",
            background: "white",
            borderRadius: "20px",
            border: "1px solid rgba(59,130,246,0.1)",
            marginBottom: "32px"
          }}>
            <FileText size={40} color="#cbd5e1" />
            <h3 style={{ marginTop: "8px", fontSize: "16px", fontWeight: "600" }}>No jobs found</h3>
            <p style={{ color: "#64748b", marginBottom: "12px", fontSize: "13px" }}>Create your first job to get started</p>
            <button
              onClick={() => setCurrentPage("add")}
              className="btn-hover"
              style={{
                marginTop: "0px",
                background: "#3b82f6",
                color: "white",
                border: "none",
                padding: "8px 20px",
                borderRadius: "30px",
                cursor: "pointer",
                fontSize: "13px"
              }}
            >
              + Create Job
            </button>
          </div>
        ) : viewMode === "grid" ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))", gap: "20px", marginBottom: "32px" }}>
            {filteredJobs.map((job) => (
              <div key={job.id} style={{ background: "white", borderRadius: "16px", padding: "20px", border: "1px solid rgba(59,130,246,0.1)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "12px" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap", marginBottom: "8px" }}>
                      <h3 style={{ fontSize: "16px", fontWeight: "700", color: "#0f172a" }}>{job.title}</h3>
                      <span style={{ fontSize: "10px", background: job.priority === "high" ? "#fee2e2" : job.priority === "medium" ? "#fef3c7" : "#d1fae5", color: job.priority === "high" ? "#dc2626" : job.priority === "medium" ? "#d97706" : "#10b981", padding: "3px 12px", borderRadius: "30px", fontWeight: "600" }}>{job.priority === "high" ? "🔥 High" : job.priority === "medium" ? "🟡 Medium" : "🟢 Low"}</span>
                    </div>
                    {job.location && <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "8px" }}><MapPin size={12} color="#94a3b8" /><span style={{ fontSize: "12px", color: "#64748b" }}>{job.location}</span></div>}
                    {job.description && <p style={{ fontSize: "13px", color: "#475569", lineHeight: "1.5", marginBottom: "12px", background: "#f8fafc", padding: "10px", borderRadius: "10px", borderLeft: "3px solid #3b82f6" }}>📝 {job.description}</p>}
                  </div>
                  <button onClick={() => deleteJob(job.id, job.title)} style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", padding: "6px", borderRadius: "8px" }} onMouseEnter={(e) => { e.currentTarget.style.background = "#fee2e2"; e.currentTarget.style.color = "#ef4444"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = "#94a3b8"; }}><Trash2 size={16} /></button>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "12px", paddingTop: "12px", borderTop: "1px solid #f1f5f9" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}><Calendar size={12} color="#94a3b8" /><span style={{ fontSize: "11px", color: "#94a3b8" }}>{new Date(job.createdAt).toLocaleDateString()}</span></div>
                  {job.synced === 0 ? <span style={{ background: "#fef3c7", color: "#d97706", padding: "4px 12px", borderRadius: "30px", fontSize: "10px", fontWeight: "600", display: "flex", alignItems: "center", gap: "4px" }}><Clock size={10} /> Pending</span> : <span style={{ background: "#d1fae5", color: "#059669", padding: "4px 12px", borderRadius: "30px", fontSize: "10px", fontWeight: "600", display: "flex", alignItems: "center", gap: "4px" }}><CheckCircle size={10} /> Synced</span>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "32px" }}>
            {filteredJobs.map((job) => (
              <div key={job.id} style={{ background: "white", borderRadius: "12px", padding: "16px", border: "1px solid rgba(59,130,246,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap", flex: 1 }}>
                  <div style={{ width: "8px", height: "40px", background: job.priority === "high" ? "#dc2626" : job.priority === "medium" ? "#f59e0b" : "#10b981", borderRadius: "4px" }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px", flexWrap: "wrap" }}>
                      <h4 style={{ fontWeight: "600", fontSize: "14px", color: "#0f172a" }}>{job.title}</h4>
                      <span style={{ fontSize: "10px", background: job.priority === "high" ? "#fee2e2" : job.priority === "medium" ? "#fef3c7" : "#d1fae5", color: job.priority === "high" ? "#dc2626" : job.priority === "medium" ? "#d97706" : "#10b981", padding: "2px 10px", borderRadius: "20px" }}>{job.priority}</span>
                    </div>
                    {job.location && <p style={{ fontSize: "11px", color: "#64748b" }}>📍 {job.location}</p>}
                    {job.description && <p style={{ fontSize: "12px", color: "#475569", marginTop: "6px", maxWidth: "400px" }}>📝 {job.description.length > 80 ? job.description.substring(0, 80) + "..." : job.description}</p>}
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "4px" }}><Calendar size={11} color="#94a3b8" /><span style={{ fontSize: "10px", color: "#94a3b8" }}>{new Date(job.createdAt).toLocaleDateString()}</span></div>
                  {job.synced === 0 ? <span style={{ background: "#fef3c7", color: "#d97706", padding: "4px 10px", borderRadius: "20px", fontSize: "10px", fontWeight: "500" }}>Pending</span> : <CheckCircle size={14} color="#10b981" />}
                  <button onClick={() => deleteJob(job.id, job.title)} style={{ background: "none", border: "none", color: "#94a3b8", cursor: "pointer", padding: "6px" }} onMouseEnter={(e) => e.currentTarget.style.color = "#ef4444"} onMouseLeave={(e) => e.currentTarget.style.color = "#94a3b8"}><Trash2 size={14} /></button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
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

export default JobsList;