/* トップページ.*/
import { Link } from "react-router-dom";
import React from "react";

import Header from "../components/header/header";
import Footer from "../components/footer/footer";

import titleart from "../assets/titleart.jpg";
import bandlist from "../assets/bandlist.jpg";

const Top = () => {
  return (
    <>
      <div className="bg-custom_gray min-h-full">
        <Header />

        <div className="container flex flex-col items-center mx-auto p-8">
          <img src={titleart} />
        </div>

        <div className="container flex flex-col items-center mx-8 px-40">
          <img src={bandlist} />
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Top;
