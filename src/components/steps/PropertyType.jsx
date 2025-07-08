import React, { useEffect, useState } from "react";
import HostingSteps from "../HostingSteps";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPropertyTypes } from "../../redux/actions/PropertyTypeAction";

const PropertyType = ({ onNext,onBack}) => {
  const { propertyTypes } = useSelector((state) => state.propertyTypes);
  const [selectedTypeId, setSelectedTypeId] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(()=>{
      dispatch(fetchAllPropertyTypes());

      const storedId = localStorage.getItem("pendingPropertyTypeId");

      if(storedId){
        setSelectedTypeId(storedId);
      }
  },[dispatch]);

  const handleSelect=(id)=>{
     setSelectedTypeId(id);
     localStorage.setItem("pendingPropertyTypeId", id);
  }

  return (
    <section className="" style={{ height: "520px" }}>
      <div className="container-fluid h-100">
        <div className="row justify-content-center  h-100">
           <span className="fw-semibold text-center text-dark fs-2">What would you like to host ?</span>
          <div className="col-lg-7">
          
            <div className="row">
              {propertyTypes.map((property) => (
                <div className="col-lg-4" key={property._id}>
                  <div
                    className={`card rounded-4 ${
                      selectedTypeId === property._id ? "border-tight" : ""
                    }`}
                    onClick={() => handleSelect(property._id)}
                  >
                    <div className="card-body d-flex flex-column align-items-center justify-content-center">
                      <img
                        src={property.thumbnail?.url}
                        className="img-fluid"
                        width={60}
                        alt=""
                      />

                      <div className="property-text">
                        <h6 className="card-title mt-3">{property.name}</h6>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
        <button className="btn btn-dark fs-xlg px-5 py-2" disabled={!selectedTypeId} onClick={()=>{
           if(selectedTypeId){
             localStorage.setItem("pendingPropertyTypeId",selectedTypeId);
             onNext();
           }
        }}>
          Next
        </button>
      </div>
    </section>
  );
};

export default PropertyType;
