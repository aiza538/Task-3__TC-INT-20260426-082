import Dexie from "dexie";

export const db = new Dexie("FieldOpsDB");

db.version(1).stores({
  jobs: "++id, title, description, location, priority, synced, createdAt",
});

// Save job offline
db.saveJobOffline = async (jobData) => {
  return await db.jobs.add({
    ...jobData,
    synced: jobData.synced || 0,
    createdAt: jobData.createdAt || new Date().toISOString(),
  });
};

// Get all jobs
db.getAllJobs = async () => {
  return await db.jobs.toArray();
};

// Get pending jobs (not synced)
db.getPendingJobs = async () => {
  return await db.jobs.where("synced").equals(0).toArray();
};

// Mark job as synced
db.markJobSynced = async (id) => {
  return await db.jobs.update(id, { synced: 1 });
};

// Delete job
db.deleteJob = async (id) => {
  return await db.jobs.delete(id);
};

// Update job
db.updateJob = async (id, data) => {
  return await db.jobs.update(id, data);
};

export default db;
