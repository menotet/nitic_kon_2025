import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import type { TimetableItem } from "../types/TimetableItem.d";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import SelectDayButton from "../components/SelectDayButton";
import Accordion from "../components/Accordion";

const Timetable = () => {
  const [schedule, setSchedule] = useState<TimetableItem[]>([]);
  const [visibleDay, setVisible] = useState(1);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch("http://localhost:8000/timetable");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: TimetableItem[] = await response.json();
        setSchedule(data);
      } catch (error) {
        console.error("Failed to fetch schedule:", error);
      }
    };

    fetchSchedule();
  }, []);

  const changeDay = (day: number) => {
    setVisible(day);
  };

  const day1Schedule = schedule.filter((item) => item.day === 1);
  const day2Schedule = schedule.filter((item) => item.day === 2);

  return (
    <div className="text-white bg-custom_bg_gray min-h-screen">
      <Header />

      <main className="container mx-auto p-4 md:p-8 max-w-2xl">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 ">TimeTable</h1>
        </div>

        <div className="flex items-center justify-center mb-8">
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

        {visibleDay === 1 && (
          <div className="relative flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Day 1</h2>

            <div className="w-full">
              {day1Schedule.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center w-full my-4 relative"
                >
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                    {item.start_time}
                  </div>

                  <div className="absolute left-1/3 -translate-x-1/2 w-1 bg-gray-400 h-full"></div>

                  <div className="absolute left-1/3 -translate-x-1/2 w-4 h-4 rounded-full bg-blue-500 border-2 border-white"></div>

                  <div className="flex-grow"></div>

                  <div className="w-1/2 pl-4">
                    <Accordion
                      title={item.band_name}
                      songs={[item.song1, item.song2, item.song3].filter(Boolean) as string[]}
                      time={item.start_time}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {visibleDay === 2 && (
          <div className="relative flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Day 2</h2>
            <div className="w-full">
              {day2Schedule.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center w-full my-4 relative"
                >
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                    {item.start_time}
                  </div>

                  <div className="absolute left-1/3 -translate-x-1/2 w-1 bg-gray-400 h-full"></div>

                  <div className="absolute left-1/3 -translate-x-1/2 w-4 h-4 rounded-full bg-blue-500 border-2 border-white"></div>

                  <div className="flex-grow"></div>

                  <div className="w-1/2 pl-4">
                    <Accordion
                      title={item.band_name}
                      songs={[item.song1, item.song2, item.song3].filter(Boolean) as string[]}
                      time={item.start_time}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Timetable;
