import React, { useState } from 'react';
import { 
  LayoutDashboard, ClipboardList, PlusCircle, Settings, 
  Wifi, WifiOff, RefreshCw, User, Menu, X 
} from 'lucide-react';

const Navbar = ({ currentPage, setCurrentPage, isOnline, isSyncing, handleManualSync, pendingCount }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: "dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "jobs", icon: ClipboardList, label: "Jobs" },
    { id: "add", icon: PlusCircle, label: "New Job" },
    { id: "settings", icon: Settings, label: "Settings" }
  ];

  return (
    <nav style={{
      background: "linear-gradient(135deg, #1e3a8a 0%, #2563eb 50%, #3b82f6 100%)",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      position: "sticky",
      top: 0,
      zIndex: 1000,
      width: "100%"
    }}>
      <div style={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "0 32px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "70px",
        width: "100%"
      }}>
        
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }}>
          <div style={{
            width: "42px",
            height: "42px",
            background: "rgba(255,255,255,0.2)",
            borderRadius: "14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}>
            <span style={{ fontSize: "22px" }}>🔧</span>
          </div>
          <div>
            <h1 style={{ fontSize: "20px", fontWeight: "800", color: "white" }}>FieldOps Pro</h1>
            <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.8)" }}>Enterprise PWA Platform</p>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div style={{
          display: "flex",
          gap: "8px",
          background: "rgba(255,255,255,0.15)",
          padding: "6px",
          borderRadius: "60px"
        }}
        className="desktop-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                padding: "8px 24px",
                background: currentPage === item.id ? "white" : "transparent",
                border: "none",
                borderRadius: "40px",
                color: currentPage === item.id ? "#1e3a8a" : "white",
                cursor: "pointer",
                fontSize: "14px",
                fontWeight: currentPage === item.id ? "600" : "500",
                transition: "all 0.3s ease"
              }}
              onMouseEnter={(e) => {
                if (currentPage !== item.id) {
                  e.currentTarget.style.background = "rgba(255,255,255,0.25)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== item.id) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.transform = "translateY(0)";
                }
              }}
            >
              <item.icon size={16} />
              {item.label}
              {item.id === "jobs" && pendingCount > 0 && (
                <span style={{
                  background: "#ef4444",
                  color: "white",
                  fontSize: "10px",
                  padding: "2px 8px",
                  borderRadius: "20px",
                  marginLeft: "6px"
                }}>
                  {pendingCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Desktop Right Section */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }} className="desktop-right">
          <button
            onClick={handleManualSync}
            disabled={isSyncing || !isOnline}
            className="btn-hover"
            style={{
              background: "white",
              color: "#1e3a8a",
              padding: "8px 20px",
              borderRadius: "40px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "13px",
              fontWeight: "600",
              border: "none",
              cursor: isSyncing || !isOnline ? "not-allowed" : "pointer",
              opacity: isSyncing || !isOnline ? 0.6 : 1,
              transition: "all 0.3s ease"
            }}
          >
            <RefreshCw size={14} className={isSyncing ? "spin" : ""} />
            {isSyncing ? "Syncing..." : "Sync Now"}
          </button>
          
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(255,255,255,0.2)",
            padding: "6px 16px",
            borderRadius: "40px"
          }}>
            <div style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: isOnline ? "#10b981" : "#ef4444"
            }} />
            <span style={{ fontSize: "12px", fontWeight: "600", color: "white" }}>
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>

          <div style={{
            width: "38px",
            height: "38px",
            background: "rgba(255,255,255,0.2)",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.4)";
            e.currentTarget.style.transform = "scale(1.05)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.2)";
            e.currentTarget.style.transform = "scale(1)";
          }}>
            <User size={18} color="white" />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="mobile-menu-btn"
          style={{
            display: "none",
            background: "rgba(255,255,255,0.2)",
            border: "none",
            borderRadius: "10px",
            padding: "8px 12px",
            cursor: "pointer",
            color: "white"
          }}
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="mobile-menu" style={{
          display: "none",
          background: "#1e3a8a",
          padding: "16px",
          flexDirection: "column",
          gap: "10px",
          width: "100%"
        }}>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setCurrentPage(item.id);
                setIsMobileMenuOpen(false);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 16px",
                background: currentPage === item.id ? "rgba(255,255,255,0.2)" : "transparent",
                border: "none",
                borderRadius: "12px",
                color: "white",
                cursor: "pointer",
                width: "100%",
                textAlign: "left"
              }}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
          <button
            onClick={handleManualSync}
            style={{
              background: "white",
              color: "#1e3a8a",
              padding: "12px",
              borderRadius: "40px",
              border: "none",
              width: "100%",
              fontWeight: "600",
              cursor: "pointer",
              marginTop: "8px"
            }}
          >
            <RefreshCw size={14} className={isSyncing ? "spin" : ""} style={{ display: "inline", marginRight: "8px" }} />
            Sync Now
          </button>
        </div>
      )}

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin { animation: spin 1s linear infinite; }
        
        @media (max-width: 768px) {
          .desktop-nav, .desktop-right {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
          .mobile-menu {
            display: flex !important;
          }
          nav > div {
            padding: 12px 16px !important;
            height: auto !important;
          }
        }
        
        @media (min-width: 769px) {
          .mobile-menu-btn, .mobile-menu {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;