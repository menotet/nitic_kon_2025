import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";

const AdminIndex: React.FC = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center">
          {user && <p className="mr-4">{user.username}</p>}
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </div>
      <p className="mb-4">Select a page to manage:</p>
      <div className="list-disc pl-5">
        <Link to="/admin/timetabledata" className="text-blue-300 underline">
          Timetable Data Management
        </Link>
        <br />
        <Link to="/admin/userdata" className="text-blue-300 underline">
          User Data Management
        </Link>
        {/* Add links to other admin pages here in the future */}
      </div>
    </div>
  );
};

export default AdminIndex;
