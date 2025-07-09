import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHostProperties } from "../redux/actions/PropertyAction";

const HostListings = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const { properties } = useSelector((state) => state.properties);

  useEffect(() => {
    dispatch(fetchHostProperties(user._id));
  }, [dispatch]);

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
                <div className="card rounded-4 my-4" style={{ cursor: "pointer",height:'90px' }} key={property._id}>
                  <div className="card-body d-flex align-items-center flex-row gap-4 px-4">
                       <i className="bi bi-house-fill fs-4"></i>
                       <h4 className="fs-6 mb-0">Your Property Listing</h4>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HostListings;
