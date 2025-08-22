import {
  BrowserRouter,
  Route,
  Routes,
  type RouteProps,
} from "react-router-dom";

import Top from "./page/Top.tsx";
import TimeTable from "./page/TimeTable.tsx";

{
  /* リンク先をリストで一括指定.*/
}
const routes = [
  {
    path: "/",
    Component: Top,
  },
  {
    path: "/timetable",
    Component: TimeTable,
  },
  {
    path: "/bandlist",
    Component: TimeTable,
  },
] as const satisfies RouteProps[];

{
  /* 実際のルーティング.*/
}
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, Component }, i) => (
          <Route key={i} path={path} element={<Component />} />
        ))}
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
