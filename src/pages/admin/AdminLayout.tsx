import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminLayout: React.FC = () => {
    return (
        <div className="bg-custom_bg_gray text-white min-h-screen p-5">
            <Outlet />
        </div>
    );
};

export default AdminLayout;
