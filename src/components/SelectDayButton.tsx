import React from "react";

const SelectDayButton = ({
  day,
  visibleDay,
  onClick = () => {},
}: {
  day: number;
  visibleDay: number;
  onClick?: () => void;
}) => {
  const isSelected = day === visibleDay;
  const buttonCss = isSelected
    ? "bg-button_bg text-white px-4 py-2 mb-4"
    : "bg-gray-500 text-white px-4 py-2 mb-4";

  return (
    <>
      <button className={buttonCss} onClick={onClick}>
        Day {day}
      </button>
    </>
  );
};

export default SelectDayButton;
