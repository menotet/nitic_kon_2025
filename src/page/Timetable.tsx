/* タイムテーブル. */
import { Link } from "react-router-dom";

import Header from "../components/header/header";
import Footer from "../components/footer/footer";

const current_band = "band";

const Timetable = () => {
  return (
    <>
      <div className="text-white bg-custom_bg_gray min-h-[100vh] min-w0-[100vh]">
        <Header />

        <Footer />
      </div>
    </>
  );
};

export default Timetable;
