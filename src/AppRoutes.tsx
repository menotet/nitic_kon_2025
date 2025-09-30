import { BrowserRouter, Route, Routes } from "react-router-dom";

import Top from "./pages/Top.tsx";
import TimeTable from "./pages/TimeTable.tsx";
import BandList from "./pages/BandList.tsx";
import Login from "./pages/Login.tsx";
import AdminLayout from "./pages/admin/AdminLayout.tsx";
import AdminIndex from "./pages/admin/AdminIndex.tsx";
import AdminTimetableData from "./pages/admin/AdminTimetableData.tsx";
import AdminUserData from "./pages/admin/AdminUserData.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/timetable" element={<TimeTable />} />
        <Route path="/bandlist" element={<BandList />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminIndex />} />
            <Route path="timetabledata" element={<AdminTimetableData />} />
            <Route path="userdata" element={<AdminUserData />} />
          </Route>
        </Route>
        <Route path="*" element={<Top />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
