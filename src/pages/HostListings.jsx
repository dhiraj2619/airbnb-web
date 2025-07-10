import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHostProperties } from "../redux/actions/PropertyAction";
import { Link, useNavigate } from "react-router-dom";

const HostListings = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const { properties } = useSelector((state) => state.properties);
  const navigate = useNavigate();

  useEffect(() => {

    if(user && user._id){
      dispatch(fetchHostProperties(user._id));
    }
  }, [dispatch,user]);
  

  const handleResumeListings=(propertyId)=>{
     const savedStep = localStorage.getItem(`listing-progress-${user._id}-${propertyId}`);

     const startStep = savedStep || "about-your-place";
     navigate(`/hosting/${propertyId}/${startStep}`);
  }


  return (
    <>
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <h2 className="text-dark fw-semibold fs-2">
              Welcome back, {user.firstName}
            </h2>

            <div className="listing mt-4">
              <h4 className="fs-5 fw-semibold mb-5">Finish your listing</h4>

              {properties.map((property) => (
                <div
                  className="card propertyfillcard rounded-4 my-4"
                  style={{ cursor: "pointer", height: "90px" }}
                  onClick={()=>handleResumeListings(property._id)}
                  key={property._id}
                >
                  <div className="card-body d-flex align-items-center flex-row gap-4 px-4">
                    <i className="bi bi-house-fill fs-4"></i>
                    <h4 className="fs-6 mb-0">Your Property Listing</h4>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5">
              <h4 className="fs-5 fw-semibold mb-2">Start a new listing</h4>

              <Link
                to="/hosting/overview"
                className="d-flex flex-row align-items-center nav-link justify-content-between py-4"
                style={{ cursor: "pointer" }}
              >
                <div className="d-flex gap-4 align-items-center">
                  <i class="bi bi-house-add fs-2"></i>
                  <span className="fs-6">Create a new listing</span>
                </div>

                <i class="bi bi-chevron-right fs-5"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HostListings;
