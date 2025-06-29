import React, { useState, useEffect } from "react";
import "../components/css/input.css";
import axios from "axios";
import { ServerApi } from "../config/ServerApi";
import { useNavigate } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";

const getDaysInMonth = (month, year) => new Date(year, month, 0).getDate();

const ProfileCompletion = () => {

  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();
  const minYear = currentYear - 100;
  const maxYear = currentYear - 18;

  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [days, setDays] = useState([]);
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (month && year) {
      const daysInMonth = getDaysInMonth(month, year);
      const newDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
      setDays(newDays);

      if (day > daysInMonth) setDay("");
    }
  }, [month, year]);

  useEffect(() => {
    if (day && month && year) {
      const formatted = `${year}-${String(month).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;
     
    }
  }, [day, month, year]);

  const handleUpdateBasicprofile = async() => {

      if (!day || !month || !year || !mobile) {
        setError("Please fill all fields");
        return;
      }

      const formattedDOB = `${year}-${String(month).padStart(2, "0")}-${String(
        day
      ).padStart(2, "0")}`;
      setLoading(true);
    try {
      const token = localStorage.getItem("authToken");

      await axios.put(`${ServerApi}/user/complete-profile`,{
         dateofbirth: formattedDOB,
         mobile,
      },{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });


      navigate("/");
      
    } catch (error) {
      console.error("Error updating profile", error);
      setError("Failed to update profile. Please try again.");
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center mt-5 pt-5">
        <div className="col-lg-5">
          <div
            className="card rounded-4 border-1  overflow-hidden"
            style={{ borderColor: "#b0b0b0" }}
          >
            <div className="card-header text-center p-3 bg-white position-relative">
              <h6 className="card-title mb-0">Complete profile</h6>
            </div>
            <div className="card-body">
              <div className="d-flex gap-2 w-100">
                <div className="form-floating" style={{ width: "33.33%" }}>
                  <select
                    className="form-select"
                    value={month}
                    onChange={(e) => setMonth(Number(e.target.value))}
                  >
                    <option value="">Month</option>
                    {[...Array(12)].map((_, i) => (
                      <option value={i + 1} key={i}>
                        {new Date(0, i).toLocaleString("default", {
                          month: "long",
                        })}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-floating" style={{ width: "33.33%" }}>
                  <select
                    className="form-select"
                    value={day}
                    onChange={(e) => setDay(Number(e.target.value))}
                    disabled={!month || !year}
                  >
                    <option value="">Day</option>
                    {days.map((d) => (
                      <option value={d} key={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-floating" style={{ width: "33.33%" }}>
                  <select
                    className="form-select"
                    value={year}
                    onChange={(e) => setYear(Number(e.target.value))}
                  >
                    <option value="">Year</option>
                    {Array.from(
                      { length: maxYear - minYear + 1 },
                      (_, i) => maxYear - i
                    ).map((y) => (
                      <option value={y} key={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                </div>{" "}
                {/* Year Select */}
              </div>

              <div className="form-floating mt-4">
                <input
                  type="tel"
                  className="form-control"
                  placeholder="Mobile Number"
                  maxLength="10"
                  value={mobile}
                  onChange={(e)=>setMobile(e.target.value.replace(/\D/g, ''))}
                />
                <label>Mobile Number</label>
              </div>

              <div className="mt-4" >
                <button className="btn submitbtn w-100" onClick={handleUpdateBasicprofile}>{loading ?<BeatLoader color="#fff" size={10} /> :'Continue'}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCompletion;
