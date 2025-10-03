import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import Table from "./common/Table";

const Transfers = () => {
  const [transfers, setTransfers] = useState([]);
  const [form, setForm] = useState({
    fromBase: "",
    toBase: "",
    equipmentType: "",
    quantity: "",
    date: "",
  });
  const [filters, setFilters] = useState({
    date: "",
    fromBase: "",
    toBase: "",
    equipmentType: "",
  });

  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        const data = await api.get("/api/transfers", { params: filters });
        setTransfers(data);
      } catch (error) {
        console.error("Failed to fetch transfers:", error);
        // Fallback to dummy data removed to rely on backend data only
      }
    };
    fetchTransfers();
  }, [filters]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("api/transfers", form);
      // Refresh list
      const data = await api.get("api/transfers", { params: filters });
      setTransfers(data);
      setForm({ fromBase: "", toBase: "", equipmentType: "", quantity: "", date: "" });
    } catch (error) {
      console.error("Failed to submit transfer:", error);
      // Fallback: add locally removed to rely on backend data only
      setForm({ fromBase: "", toBase: "", equipmentType: "", quantity: "", date: "" });
    }
  };

  const columns = [
    { key: 'fromBase', label: 'From Base' },
    { key: 'toBase', label: 'To Base' },
    { key: 'equipmentType', label: 'Equipment Type' },
    { key: 'quantity', label: 'Quantity' },
    { key: 'date', label: 'Date' },
    {
      key: 'status',
      label: 'Status',
      render: (value) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          value === 'Completed' ? 'bg-green-100 text-green-800' :
          value === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
          'bg-blue-100 text-blue-800'
        }`}>
          {value}
        </span>
      )
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Transfers</h2>

      <form onSubmit={handleSubmit} className="mb-6 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">From Base</label>
            <input
              type="text"
              name="fromBase"
              value={form.fromBase}
              onChange={handleFormChange}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">To Base</label>
            <input
              type="text"
              name="toBase"
              value={form.toBase}
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
          Record Transfer
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Filter From Base</label>
            <input
              type="text"
              name="fromBase"
              value={filters.fromBase}
              onChange={handleFilterChange}
              placeholder="From Base"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Filter To Base</label>
            <input
              type="text"
              name="toBase"
              value={filters.toBase}
              onChange={handleFilterChange}
              placeholder="To Base"
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
        data={transfers}
        columns={columns}
        searchable={true}
        sortable={true}
        paginated={true}
        pageSize={5}
      />
    </div>
  );
};

export default Transfers;
