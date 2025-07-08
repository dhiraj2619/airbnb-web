import React from "react";
import HostingSteps from "../HostingSteps";

const PrivacyType = ({ onBack, onNext }) => {
  return (
    <section className="" style={{ height: "520px" }}>
      <div className="container-fluid h-100">
        <div className="row justify-content-center  h-100">
          <span className="fw-semibold text-center text-dark fs-2">
            What type of place will guests have?
          </span>
          <div className="col-lg-5">
            <div className="row">
              <div className="card">
                <div className="card-body d-flex flex-row align-items-center justify-content-between">
                  <div className="flex-column">
                    <h4 className="text-dark fs-4">Hello</h4>
                    <span className="fs-6 text-secondary fw-normal">
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      Accusantium odit adipisci ullam sed, libero officiis qui
                      eos quaerat tenetur, vitae consequatur magni sit nisi
                      similique cumque inventore recusandae? Suscipit, rem.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <HostingSteps currentStep="about-your-place" />
      <div className="d-flex justify-content-between px-4 pt-4">
        <button
          className="btn text-dark fs-xlg btn-link px-5 py-2"
          onClick={onBack}
        >
          Back
        </button>
        <button className="btn btn-dark fs-xlg px-5 py-2" onClick={onNext}>
          Next
        </button>
      </div>
    </section>
  );
};

export default PrivacyType;
