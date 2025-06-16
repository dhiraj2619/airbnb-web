// Calender.jsx
import React, { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import './css/Calender.css';

const Calender = ({ onDateSelect }) => {
  const [range, setRange] = useState({ from: undefined, to: undefined });

 const handleSelect = (selectedRange) => {
  // Only allow selection if "to" is different from "from"
  if (
    selectedRange?.from &&
    selectedRange?.to &&
    selectedRange.from.getTime() !== selectedRange.to.getTime()
  ) {
    setRange(selectedRange);
    onDateSelect(selectedRange); // Send only finalized valid range
  } else {
    setRange(selectedRange); // Still set local state for visual feedback
  }
};




  return (
    <div className="calendar-container">
      <DayPicker
        mode="range"
        numberOfMonths={2}
        selected={range}
        onSelect={handleSelect}
        pagedNavigation
        weekStartsOn={0}
        disabled={{ before: new Date() }} 
        className="airbnb-calendar"
      />

      <div className="date-filters">
        <button>Exact dates</button>
        <button>± 1 day</button>
        <button>± 2 days</button>
        <button>± 3 days</button>
        <button>± 7 days</button>
        <button>± 14 days</button>
      </div>

      <div className="fee-note">
        <i className="bi bi-tag-fill"></i> Prices include all fees
      </div>
    </div>
  );
};

export default Calender;
