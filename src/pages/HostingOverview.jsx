import React, { useState } from "react";
import "./css/hostingviews.css";
import axios from "axios";
import { ServerApi } from "../config/ServerApi";
import { useNavigate } from "react-router-dom";
import { BeatLoader } from "react-spinners";

const HostingOverview = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleGetStarted = async () => {
    const token =
      localStorage.getItem("token") || localStorage.getItem("authToken");

    setLoading(true);
    try {
      const { data } = await axios.post(
        `${ServerApi}/property/add`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const propertyId = data.property._id;

      navigate(`/hosting/${propertyId}/about-your-place`);
    } catch (error) {
      console.error("Failed to create property:", error);
    }finally{
      setLoading(false);
    }
  };
  return (
    <section className="" style={{ height: "540px" }}>
      <div className="container-fluid h-100">
        <div className="row align-items-center h-100">
          <div className="col-lg-6">
            <div className="p-5">
              <h1
                className="text-dark fw-semibold"
                style={{ fontSize: "58px" }}
              >
                It’s easy to get <br /> started on Airbnb
              </h1>
            </div>
          </div>
          <div className="col-lg-6 d-flex justify-content-center">
            <div className="d-flex flex-column ps-5">
              <div className="row border-bottom align-items-center py-3">
                <div className="col-lg-9">
                  <h4 className="text-dark fw-semibold fs-4">
                    1 Tell us about your place
                  </h4>
                  <h6 className="text-secondary fs-6 fw-normal">
                    Share some basic info, such as where it is and how many
                    guests can stay.
                  </h6>
                </div>
                <div className="col-lg-3">
                  <img
                    src="https://a0.muscache.com/4ea/air/v2/pictures/da2e1a40-a92b-449e-8575-d8208cc5d409.jpg"
                    className="img-fluid"
                    alt=""
                  />
                </div>
              </div>
              <div className="row border-bottom align-items-center py-3">
                <div className="col-lg-9">
                  <h4 className="text-dark fw-semibold fs-4">
                    2 Make it stand out
                  </h4>
                  <h6 className="text-secondary fs-6 fw-normal">
                    Make it stand out Add 5 or more photos plus a title and
                    description – we’ll help you out.
                  </h6>
                </div>
                <div className="col-lg-3">
                  <img
                    src="https://a0.muscache.com/4ea/air/v2/pictures/bfc0bc89-58cb-4525-a26e-7b23b750ee00.jpg"
                    className="img-fluid"
                    alt=""
                  />
                </div>
              </div>
              <div className="row align-items-center py-3">
                <div className="col-lg-9">
                  <h4 className="text-dark fw-semibold fs-4">
                    3 Finish up and publish
                  </h4>
                  <h6 className="text-secondary fs-6 fw-normal">
                    Choose a starting price, verify a few details, then publish
                    your listing.
                  </h6>
                </div>
                <div className="col-lg-3">
                  <img
                    src="https://a0.muscache.com/4ea/air/v2/pictures/c0634c73-9109-4710-8968-3e927df1191c.jpg"
                    className="img-fluid"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="progress-line-straight">
        <div className="progress-line text-end me-5">
          <button className="btn getStarted px-4" disabled={loading} onClick={handleGetStarted}>
            {loading ? <BeatLoader color="#010101" size={10} /> : 'Get Started'}  
          </button>
        </div>
      </div>
    </section>
  );
};

export default HostingOverview;
