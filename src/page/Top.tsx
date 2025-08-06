// トップページ
import { Link } from "react-router-dom";
import React from "react";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";

const Top = () => {
  return (
    <>
      <Header />

      <div>
        <p className="text-lg">TOP</p>
      </div>

      <Footer />
    </>
  );
};

export default Top;
