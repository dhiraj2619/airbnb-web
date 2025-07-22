import React, { useEffect, useState } from "react";
import HostingSteps from "../HostingSteps";
import { BeatLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { fetchAmenititesList } from "../../redux/actions/PropertyTypeAction";

const Amenities = ({ currentStep, onBack, OnNext }) => {
  const [loading, setLoading] = useState(false);
  const [loadingBack, setLoadingBack] = useState(false);

  const { amenities } = useSelector((state) => state.amenities);
  const propertyTypeId = localStorage.getItem("pendingPropertyTypeId");
  const token = localStorage.getItem("authToken");
  const dispatch = useDispatch();

  const handleClickBack = () => {
    if (loading) return;
    setLoadingBack(true);
    setTimeout(() => {
      onBack();
      setLoadingBack(false);
    }, 1200);
  };

  useEffect(() => {
    dispatch(fetchAmenititesList(propertyTypeId, token));
  }, [dispatch, propertyTypeId, token]);

  const guestFavourites = amenities.filter(
    (amenity) => amenity.amenityType === "guestFavorite"
  );

  const standoutAmenity = amenities.filter(
    (amenity) => amenity.amenityType === "standout"
  );

  return (
    <div className="" style={{ maxHeight: "500px", overflowY: "scroll" }}>
      <section className="">
        <div className="container-fluid h-100">
          <div className="row justify-content-center align-items-center">
            <div className="col-lg-6">
              <h3 className="fw-semibold fs-3">
                Tell guests what your place has to offer
              </h3>
              <h5 className="fw-normal text-secondary fs-5 mt-2">
                You can add more amenities after you publish your listing.
              </h5>

              <h6 className="text-dark mt-5" style={{fontWeight:'500',fontSize:'18px'}}>What about these guest favourites?</h6>

              <div className="row mt-2 gy-4">
                {guestFavourites.map((amenity) => (
                  <div className="col-lg-4">
                    <div className="card rouded-6 h-100" style={{cursor: "pointer"}}>
                      <div className="card-body d-flex flex-column align-items-center justify-content-center">
                        <img
                          src={amenity.thumbnail?.url}
                          className="img-fluid"
                          width={40}
                          alt=""
                        />

                        <div className="property-text">
                          <h6 className="card-title mt-3">{amenity.name}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              
               <h6 className="text-dark mt-5" style={{fontWeight:'500',fontSize:'18px'}}>Do you have any standout amenities?</h6>

              <div className="row mt-2 gy-4">
                {standoutAmenity.map((amenity) => (
                  <div className="col-lg-4">
                    <div className="card rouded-6 h-100" style={{cursor: "pointer"}}>
                      <div className="card-body d-flex flex-column align-items-center justify-content-center">
                        <img
                          src={amenity.thumbnail?.url}
                          className="img-fluid"
                          width={40}
                          alt=""
                        />

                        <div className="property-text">
                          <h6 className="card-title mt-3">{amenity.name}</h6>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="position-fixed w-100 bottom-0 bg-white shadow-sm py-3">
        <HostingSteps currentStep={currentStep} />
        <div className="d-flex justify-content-between pt-3 px-4 ">
          <button
            className="btn text-dark fs-xlg btn-link px-5 py-2"
            onClick={handleClickBack}
            disabled={loadingBack}
            style={{ backgroundColor: loadingBack ? "#e2dbdbff" : "" }}
          >
            {loadingBack ? <BeatLoader size={8} color="#010101" /> : "Back"}
          </button>
          <button
            className="btn btn-dark fs-xlg px-4 py-2"
            disabled={loading}
            style={{ backgroundColor: loading ? "#807c7cff" : "" }}
          >
            {loading ? <BeatLoader size={8} color="#fff" /> : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Amenities;
