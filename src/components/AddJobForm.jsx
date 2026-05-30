import React, { useState } from 'react';
import { MapPin, Rocket, Briefcase } from 'lucide-react';

const AddJobForm = ({ jobTitle, setJobTitle, jobLocation, setJobLocation, jobPriority, setJobPriority, jobDesc, setJobDesc, saveJob, setCurrentPage }) => {
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [description, setDescription] = useState('');

  const handleDescChange = (e) => {
    setDescription(e.target.value);
    setJobDesc(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await saveJob(e);
    setIsSubmitting(false);
  };

  const priorityOptions = [
    { value: "high", label: "High Priority", icon: "🔥", color: "#dc2626", bg: "#fee2e2" },
    { value: "medium", label: "Medium Priority", icon: "🟡", color: "#d97706", bg: "#fef3c7" },
    { value: "low", label: "Low Priority", icon: "🟢", color: "#10b981", bg: "#d1fae5" }
  ];

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
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Briefcase size={28} color="white" />
            <h2 style={{ fontSize: "28px", fontWeight: "800", color: "white" }}>Create New Job</h2>
          </div>
        </div>

        {/* Form */}
        <div style={{
          background: "white",
          borderRadius: "24px",
          padding: "36px",
          border: "1px solid rgba(59,130,246,0.1)",
          marginBottom: "32px"
        }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "24px" }}>
              <label style={{ fontWeight: "600", fontSize: "14px", display: "block", marginBottom: "8px" }}>Job Title <span style={{ color: "#ef4444" }}>*</span></label>
              <input type="text" value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} placeholder="e.g., HVAC Repair - Downtown Office" style={{ width: "100%", padding: "14px", border: `2px solid ${focusedField === "title" ? "#3b82f6" : "#e2e8f0"}`, borderRadius: "12px", fontSize: "14px", outline: "none" }} onFocus={() => setFocusedField("title")} onBlur={() => setFocusedField(null)} required />
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label style={{ fontWeight: "600", fontSize: "14px", display: "block", marginBottom: "8px" }}>Location</label>
              <div style={{ position: "relative" }}>
                <MapPin size={16} style={{ position: "absolute", left: "12px", top: "14px", color: "#94a3b8" }} />
                <input type="text" value={jobLocation} onChange={(e) => setJobLocation(e.target.value)} placeholder="Street, City, ZIP code" style={{ width: "100%", padding: "12px 12px 12px 36px", border: `2px solid ${focusedField === "location" ? "#3b82f6" : "#e2e8f0"}`, borderRadius: "12px", fontSize: "14px", outline: "none" }} onFocus={() => setFocusedField("location")} onBlur={() => setFocusedField(null)} />
              </div>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label style={{ fontWeight: "600", fontSize: "14px", display: "block", marginBottom: "8px" }}>Priority Level</label>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px" }}>
                {priorityOptions.map(opt => (
                  <button key={opt.value} type="button" onClick={() => setJobPriority(opt.value)} className="btn-hover" style={{ padding: "10px", background: jobPriority === opt.value ? opt.bg : "white", border: jobPriority === opt.value ? `2px solid ${opt.color}` : "1px solid #e2e8f0", borderRadius: "10px", cursor: "pointer", textAlign: "center", fontWeight: jobPriority === opt.value ? "600" : "400", color: jobPriority === opt.value ? opt.color : "#64748b" }}>
                    <span style={{ marginRight: "6px" }}>{opt.icon}</span> {opt.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: "24px" }}>
              <label style={{ fontWeight: "600", fontSize: "14px", display: "block", marginBottom: "8px" }}>Description</label>
              <textarea value={description} onChange={handleDescChange} rows="5" placeholder="Type your job description here..." style={{ width: "100%", padding: "14px", border: "2px solid #e2e8f0", borderRadius: "12px", fontSize: "14px", fontFamily: "inherit", resize: "vertical", outline: "none", backgroundColor: "white" }} />
            </div>

            <div style={{ display: "flex", gap: "12px" }}>
              <button type="submit" disabled={isSubmitting} className="btn-hover" style={{ flex: 1, padding: "12px", background: "linear-gradient(135deg, #1e40af, #3b82f6)", color: "white", border: "none", borderRadius: "40px", fontSize: "14px", fontWeight: "600", cursor: "pointer" }}>
                <Rocket size={16} style={{ marginRight: "8px" }} /> {isSubmitting ? "Creating..." : "Create Job"}
              </button>
              <button type="button" onClick={() => setCurrentPage("dashboard")} className="btn-hover" style={{ flex: 1, padding: "12px", background: "#f1f5f9", color: "#64748b", border: "none", borderRadius: "40px", cursor: "pointer" }}>Cancel</button>
            </div>
          </form>
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

export default AddJobForm;