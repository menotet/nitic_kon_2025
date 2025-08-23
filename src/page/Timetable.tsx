/* タイムテーブル. */
import React, { useState } from "react";
import { Link } from "react-router-dom";

import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import SelectDayButton from "../components/SelectDayButton";
import Accordion from "../components/Accordion";

const Timetable = () => {
  const current_band = "band";

  // === 日付処理一式. ===
  const [visibleDay, setVisible] = useState(1);
  const changeDay = (day: number) => {
    setVisible(day);
  };
  // === ===

  return (
    <>
      <div className="text-white bg-custom_bg_gray min-h-[100vh] min-w0-[100vh]">
        <Header />

        <div className="flex flex-col items-center mx-auto p-8">
          <h1 className="text-3xl font-bold mb-4 ">TimeTable</h1>
        </div>

        {/* 日付変えるボタン. */}
        <div className="flex items-center justify-center mx-auto p-8">
          <SelectDayButton
            day={1}
            visibleDay={visibleDay}
            onClick={() => changeDay(1)}
          />
          <SelectDayButton
            day={2}
            visibleDay={visibleDay}
            onClick={() => changeDay(2)}
          />
        </div>

        {/* タイムテーブル Day1. */}
        {visibleDay === 1 && (
          <div className="flex flex-col mx-auto p-8 items-center justify-center">
            <h2 className="text-2xl font-bold mb-4">Day 1</h2>

            {/* === タイムテーブルの内容をここに追加. === */}
            <div className="flex flex-col items-center justify-center w-full">
              <Accordion
                title="title"
                songs={["song1", "song2", "song3"]}
                time="12:00"
              />
            </div>
            {/* === === */}
          </div>
        )}

        {/* タイムテーブル Day2. */}
        {visibleDay === 2 && (
          <div className="flex flex-col mx-auto p-8 items-center justify-center">
            <h2 className="text-2xl font-bold mb-4">Day 2</h2>
          </div>
        )}

        <Footer />
      </div>
    </>
  );
};

export default Timetable;
