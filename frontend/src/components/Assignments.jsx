import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import Table from "./common/Table";

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [form, setForm] = useState({
    base: "",
    personnel: "",
    equipmentType: "",
    quantity: "",
    expended: false,
    date: "",
  });
  const [filters, setFilters] = useState({
    date: "",
    base: "",
    personnel: "",
    equipmentType: "",
  });

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const data = await api.get("/api/assignments", { params: filters });
        setAssignments(data);
      } catch (error) {
        console.error("Failed to fetch assignments:", error);
        // Fallback to dummy data removed to rely on backend data only
      }
    };
    fetchAssignments();
  }, [filters]);

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("api/assignments", form);
      // Refresh list
      const data = await api.get("api/assignments", { params: filters });
      setAssignments(data);
      setForm({ base: "", personnel: "", equipmentType: "", quantity: "", expended: false, date: "" });
    } catch (error) {
      console.error("Failed to submit assignment:", error);
      // Fallback: add locally removed to rely on backend data only
      setForm({ base: "", personnel: "", equipmentType: "", quantity: "", expended: false, date: "" });
    }
  };

  const columns = [
    { key: 'base', label: 'Base' },
    { key: 'personnel', label: 'Personnel' },
    { key: 'equipmentType', label: 'Equipment Type' },
    { key: 'quantity', label: 'Quantity' },
    {
      key: 'expended',
      label: 'Expended',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
        }`}>
          {value ? 'Yes' : 'No'}
        </span>
      )
    },
    { key: 'date', label: 'Date' },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Completed' ? 'bg-gray-100 text-gray-800' :
          value === 'Active' ? 'bg-blue-100 text-blue-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {value}
        </span>
      )
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Assignments & Expenditures</h2>

      <form onSubmit={handleSubmit} className="mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Base</label>
            <input
              type="text"
              name="base"
              value={form.base}
              onChange={handleFormChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Personnel</label>
            <input
              type="text"
              name="personnel"
              value={form.personnel}
              onChange={handleFormChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Equipment Type</label>
            <input
              type="text"
              name="equipmentType"
              value={form.equipmentType}
              onChange={handleFormChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleFormChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div className="flex items-center space-x-2">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Expended</label>
            <input
              type="checkbox"
              name="expended"
              checked={form.expended}
              onChange={handleFormChange}
              className="mt-1 rounded border-gray-300 dark:border-gray-600 text-blue-600 shadow-sm focus:ring-blue-500 dark:bg-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleFormChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
        >
          Record Assignment
        </button>
      </form>

      <div className="mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Filter Date</label>
            <input
              type="date"
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Filter Base</label>
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Filter Personnel</label>
            <input
              type="text"
              name="personnel"
              value={filters.personnel}
              onChange={handleFilterChange}
              placeholder="Personnel"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Filter Equipment Type</label>
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
      </div>

      <Table
        data={assignments}
        columns={columns}
        searchable={true}
        sortable={true}
        paginated={true}
        pageSize={5}
      />
    </div>
  );
};

export default Assignments;
