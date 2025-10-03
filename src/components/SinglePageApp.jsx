import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Dashboard from "./Dashboard";
import Purchases from "./Purchases";
import Transfers from "./Transfers";
import Assignments from "./Assignments";
import Sidebar from "./common/Sidebar";
import DarkModeToggle from "./common/DarkModeToggle";

const SinglePageApp = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("dashboard");

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 ml-64 p-6">
        <div className="flex justify-end mb-4">
          <DarkModeToggle />
        </div>
        {activeTab === "dashboard" && <Dashboard />}
        {activeTab === "purchases" && <Purchases />}
        {activeTab === "transfers" && <Transfers />}
        {activeTab === "assignments" && <Assignments />}
      </div>
    </div>
  );
};

export default SinglePageApp;
