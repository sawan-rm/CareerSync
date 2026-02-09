import { useState } from "react";
import api from "../Api/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // localStorage.clear();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // 🔥 AUTO LOGOUT WHEN LOGIN PAGE LOADS
  // useEffect(() => {
  //   localStorage.removeItem("accessToken");
  //   localStorage.removeItem("refreshToken");
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      //  THIS LINE IS CRITICAL
      const { accessToken, refreshToken } = res.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      console.log("Saved access token:", localStorage.getItem("accessToken"));

      navigate("/jobs");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-[420px] space-y-6">
        {/* Email */}
        <div className="relative border border-gray-300 rounded-md px-4 py-3">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            📧
          </span>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" "
            className="
        peer w-full
        bg-transparent outline-none
        pl-9 pr-3 py-2
        text-sm
      "
          />

          <label
            htmlFor="email"
            className="
        absolute left-9 -top-2
        bg-white px-1
        text-xs text-gray-500
        transition-all
        peer-placeholder-shown:top-1/2
        peer-placeholder-shown:-translate-y-1/2
        peer-placeholder-shown:text-sm
        peer-focus:-top-2
        peer-focus:text-xs
        peer-focus:text-blue-600
      "
          >
            Email
          </label>
        </div>

        {/* Password */}
        <div className="relative border border-gray-300 rounded-md px-4 py-3">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            🔒
          </span>

          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder=" "
            className="
        peer w-full
        bg-transparent outline-none
        pl-9 pr-3 py-2
        text-sm
      "
          />

          <label
            htmlFor="password"
            className="
        absolute left-9 -top-2
        bg-white px-1
        text-xs text-gray-500
        transition-all
        peer-placeholder-shown:top-1/2
        peer-placeholder-shown:-translate-y-1/2
        peer-placeholder-shown:text-sm
        peer-focus:-top-2
        peer-focus:text-xs
        peer-focus:text-blue-600
      "
          >
            Password
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
