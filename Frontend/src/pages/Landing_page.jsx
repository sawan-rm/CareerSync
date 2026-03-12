import { useNavigate } from "react-router-dom";

const Landing_page = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#111] text-white animate-zoomIn">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6">
        <div
          className="text-3xl font-bold cursor-pointer transition-all duration-300
           hover:scale-105 hover:backdrop-blur-[10px] hover:text-blue-500"
          onClick={() => {
            window.location.href = "/";
          }}
        >
          CareerSync
        </div>

        <div className="space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="px-5 py-2 rounded-lg border border-white/20
             text-gray-200 backdrop-blur-md
             hover:border-blue-400 hover:text-blue-400
             transition-all duration-300"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="px-6 py-2 rounded-lg
             bg-blue-500/90 backdrop-blur-md
             text-white
             hover:bg-blue-600
             transition-all duration-300"
          >
            Register
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center mt-32">
        <h2 className="text-5xl font-bold mb-6">Track Jobs Smarter </h2>

        <p className="text-gray-400 max-w-xl mb-8">
          Manage job applications, interviews, and progress in one place.
        </p>

        <button
          onClick={() => navigate("/register")}
          className="bg-blue-600 px-8 py-3 rounded text-lg"
        >
          Get Started
        </button>
      </section>
    </div>
  );
};

export default Landing_page;
