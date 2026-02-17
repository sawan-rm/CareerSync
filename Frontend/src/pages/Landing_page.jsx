import { useNavigate } from "react-router-dom";

const Landing_page = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#111] text-white">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6">
        <h1 className="text-2xl font-bold">CareerSync</h1>

        <div className="space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="border px-4 py-2 rounded"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="bg-blue-500 px-4 py-2 rounded"
          >
            Register
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center mt-32">
        <h2 className="text-5xl font-bold mb-6">
          Track Jobs Smarter 🚀
        </h2>

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
