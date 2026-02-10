import { useEffect, useState, useCallback } from "react";
import api from "../Api/axios";
import Navbar from "../components/NavBar";
// import jobCard from "../components/JobCard";
// import EditJobForm from "../components/Editjob";

const LIMIT = 5;

const Jobs = () => {
  const [jobs, setJobs] = useState([]);

  // add job
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [status, setStatus] = useState("APPLIED");

  // filters
  const [filterStatus, setFilterStatus] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // pagination
  const [page, setPage] = useState(1);

  // editing
  const [editingId, setEditingId] = useState(null);
  const [editCompany, setEditCompany] = useState("");
  const [editRole, setEditRole] = useState("");
  const [editStatus, setEditStatus] = useState("APPLIED");

  /* ---------------- DEBOUNCE SEARCH ---------------- */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  /* ---------------- FETCH JOBS ---------------- */
  const fetchJobs = useCallback(async () => {
    try {
      const res = await api.get("/jobs", {
        params: {
          page,
          limit: LIMIT,
          status: filterStatus,
          search: debouncedSearch,
        },
      });

      const jobsData = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.jobs)
          ? res.data.jobs
          : [];

      setJobs(jobsData);
    } catch (err) {
      console.error("Error fetching jobs", err);
    }
  }, [page, filterStatus, debouncedSearch]);

  /* reset page when filters/search change */
  useEffect(() => {
    setPage(1);
  }, [filterStatus, debouncedSearch]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  /* ---------------- ADD JOB ---------------- */
  const handleAddJob = async (e) => {
    e.preventDefault();

    try {
      await api.post("/jobs", { company, role, status });

      setCompany("");
      setRole("");
      setStatus("APPLIED");

      fetchJobs();
    } catch (err) {
      console.error("Error adding job", err);
    }
  };

  /* ---------------- DELETE JOB ---------------- */
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this job?")) return;

    try {
      await api.delete(`/jobs/${id}`);
      fetchJobs();
    } catch (err) {
      console.error("Error deleting job", err);
    }
  };

  /* ---------------- EDIT JOB ---------------- */
  const startEdit = (job) => {
    setEditingId(job._id || job.id);
    setEditCompany(job.company);
    setEditRole(job.role);
    setEditStatus(job.status);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };

  const saveEdit = async (id) => {
    try {
      await api.put(`/jobs/${id}`, {
        company: editCompany,
        role: editRole,
        status: editStatus,
      });

      setEditingId(null);
      fetchJobs();
    } catch (err) {
      console.error("Error updating job", err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "APPLIED":
        return "bg-gray-200 text-gray-800";
      case "INTERVIEW":
        return "bg-blue-200 text-blue-800";
      case "OFFER":
        return "bg-green-200 text-green-800";
      case "REJECTED":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-300">
      <Navbar />
      <div className="max-w-6xl mx-auto p-3">
        <h2 className="text-2xl font-bold mb-6">My Jobs</h2>
      </div>
      {/* ADD JOB */}
      <form
        onSubmit={handleAddJob}
        className="bg-white p-4 rounded-lg shadow mb-6 flex gap-2"
      >
        <input
          className="border p-2 rounded w-full"
          placeholder="Company"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          required
        />

        <input
          className="border p-2 rounded w-full"
          placeholder="Role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="
            w-full
            rounded-base
            border border-brand
            bg-neutral-primary
            px-3 py-2
            text-sm font-medium text-fg-brand
            focus:outline-none
            focus:ring-4 focus:ring-brand-subtle
            hover:bg-neutral-secondary
            cursor-pointer
          "
        >
          <option value="APPLIED">Applied</option>
          <option value="INTERVIEW">Interview</option>
          <option value="OFFER">Offer</option>
          <option value="REJECTED">Rejected</option>
        </select>

        <button
          className="
              w-full
              text-fg-brand
              bg-sky-600/100 ...
              border border-brand
              hover:!bg-brand hover:!text-white
              focus:ring-4 focus:ring-brand-subtle
              font-medium text-sm leading-5
              px-4 py-2.5
              rounded-base
              focus:outline-none
            "
        >
          Add
        </button>
      </form>

      <hr />

      {/* FILTERS */}
      <div className="bg-white p-4 rounded-lg shadow mb-6 flex gap-4">
        <input
          className="border p-2 rounded w-full"
          placeholder="Search company or role"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="
            w-full
            rounded-base
            border border-brand
            bg-neutral-primary
            px-3 py-2
            text-sm font-medium text-fg-brand
            focus:outline-none
            focus:ring-4 focus:ring-brand-subtle
            hover:bg-neutral-secondary
            cursor-pointer
          "
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <option value="">All</option>
          <option value="APPLIED">APPLIED</option>
          <option value="INTERVIEW">INTERVIEW</option>
          <option value="OFFER">OFFER</option>
          <option value="REJECTED">REJECTED</option>
        </select>
      </div>

      <hr />

      {/* JOB LIST */}
      <div className="space-y-4">
        {jobs.length === 0 ? (
          <p className="text-gray-500">No jobs found</p>
        ) : (
          jobs.map((job) => {
            const id = job._id || job.id;

            return (
              <div key={id} className="bg-white p-4 rounded-lg shadow">
                {editingId === id ? (
                  <div className="flex flex-col gap-2">
                    <input
                      className="border p-2 rounded"
                      value={editCompany}
                      onChange={(e) => setEditCompany(e.target.value)}
                    />
                    <input
                      className="border p-2 rounded"
                      value={editRole}
                      onChange={(e) => setEditRole(e.target.value)}
                    />
                    <select
                      className="border p-2 rounded"
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value)}
                    >
                      <option value="APPLIED">APPLIED</option>
                      <option value="INTERVIEW">INTERVIEW</option>
                      <option value="OFFER">OFFER</option>
                      <option value="REJECTED">REJECTED</option>
                    </select>

                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => saveEdit(id)}
                        className="bg-green-500 text-white px-4 py-1 rounded"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-gray-400 text-white px-4 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-lg font-semibold">{job.company}</h4>
                      <p className="text-gray-600">{job.role}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                          job.status,
                        )}`}
                      >
                        {job.status}
                      </span>

                      <button
                        onClick={() => startEdit(job)}
                        className="text-blue-500"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(id)}
                        className="text-red-500"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Prev
        </button>

        <span className="font-semibold">Page {page}</span>

        <button
          disabled={jobs.length < LIMIT}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Jobs;
