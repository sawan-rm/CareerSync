import React, { useState } from "react";
import api from "../Api/axios";
import { useNavigate } from "react-router-dom";
import { Autocomplete, TextField } from "@mui/material";

const Register = () => {
  const roleOptions = [
    { label: "User", value: "user" },
    { label: "Admin", value: "admin" },
  ];

  const navigate = useNavigate();
  const [form, setform] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [error, seterror] = useState("");
  const [loading, setloading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setform((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    seterror("");

    try {
      setloading(true);
      const res = await api.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      });

      localStorage.setItem("accessToken", res.data.accessToken);

      alert("Registration successfull ");
      navigate("/jobs");
    } catch (err) {
      console.error(err);
      seterror(err.response?.data || "Registration failed");
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#222]">
      <div className="w-[420px] min-h-[400px] p-10 rounded-2xl bg-[#111]  hover:shadow-slate-800 hover:shadow-2xl">
        <h2 className="text-center font-bold text-3xl text-gray-400 tracking-widest mb-8">
          Register
        </h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form
          action="post"
          onSubmit={handleCreate}
          className="space-y-5 flex flex-col"
        >
          <div className="flex items-center gap-5">
            <input
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full bg-[#4444] text-sm px-3 py-2 rounded text-gray-300 outline-none focus:ring-2 focus:ring-white-500"
            />
          </div>

          <div className="flex items-center gap-5">
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full bg-[#4444] text-sm px-3 py-2 rounded text-gray-300 outline-none focus:ring-2 focus:ring-white-500"
            />
          </div>
          <div className="flex items-center gap-5">
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full bg-[#4444] text-sm px-3 py-2 rounded text-gray-300 outline-none focus:ring-2 focus:ring-white-500"
            />
          </div>

          <Autocomplete
            options={roleOptions}
            value={roleOptions.find((r) => r.value === form.role) || null}
            onChange={(event, newValue) => {
              setform((prev) => ({
                ...prev,
                role: newValue?.value || "",
              }));
            }}
            PaperProps={{
              sx: {
                bgcolor: "#111", // popup background
                color: "#e5e7eb", // text color
                border: "1px solid #374151",
              },
            }}
            sx={{
              // option text
              "& .MuiAutocomplete-option": {
                color: "#e5e7eb",
              },

              // option hover
              "& .MuiAutocomplete-option:hover": {
                backgroundColor: "#1f2933",
              },

              // selected option
              "& .MuiAutocomplete-option[aria-selected='true']": {
                backgroundColor: "#2563eb",
              },

              // selected + hover
              "& .MuiAutocomplete-option[aria-selected='true']:hover": {
                backgroundColor: "#1d4ed8",
              },
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Role"
                size="small"
                required
                sx={{
                  "& .MuiOutlinedInput-root fieldset": {
                    borderColor: "#4b5563",
                  },
                  "& .MuiOutlinedInput-root:hover fieldset": {
                    borderColor: "#3b82f6",
                  },
                  "& .MuiOutlinedInput-root.Mui-focused fieldset": {
                    borderColor: "#22c55e",
                  },
                  input: { color: "#e5e7eb" },
                  label: { color: "#9ca3af" },
                  "& label.Mui-focused": { color: "#22c55e" },
                }}
              />
            )}
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 row-auto hover:bg-blue-600 text-gray-200 py-2 text-1xl rounded"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
