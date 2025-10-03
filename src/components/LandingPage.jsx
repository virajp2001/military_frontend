import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const LandingPage = () => {
  const [activeForm, setActiveForm] = useState("login");

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">
            Military Asset Management
          </h1>
          <p className="text-blue-200 text-lg">
            Secure access to your military asset management system
          </p>
        </div>

        {/* Form Toggle Buttons */}
        <div className="flex rounded-lg bg-blue-800/50 p-1">
          <button
            onClick={() => setActiveForm("login")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
              activeForm === "login"
                ? "bg-white text-blue-900 shadow-md"
                : "text-blue-200 hover:text-white"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveForm("signup")}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
              activeForm === "signup"
                ? "bg-white text-blue-900 shadow-md"
                : "text-blue-200 hover:text-white"
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-lg shadow-2xl p-8">
          {activeForm === "login" ? <LoginForm /> : <SignupForm />}
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-blue-200 text-sm">
            © 2025 Military Asset Management System. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
