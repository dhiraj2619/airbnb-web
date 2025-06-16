import React, { useEffect, useRef, useState } from "react";
import Calender from "./Calender";

const Searchbar = () => {
  const [showdestinationDropdowns, setShowdestinationDropdowns] =
    useState(false);

  const [selectedDateRange, setSelectedDateRange] = useState("");
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showManDropdown, setShowManDropdown] = useState(false);

  const guestTypes = [
    { label: "Adults", subtitle: "Ages 13 or above", type: "adults" },
    { label: "Children", subtitle: "Ages 2–12", type: "children" },
    { label: "Infants", subtitle: "Under 2", type: "infants" },
    { label: "Pets", subtitle: "Bringing a service animal?", type: "pets" },
  ];

  const dateDropdownRef = useRef(null);
  const dateInputRef = useRef(null);

  const [guestCounts, setGuestCounts] = useState({
    adults: 0,
    children: 0,  
    infants: 0,
    pets: 0,
  });

  const incrementCount = (type) => {
    setGuestCounts((prevCounts) => ({
      ...prevCounts,
      [type]: prevCounts[type] + 1,
    }));
  }

  const decrementCount = (type) => {
    setGuestCounts((prevCounts) => ({
      ...prevCounts,
      [type]: Math.max(0, prevCounts[type] - 1),
    }));
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dateDropdownRef.current &&
        !dateDropdownRef.current.contains(event.target) &&
        dateInputRef.current &&
        !dateInputRef.current.contains(event.target)
      ) {
        setShowDateDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const formatDate = (date) =>
    date?.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

  return (
    <div className="input-group  mainsearch w-100">
      <div className="position-relative where">
        <span className="input-subtext">Where</span>
        <input
          type="text"
          className={`form-control selectinput shadow-none ${
            showdestinationDropdowns ? "forceshow" : ""
          }`}
          placeholder="Search destination"
          onFocus={() => setShowdestinationDropdowns(true)}
          onBlur={() =>
            setTimeout(() => setShowdestinationDropdowns(false), 150)
          }
        />

        {showdestinationDropdowns && (
          <div className="dropdown-destinations shadow-normal animate-zoom">
            <span className="text-slate fs-small">Suggested destinations</span>
            <div className="mt-4">
              <button className="btn nearby d-flex flex-row align-items-center gap-3 rounded-4">
                <div className="box-locate">
                  <i
                    className="bi bi-geo-alt fs-4"
                    style={{ color: "#4989cd" }}
                  ></i>
                </div>
                <div className="d-flex flex-column justify-content-start align-items-start">
                  <span className="fs-normal fw-bold text-dark">Nearby</span>
                  <span className="fs-normal text-secondary">
                    Find what's around you
                  </span>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="position-relative w-10">
        <span className="input-subtext">Check in - Check out</span>
        <input
          type="text"
          ref={dateInputRef}
          className={`form-control selectinput shadow-none ${
            showDateDropdown ? "forceshow" : ""
          }`}
          placeholder="Add dates"
          value={selectedDateRange}
          onFocus={() => {
            setShowDateDropdown(true);
          }}
        />
      </div>

      {showDateDropdown && (
        <div className="dropdown-date shadow-normal animate-zoom" ref={dateDropdownRef}>
          <Calender
            onDateSelect={(range) => {
              if (range?.from && range?.to) {
                const formatted = `${formatDate(range.from)} - ${formatDate(
                  range.to
                )}`;
                setSelectedDateRange(formatted);
                setShowDateDropdown(false); // Close only after full selection
              }
            }}
          />
        </div>
      )}
      <div className="position-relative who">
        <span className="input-subtext">who</span>
        <input
          type="text"
          className={`form-control selectinput shadow-none ${
            showManDropdown ? "forceshow" : ""
          }`}
          placeholder="Add guests"
          onFocus={() => setShowManDropdown(true)}
          onBlur={() => setTimeout(() => setShowManDropdown(false), 150)}
        />
        <div className="searchbtn">
          <i className="bi bi-search text-white"></i>
        </div>

        {showManDropdown && (
          <div className="dropdown-mans shadow-normal animate-zoom">
            <ul>
              {guestTypes.map((guest) => (    <li className="lives d-flex justify-content-between align-items-center">
                <div className="d-flex flex-column">
                  <h6 className="fs-6 mb-0">{guest.label}</h6>
                  <span className="text-slate">{guest.subtitle}</span>
                </div>
                <div className="d-flex flex-row align-items-center gap-3">
                  <button
                    className={`btn countbtn  btn-sm ${
                      guestCounts[guest.type] === 0 ? "disabled-btn" : ""
                    }`}
                    onMouseDown={(e) => e.preventDefault()}
                    disabled={guestCounts[guest.type]=== 0}
                    onClick={() => decrementCount(guest.type)}
                  >
                    –
                  </button>
                  <span className="fs-6">{guestCounts[guest.type]}</span>
                  <button
                    className="btn countbtn  btn-sm"
                    onMouseDown={(e) => e.preventDefault()}
                    onClick={() => incrementCount(guest.type)}
                  >
                    +
                  </button>
                </div>
              </li>))}
          
             
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Searchbar;
