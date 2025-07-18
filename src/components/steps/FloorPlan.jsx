import React, { useEffect, useState } from "react";
import HostingSteps from "../HostingSteps";
import { useDispatch, useSelector } from "react-redux";
import {
  getPrivacyOptionByID,
  updatePropertyStep,
} from "../../redux/actions/PropertyAction";

const FloorPlan = ({ onNext, onBack, currentStep, propertyId }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("authToken");
  const privacyId = localStorage.getItem("privacyId");
  const propertyTypeId = localStorage.getItem("pendingPropertyTypeId");
  const categoryId = localStorage.getItem("categoryId");

  const { selectedPrivacyId } = useSelector((state) => state.privacyOptions);

  const [counts, setCounts] = useState({
    beds: 1,
    bathrooms: 1,
    guests: 1,
    bedrooms: selectedPrivacyId?.extraBedrooms ? 1 : 0,
    locksToAllBedrooms: false,
  });

  useEffect(() => {
    if (privacyId && token) {
      dispatch(getPrivacyOptionByID(privacyId, token));
    }
  }, [dispatch, privacyId, token]);

  const extraBedRooms = selectedPrivacyId?.extraBedrooms;

  const floorPlan = ["beds", "bathrooms", "guests"];

  if (extraBedRooms) {
    floorPlan.push("bedrooms");
  }

  const handleIncrement = (item) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [item]: prevCounts[item] + 1,
    }));
  };

  const handleDecrement = (item) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [item]: Math.max(1, prevCounts[item] - 1),
    }));
  };

  const handleClickNext = async () => {
    const payload = {
      ...counts,
      propertyType: propertyTypeId,
      privacyType: selectedPrivacyId?._id || privacyId,
      category: categoryId,
      locksToAllBedrooms: counts.locksToAllBedrooms || false,
    };

    if (!extraBedRooms) {
      delete payload.bedrooms;
    }

    try {
      await dispatch(updatePropertyStep(propertyId, payload, token));
      onNext();
    } catch (error) {
      console.error("Error updating property step:", error);
    }
  };

  return (
    <section className="" style={{ height: "590px" }}>
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-6">
            <h3 className="fw-semibold fs-3">
              Share some basics about your place
            </h3>
            <h5 className="fw-dark text-dark fs-5 mt-4 mb-3">
              How many people can stay here?
            </h5>

            <div className="mb-2">
              {floorPlan.map((item, index) => (
                <div
                  className="d-flex justify-content-between align-items-center border-bottom py-4"
                  key={index}
                >
                  <span
                    className="fs-5 text-dark fw-normal"
                    style={{ textTransform: "capitalize" }}
                  >
                    {item}
                  </span>
                  <div className="d-flex flex-row align-items-center gap-3">
                    <button
                      className="btn countbtn  btn-sm"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleDecrement(item)}
                    >
                      -
                    </button>
                    <span className="fs-6">{counts[item]}</span>
                    <button
                      className="btn countbtn  btn-sm"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => handleIncrement(item)}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <h5 className="fw-dark text-dark fs-5 mt-4 mb-3">
                Does every bedroom have a lock?
              </h5>

              <div className="form-check form-check-online">
                <input
                  type="radio"
                  className="form-check-input"
                  name="bedroomLock"
                  id="bedroomLockYes"
                  value="yes"
                  checked={counts.locksToAllBedrooms === true}
                  onChange={() =>
                    setCounts((prev) => ({ ...prev, locksToAllBedrooms: true }))
                  }
                />
                <label className="form-check-label" htmlFor="bedroomLockYes">
                  Yes
                </label>
              </div>
              <div className="form-check form-check-online mt-3">
                <input
                  type="radio"
                  className="form-check-input"
                  name="bedroomLock"
                  id="bedroomLockNo"
                  value="no"
                  checked={counts.locksToAllBedrooms === false}
                  onChange={() =>
                    setCounts((prev) => ({ ...prev, locksToAllBedrooms: false }))
                  }
                />
                <label className="form-check-label" htmlFor="bedroomLockYes">
                  No
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <HostingSteps currentStep={currentStep} />
      <div className="d-flex justify-content-between pt-3 px-4 ">
        <button
          className="btn text-dark fs-xlg btn-link px-5 py-2"
          onClick={onBack}
        >
          Back
        </button>
        <button
          className="btn btn-dark fs-xlg px-4 py-2"
          onClick={handleClickNext}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default FloorPlan;
