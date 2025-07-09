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
              <h4 className="fs-5 fw-semibold">Finish your listing</h4>

              {properties.map((property) => (
                <div className="card rounded-4 my-4">
                  <div className="card-body d-flex align-items-center flex-row">
                    
                      {property.name}
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
