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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]">
      {/* Outer container */}
      <div className="w-[420px] p-8 rounded-2xl bg-[#142734] shadow-2xl">
        {/* Inner card */}
        <div className="bg-[#2b4257] rounded-xl p-8">
          <h2 className="text-center text-gray-200 tracking-widest mb-8">
            CLIENT LOGIN
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
                className="w-full bg-gray-100 text-sm px-3 py-2 rounded outline-none focus:ring-2 focus:ring-green-500"
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
                className="w-full bg-gray-100 text-sm px-3 py-2 rounded outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Remember + Button */}
            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 text-gray-300 text-xs">
                <input type="checkbox" className="accent-green-500" />
                Remember me
              </label>

              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 text-sm rounded"
              >
                LOGIN
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
