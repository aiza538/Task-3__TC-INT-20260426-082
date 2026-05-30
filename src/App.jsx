import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { db } from "./db/database";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import JobsList from "./components/JobsList";
import AddJobForm from "./components/AddJobForm";
import Settings from "./components/Settings";
import OfflineAlert from "./components/OfflineAlert";

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [jobs, setJobs] = useState([]);
  const [jobTitle, setJobTitle] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobPriority, setJobPriority] = useState("medium");
  const [isSyncing, setIsSyncing] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [animationKey, setAnimationKey] = useState(0);

  const loadJobs = async () => {
    const allJobs = await db.getAllJobs();
    setJobs(allJobs.reverse());
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setAnimationKey(prev => prev + 1);
  };

  useEffect(() => {
    loadJobs();
    const handleOnline = () => { setIsOnline(true); toast.success("Online! Syncing..."); syncPendingJobs(); };
    const handleOffline = () => { setIsOnline(false); toast.error("Offline mode"); };
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const syncPendingJobs = async () => {
    if (!isOnline) {
      toast.error("Cannot sync offline. Connect to internet.");
      return;
    }
    
    setIsSyncing(true);
    const pendingJobs = await db.getPendingJobs();
    
    // Case 1: No jobs at all
    if (jobs.length === 0) {
      toast("No jobs to sync", {
        icon: '⚠️',
        style: { background: "#f1f5f9", color: "#dc2626" }
      });
      setIsSyncing(false);
      return;
    }
    
    // Case 2: No pending jobs (all already synced)
    if (pendingJobs.length === 0) {
      toast("All jobs already synced!", {
        icon: '✅',
        style: { background: "#10b981", color: "white" }
      });
      setIsSyncing(false);
      return;
    }

    // Case 3: There are pending jobs to sync
    toast.loading(`Syncing ${pendingJobs.length} jobs...`, { id: "sync" });

    let syncedCount = 0;
    for (const job of pendingJobs) {
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: job.title,
            body: job.description,
            location: job.location,
            priority: job.priority
          })
        });

        if (response.ok) {
          await db.markJobSynced(job.id);
          syncedCount++;
        }
      } catch (error) {
        console.error("Sync failed:", error);
      }
    }

    await loadJobs();
    setIsSyncing(false);
    
    if (syncedCount > 0) {
      toast.success(`Synced ${syncedCount} job${syncedCount > 1 ? 's' : ''}!`, { id: "sync" });
    } else {
      toast.error("Sync failed. Please try again.", { id: "sync" });
    }
  };

  const saveJob = async (e) => {
    e.preventDefault();
    if (!jobTitle.trim()) { toast.error("Enter title"); return; }
    const newJob = {
      title: jobTitle.trim(),
      description: jobDesc.trim(),
      location: jobLocation.trim(),
      priority: jobPriority,
      synced: isOnline ? 1 : 0,
      createdAt: new Date().toISOString()
    };
    await db.saveJobOffline(newJob);
    await loadJobs();
    setJobTitle(""); setJobDesc(""); setJobLocation(""); setJobPriority("medium");
    handlePageChange("jobs");
    toast.success(isOnline ? "Saved!" : "Saved offline!");
    if (isOnline) await syncPendingJobs();
  };

  const deleteJob = async (id, title) => {
    if (window.confirm(`Delete "${title}"?`)) {
      await db.deleteJob(id);
      await loadJobs();
      toast.success("Deleted");
    }
  };

  const handleManualSync = async () => {
    await syncPendingJobs();
  };

  const pendingCount = jobs.filter(j => j.synced === 0).length;
  const completedCount = jobs.filter(j => j.synced === 1).length;

  return (
    <div style={{ background: "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 50%, #e0f2fe 100%)", minHeight: "100vh" }}>
      <Toaster position="top-right" />
      
      <Navbar 
        currentPage={currentPage}
        setCurrentPage={handlePageChange}
        isOnline={isOnline}
        isSyncing={isSyncing}
        handleManualSync={handleManualSync}
        pendingCount={pendingCount}
      />

      <OfflineAlert isOnline={isOnline} pendingCount={pendingCount} />

      <div style={{ maxWidth: "1400px", margin: "0 auto", width: "100%" }}>
        <div key={animationKey} className="fade-in-up">
          {currentPage === "dashboard" && (
            <Dashboard 
              jobs={jobs}
              pendingCount={pendingCount}
              completedCount={completedCount}
              setCurrentPage={handlePageChange}
            />
          )}

          {currentPage === "jobs" && (
            <JobsList 
              jobs={jobs}
              setCurrentPage={handlePageChange}
              deleteJob={deleteJob}
            />
          )}

          {currentPage === "add" && (
            <AddJobForm 
              jobTitle={jobTitle}
              setJobTitle={setJobTitle}
              jobLocation={jobLocation}
              setJobLocation={setJobLocation}
              jobPriority={jobPriority}
              setJobPriority={setJobPriority}
              jobDesc={jobDesc}
              setJobDesc={jobDesc}
              saveJob={saveJob}
              setCurrentPage={handlePageChange}
            />
          )}

          {currentPage === "settings" && (
            <Settings 
              isOnline={isOnline}
              jobs={jobs}
              pendingCount={pendingCount}
            />
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin { animation: spin 1s linear infinite; }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .fade-in-up {
          animation: fadeInUp 0.5s ease forwards;
        }
      `}</style>
    </div>
  );
}

export default App;