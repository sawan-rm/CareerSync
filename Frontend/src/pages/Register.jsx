import React, { useState } from "react";
import api from "../Api/axios";

const Register = () => {
  const [form, setform] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });

  const [error, seterror] = useState("");
  const [loading, setloading] = useState(false);

  const handleChange = async (e) => {
    setform({});
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    seterror("");

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setloading(true);
      await api.post("/auth/register", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      alert("Registration successfull ");
    } catch (err) {
      console.error(err);
      setError(err.response?.data || "Registration failed");
    } finally {
      setloading(false);
    }
  };

  return (
    <div>
      <h2>Register</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form action="post" onSubmit={handleCreate}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
