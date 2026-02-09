import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/");
  };

  return (
    <div className="flex justify-between p-4">
      <h3>Job Tracker</h3>
      <button
      onClick={logout}
        className="
    group relative
    flex items-center
    w-[45px] h-[45px]
    overflow-hidden
    rounded-full
    cursor-pointer
    bg-[rgb(5,65,65)]
    shadow-[2px_2px_10px_rgba(0,0,0,0.2)]
    transition-all duration-300
    hover:w-[130px] hover:rounded-[40px]
    active:translate-x-[2px] active:translate-y-[2px]
  "
      >
        {/* Icon */}
        <span
          className="
      flex items-center justify-center
      w-full
      transition-all duration-300
      group-hover:w-[35%]
      group-hover:pl-4
    "
        >
          {/* Logout SVG */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
            />
          </svg>
        </span>

        {/* Text */}
        <span
          className="
      absolute inset-y-0 right-0
      flex items-center justify-center
      w-0 opacity-0
      text-white text-sm font-semibold
      transition-all duration-300
      group-hover:w-[65%]
      group-hover:opacity-100
      group-hover:pr-3
    "
        >
          Logout
        </span>
      </button>
    </div>
  );
};

export default Navbar;
