import React, { useEffect, useState } from "react";
import HostingSteps from "../HostingSteps";
import { useDispatch, useSelector } from "react-redux";
import { fetchPrivacyOptions } from "../../redux/actions/PropertyTypeAction";

const PrivacyType = ({ onBack, onNext ,currentStep}) => {
  const { privacyOptions } = useSelector((state) => state.privacyOptions);
  const dispatch = useDispatch();

  const [selectedPrivacyId, setSelectedPrivacyId] = useState(null);

  useEffect(() => {
    const propertyTypeId = localStorage.getItem("pendingPropertyTypeId");

    if (propertyTypeId) {
      dispatch(fetchPrivacyOptions(propertyTypeId));
    }
  }, [dispatch]);


  const handleSelect=(id)=>{
      setSelectedPrivacyId(id);
  }

  return (
    <section className="" style={{ height: "520px" }}>
      <div className="container-fluid h-100">
        <div className="row justify-content-center  h-100">
          <span className="fw-semibold text-center text-dark fs-2">
            What type of place will guests have?
          </span>
          <div className="col-lg-5">
            <div className="row gy-3">
              {privacyOptions.map((option) => (
                <div className="col-lg-12" key={option._id}>
                  <div className={`card rounded-4 ${selectedPrivacyId === option._id ? 'border-tight':''}`} style={{ height: "120px",cursor:'pointer' }} onClick={()=>handleSelect(option._id)}>
                    <div className="card-body d-flex flex-row align-items-center justify-content-between gap-5">
                      <div className="flex-column">
                        <h4 className="text-dark fs-5">{option.name}</h4>
                        <span className="fs-small text-secondary fw-normal">
                          {option.description}
                        </span>
                      </div>

                      <img
                        src={option.thumbnail?.url}
                        className="img-fluid"
                        width="45px"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <HostingSteps currentStep={currentStep} />
      <div className="d-flex justify-content-between px-4 pt-3">
        <button
          className="btn text-dark fs-xlg btn-link px-5 py-2"
          onClick={onBack}
        >
          Back
        </button>
        <button className="btn btn-dark fs-xlg px-4 py-2" onClick={onNext} disabled={!selectedPrivacyId}>
          Next
        </button>
      </div>
    </section>
  );
};

export default PrivacyType;
