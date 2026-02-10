const JobCard = ({ job, id, startEdit, handleDelete, getStatusColor }) => {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h4 className="text-lg font-semibold">{job.company}</h4>
        <p className="text-gray-600">{job.role}</p>
      </div>

      <div className="flex items-center gap-3">
        <span
          className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
            job.status
          )}`}
        >
          {job.status}
        </span>

        <button onClick={() => startEdit(job)} className="text-blue-500">
          Edit
        </button>

        <button onClick={() => handleDelete(id)} className="text-red-500">
          Delete
        </button>
      </div>
    </div>
  );
};

export default JobCard;
