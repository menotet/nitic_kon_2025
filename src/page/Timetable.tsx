/* タイムテーブル. */
import React, { useState } from "react";
import { Link } from "react-router-dom";

import Header from "../components/header/header";
import Footer from "../components/footer/footer";

const Timetable = () => {
  const current_band = "band";

  const [visible_day, setVisible] = useState(1);
  const DayChange = (day: number) => {
    setVisible(day);
  };

  return (
    <>
      <div className="text-white bg-custom_bg_gray min-h-[100vh] min-w0-[100vh]">
        <Header />

        <div className="flex flex-col items-center mx-auto p-8">
          <h1 className="text-3xl font-bold mb-4 ">TimeTable</h1>
        </div>

        {/* 日付変えるボタン. */}
        <div className="flex items-center justify-center mx-auto p-8">
          <button
            className="bg-blue-800 text-white px-4 py-2 mb-4"
            onClick={() => DayChange(1)}
          >
            Day 1
          </button>

          <button
            className="bg-blue-800 text-white px-4 py-2 mb-4"
            onClick={() => DayChange(2)}
          >
            Day 2
          </button>
        </div>

        {/* タイムテーブル Day1. */}
        {visible_day === 1 && (
          <div className="flex flex-col mx-auto p-8 items-center justify-center">
            <h2 className="text-2xl font-bold mb-4">Day 1</h2>

            {/* タイムテーブルの内容をここに追加 */}
          </div>
        )}

        {/* タイムテーブル Day2. */}

        <Footer />
      </div>
    </>
  );
};

export default Timetable;
