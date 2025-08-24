// トップページ.
import { Link } from "react-router-dom";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Accordion from "../components/Accordion";

import titleart from "../assets/titleart.jpg";
import bandlist from "../assets/bandlist.jpg";

const Top = () => {
  const current_band = "band";
  const current_song = ["song1", "song2", "song3"];

  return (
    <>
      <div className="text-white bg-custom_bg_gray min-h-[100vh] min-w0-[100vh]">
        <Header />

        {
          // バナー.
        }
        <div className="flex flex-col items-center mx-auto p-8">
          <img src={titleart} />
        </div>

        <div className="flex flex-col items-center justify-center w-full my-8 px-8 font-bold">
          <p className="text-2">Now playing</p>
          <Accordion title={current_band} songs={current_song} time="12:00" />
        </div>

        {
          // タイムテーブル用画像.
        }

        <div className="flex flex-col items-center mx-8 px-2 lg:mx-48">
          <Link to="/timetable">
            <img src={bandlist} />
          </Link>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Top;
