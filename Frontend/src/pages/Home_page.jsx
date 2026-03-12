import React from "react";
import Navebar from "../components/navbar";
import { Link } from "react-router-dom";

const Home_page = () => {
  return (
    <div>
      <Navebar />
      
      <div className="min-h-screen bg-gradient-to-b from-[#1F2937] to-[#111827] text-white flex items-center justify-center px-6">
        <div className="text-center max-w-3xl">
          {/* Heading */}
          <h1 className="text-5xl font-bold leading-tight mb-6">
            Track Your Job Applications <br />
            <span className="text-teal-400">Smarter & Faster</span>
          </h1>

          {/* Description */}
          <p className="text-gray-400 text-lg mb-8">
            CareerSync helps you manage, organize, and monitor your job
            applications in one powerful dashboard.
          </p>

          {/* Buttons */}
          <div className="flex justify-center gap-6 ">
            <Link
              to="/jobs"
              className="bg-teal-600 hover:bg-teal-700 px-8 py-3 rounded-lg text-lg transition"
            >
              Get Started
            </Link>

            <Link
              to="/about"
              className="border border-gray-500 hover:border-white px-8 py-3 rounded-lg text-lg transition"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home_page;
