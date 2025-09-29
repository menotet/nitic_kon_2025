import { BrowserRouter, Route, Routes } from "react-router-dom";

import Top from "./pages/Top.tsx";
import TimeTable from "./pages/TimeTable.tsx";
import BandList from "./pages/BandList.tsx";
import Login from "./pages/Login.tsx";
import AdminLayout from "./pages/AdminLayout.tsx";
import AdminIndex from "./pages/AdminIndex.tsx";
import AdminData from "./pages/AdminData.tsx";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/timetable" element={<TimeTable />} />
        <Route path="/bandlist" element={<BandList />} />
        <Route path="/login" element={<Login />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminIndex />} />
          <Route path="data" element={<AdminData />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
