import React from "react";
import HostingSteps from "../HostingSteps";
import '../../pages/css/hostingviews.css';

const Aboutplace = ({ onNext }) => {
  return (
    <section className="" style={{ height: "540px" }}>
      <div className="container-fluid h-100">
        <div className="row align-items-center h-100">
          <div className="col-lg-6">
            <span className="fw-semibold text-dark fs-5">Step 1</span>
            <h1
              className="text-dark fw-semibold mt-2"
              style={{ fontSize: "48px" }}
            >
              Tell us about your place
            </h1>
            <p className="fs-large mt-3">
              In this step, we'll ask you which type of property you have and if
              guests will book the entire place or just a room. Then let us know
              the location and how many guests can stay.
            </p>
          </div>
          <div className="col-lg-6">
            <video
              preload="auto"
              autoPlay
              muted
              loop
              className="w-100 h-100 object-fit-cover position-relative"
              style={{zIndex:-1}}
            >
              <source
                src={require("../../assets/video/propertyframe.mp4")}
                type="video/mp4"
              />
            </video>
          </div>
        </div>
      </div>

       <HostingSteps currentStep="about-your-place"/>
      <div className="d-flex justify-content-between px-4 pt-4">
        <button className="btn text-dark fs-xlg btn-link px-5 py-2" onClick={onNext}>
          Back
        </button>
        <button className="btn btn-dark fs-xlg px-5 py-2" onClick={onNext}>
          Next
        </button>
      </div>
    </section>
  );
};

export default Aboutplace;
