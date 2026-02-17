import { LockKeyhole, User } from "lucide-react";
import { useState, useEffect } from "react";
import api from "../Api/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 🔥 AUTO LOGOUT WHEN LOGIN PAGE LOADS (RUNS ONCE)
  useEffect(() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      const { accessToken, refreshToken } = res.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      navigate("/jobs");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };


  const handleRegister = () => {
  navigate("/register");
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-[#222]">
      <div className="absolute top-6 right-6 bg-transparent border border-gray-400 text-gray-300 px-5 py-2 rounded hover:bg-blue-600 transition">
        <button onClick={handleRegister}>Register</button>
      </div>
      {/* Outer container */}
      <div className="w-[420px] h-[350px] p-8 rounded-2xl bg-[#111] hover:shadow-slate-800 hover:shadow-2xl flex flex-col">
        {/* Inner card */}
        <h2 className="text-center font-bold text-3xl text-gray-400 tracking-widest mb-8">
          WELCOME
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center rounded">
              <User size={18} className="text-gray-300" />
            </div>

            <input
              type="email"
              placeholder="Username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#4444] text-sm px-3 py-2 rounded text-gray-300 outline-none focus:ring-2 focus:ring-white-500"
            />
          </div>

          {/* Password */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 flex items-center justify-center  rounded">
              <LockKeyhole size={18} className="text-gray-300" />
            </div>

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#4444] text-sm px-3 py-2 rounded text-gray-300 outline-none focus:ring-2 focus:ring-white-500"
            />
          </div>

          {/* Remember + Button */}
          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center gap-2 text-gray-300 text-xs">
              <input type="checkbox" className="accent-blue-500" />
              Remember me
            </label>

            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 text-sm rounded"
            >
              LOGIN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
