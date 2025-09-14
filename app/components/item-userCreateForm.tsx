import React, { useState } from "react";

type ItemUserFormProps = {
  className?: string;
  onSubmit: (formData: FormData, isClick: boolean) => void;
};

export default function ItemUserCreateForm({
  className,
  onSubmit,
}: ItemUserFormProps) {
  const [formData, setFormData] = useState({
    officeId: "",
    name: "",
    phoneNumber: "",
    designation: "",
    departmentId: "",
    status: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = new FormData();
    Object.entries(formData).forEach(([k, v]) => payload.append(k, v));
    onSubmit(payload, true);
  };

  return (
    <form onSubmit={handleSubmit} className={`grid gap-6 ${className || ""}`}>
      {/* Office Id */}
      <div className="grid gap-2">
        <label
          htmlFor="officeId"
          className="text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Office ID
        </label>
        <input
          type="text"
          id="officeId"
          name="officeId"
          placeholder="1111"
          value={formData.officeId}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* Name */}
      <div className="grid gap-2">
        <label
          htmlFor="name"
          className="text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Josef"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* Phone Number */}
      <div className="grid gap-2">
        <label
          htmlFor="phoneNumber"
          className="text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Phone Number
        </label>
        <input
          type="text"
          id="phoneNumber"
          name="phoneNumber"
          placeholder="01XXXXXXXXX"
          value={formData.phoneNumber}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* Designation */}
      <div className="grid gap-2">
        <label
          htmlFor="designation"
          className="text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Designation
        </label>
        <input
          type="text"
          id="designation"
          name="designation"
          placeholder="Operation Manager"
          value={formData.designation}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* Department */}
      <div className="grid gap-2">
        <label
          htmlFor="departmentId"
          className="text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Department
        </label>
        <select
          id="departmentId"
          name="departmentId"
          value={formData.departmentId}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        >
          <option value="">Select department</option>
          <option value="hr">Human Resources</option>
          <option value="it">IT</option>
          <option value="finance">Finance</option>
        </select>
      </div>

      {/* Status */}
      <div className="grid gap-2">
        <label
          htmlFor="status"
          className="text-sm font-medium text-gray-700 dark:text-gray-200"
        >
          Status
        </label>
        <input
          type="text"
          id="status"
          name="status"
          placeholder="active / inactive"
          value={formData.status}
          onChange={handleChange}
          required
          className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 dark:bg-indigo-500 dark:hover:bg-indigo-600"
      >
        Save changes
      </button>
    </form>
  );
}
