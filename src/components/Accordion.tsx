// === アコーディオンメニュー1つ分. ===
import react, { useState } from "react";

const Accordion = ({
  title,
  songs,
  time,
}: {
  title: string;
  songs: string[];
  time: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="flex w-full">
        <p className="font-bold">{time}</p>

        <div className="w-full max-w-md mx-auto my-4 border border-gray-300 shadow-md">
          <button
            className="w-full px-4 py-2 text-left bg-accordion_bg hover:bg-accordion_bg_hover rounded-t-lg focus:outline-none"
            onClick={toggleAccordion}
          >
            <div className="flex justify-between items-center">
              <span className="font-semibold">{title}</span>
              <span>{isOpen ? "-" : "+"}</span>
            </div>
          </button>
          {isOpen && (
            <div className="px-4 py-2 bg-accordion_bg">
              <ol className="list-decimal list-inside">
                {songs.map((song, index) => (
                  <li key={index} className="py-1">
                    {song}
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Accordion;
