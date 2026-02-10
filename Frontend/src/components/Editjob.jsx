const EditJobForm = ({
  editCompany,
  setEditCompany,
  editRole,
  setEditRole,
  editStatus,
  setEditStatus,
  saveEdit,
  cancelEdit,
  id,
}) => {
  return (
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
  );
};

export default EditJobForm;
