import React from "react";
import { Link } from "react-router-dom";

const AdminIndex: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
      <p className="mb-4">Select a page to manage:</p>
      <div className="list-disc pl-5">
        <Link to="/admin/data" className="text-blue-300 underline">
          Timetable Data Management
        </Link>
        {/* Add links to other admin pages here in the future */}
      </div>
    </div>
  );
};

export default AdminIndex;
