import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../services/api";
import Card from "./common/Card";
import Modal from "./common/Modal";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const { user } = useAuth();

  // State for metrics
  const [metrics, setMetrics] = useState({
    openingBalance: 1200,
    closingBalance: 1350,
    netMovement: 150,
    assigned: 800,
    expended: 50,
    purchases: 120,
    transferIn: 50,
    transferOut: 20,
  });

  // Filters
  const [filters, setFilters] = useState({
    date: "",
    base: "",
    equipmentType: "",
  });

  // Pop-up state for Net Movement details
  const [showNetMovementDetails, setShowNetMovementDetails] = useState(false);

  // Sample chart data
  const chartData = [
    { month: 'Jan', netMovement: 100 },
    { month: 'Feb', netMovement: 120 },
    { month: 'Mar', netMovement: 140 },
    { month: 'Apr', netMovement: 130 },
    { month: 'May', netMovement: 150 },
    { month: 'Jun', netMovement: 160 },
  ];

  // Fetch metrics from backend
  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await api.get("/api/dashboard", { params: filters });
        setMetrics(data);
      } catch (error) {
        console.error("Failed to fetch metrics:", error);
        // Using sample data
        // Remove fallback dummy data to always rely on backend
      }
    };
    fetchMetrics();
  }, [filters]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  if (!user) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Military Asset Dashboard</h1>
      <p className="mb-6 text-gray-600 dark:text-gray-400">Welcome, {user.name} ({user.role})</p>

      <div className="mb-6 flex flex-wrap gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
          <input
            type="date"
            name="date"
            value={filters.date}
            onChange={handleFilterChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Base</label>
          <input
            type="text"
            name="base"
            value={filters.base}
            onChange={handleFilterChange}
            placeholder="Base"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Equipment Type</label>
          <input
            type="text"
            name="equipmentType"
            value={filters.equipmentType}
            onChange={handleFilterChange}
            placeholder="Equipment Type"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <Card title="Opening Balance" value={metrics.openingBalance} icon="📦" color="blue" />
        <Card title="Closing Balance" value={metrics.closingBalance} icon="📦" color="green" />
        <Card
          title="Net Movement"
          value={metrics.netMovement}
          icon="📈"
          color="purple"
          onClick={() => setShowNetMovementDetails(true)}
          hoverable
        />
        <Card title="Assigned" value={metrics.assigned} icon="👤" color="orange" />
        <Card title="Expended" value={metrics.expended} icon="💥" color="red" />
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow mb-6">
        <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Net Movement Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="netMovement" stroke="#8884d8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <Modal
        isOpen={showNetMovementDetails}
        onClose={() => setShowNetMovementDetails(false)}
        title="Net Movement Details"
      >
        <div className="space-y-2">
          <p><span className="font-semibold">Purchases:</span> {metrics.purchases}</p>
          <p><span className="font-semibold">Transfer In:</span> {metrics.transferIn}</p>
          <p><span className="font-semibold">Transfer Out:</span> {metrics.transferOut}</p>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;
