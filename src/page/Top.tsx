/* トップページ.*/
import { Link } from "react-router-dom";

import Header from "../components/header/header";
import Footer from "../components/footer/footer";

import titleart from "../assets/titleart.jpg";
import bandlist from "../assets/bandlist.jpg";

const current_band = "band";

const Top = () => {
  return (
    <>
      <div className="text-white bg-custom_bg_gray min-h-[100vh] min-w0-[100vh]">
        <Header />
        <div className="container flex flex-col items-center mx-auto p-8">
          <img src={titleart} />
        </div>

        <div className="container flex flex-col items-center mx-8 my-8 px-40 font-bold">
          Now playing: {current_band}
        </div>

        <Link to="/timetable">
          <div className="container flex flex-col items-center mx-8 px-40">
            <img src={bandlist} />
          </div>
        </Link>
        <Footer />
      </div>
    </>
  );
};

export default Top;
