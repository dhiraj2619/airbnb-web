import axios from "axios";
import React, { useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import HostingSteps from "../HostingSteps";
import { useDispatch } from "react-redux";
import {
  getPropertyById,
  updateLocationofProperty,
} from "../../redux/actions/PropertyAction";

const Location = ({ onNext, onBack, currentStep, propertyId }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("authToken");

  const [pincode, setPincode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [flatHouse, setFlatHouse] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [loadingPincode, setLoadingPincode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingBack, setLoadingBack] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const property = await dispatch(getPropertyById(propertyId, token));

        console.log("Fetched Property:", property);

        const fullAddress = property.location.address;
        const parts = fullAddress.split(",").map((p) => p.trim());

        // Make sure there are at least 3 parts
        let flatHouse = "";
        let streetAddress = "";
        let pincode = "";

        if (parts.length >= 3) {
          flatHouse = parts[0];
          pincode = parts[parts.length - 1];
          streetAddress = parts.slice(1, parts.length - 1).join(", ");
        }

        if (property) {
          setCity(property.location.city || "");
          setState(property.location.state || "");
          setFlatHouse(flatHouse || "");
          setStreetAddress(streetAddress || "");

          if (property.location.pincode) {
            setPincode(pincode);
          }
        }
      } catch (error) {
        console.error("Failed to load property location", error);
      }
    };

    fetchData();
  }, [dispatch, propertyId, token]);

  const handlePincodeChange = async (e) => {
    const value = e.target.value;
    setPincode(value);

    if (value.length === 6) {
      try {
        setLoadingPincode(true);

        const res = await axios.get(
          `https://api.postalpincode.in/pincode/${value}`
        );
        const data = res.data[0];

        if (data.Status === "Success" && data.PostOffice.length > 0) {
          const postOffice = data.PostOffice[0];

          setCity(postOffice.District);
          setState(postOffice.State);
          setError("");
        } else {
          setCity("");
          setState("");
          setError("Invalid pincode");
        }
      } catch (error) {
        console.error(error);
        setCity("");
        setState("");
        setError("Failed to fetch location");
      } finally {
        setLoadingPincode(false);
      }
    } else {
      setCity("");
      setState("");
      setError("");
    }
  };

  const handleNextLocation = async () => {
    if (loading) return;
    setLoading(true);
    const token = localStorage.getItem("authToken");

    try {
      await dispatch(
        updateLocationofProperty(
          propertyId,
          {
            city,
            state,
            flatHouse,
            streetAddress,
            pincode,
          },
          token
        )
      );

      setTimeout(() => {
        setLoading(false);
        onNext();
      }, 2000);
    } catch (error) {
      console.error("Error updating location", error);
      setError("Could not update location");
    }
  };
  const handleClickBack = () => {
    if (loading) return;
    setLoadingBack(true);
    setTimeout(() => {
      onBack();
      setLoadingBack(false);
    }, 1200);
  };
  return (
    <section className="" style={{ height: "520px" }}>
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-items-center">
          <div className="col-lg-6">
            <h3 className="fw-semibold fs-3">Confirm Your Address</h3>
            <span className="fw-light text-center text-dark fs-5">
              Your address is only shared with guests after they’ve made a
              reservation.
            </span>

            <div className="mt-4">
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control authInput"
                  disabled
                  value="India - IN"
                />
                <label htmlFor="floatingInput">Select Country</label>
              </div>

              <div className="combine-inputs mt-3 mb-4 rounded-2">
                <div className="form-floating border-1 border-bottom">
                  <input
                    type="text"
                    name=""
                    className="form-control border-0"
                    placeholder="Pincode"
                    onChange={handlePincodeChange}
                    value={pincode}
                    maxLength="6"
                  />
                  <label>Pincode</label>
                  {loadingPincode && (
                    <div className="position-absolute top-50 end-0 translate-middle-y me-3">
                      <BeatLoader size={8} color="#6c757d" />
                    </div>
                  )}
                </div>
                <div className="form-floating border-1 border-bottom">
                  <input
                    type="text"
                    name=""
                    disabled
                    className="form-control border-0"
                    placeholder="District/locality"
                    value={city}
                  />
                  <label>City</label>
                </div>
                <div className="form-floating border-1 border-bottom">
                  <input
                    type="text"
                    name=""
                    disabled
                    className="form-control border-0"
                    placeholder="District/locality"
                    value={state}
                  />
                  <label>State</label>
                </div>
                <div className="form-floating border-bottom">
                  <input
                    type="text"
                    className="form-control border-0"
                    placeholder="Flat,House,etc (if Applicable)"
                    maxLength="50"
                    value={flatHouse}
                    onChange={(e) => setFlatHouse(e.target.value)}
                  />
                  <label>Flat,House,etc (if Applicable)</label>
                </div>
                <div className="form-floating border-1 border-bottom">
                  <input
                    type="text"
                    name=""
                    className="form-control border-0"
                    placeholder="Street Address"
                    value={streetAddress}
                    onChange={(e) => setStreetAddress(e.target.value)}
                  />
                  <label>Street address</label>
                </div>

                {error && <div className="text-danger mt-2">{error}</div>}
              </div>
            </div>
          </div>
        </div>
      </div>

      <HostingSteps currentStep={currentStep} />
      <div className="d-flex justify-content-between px-4 pt-3">
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
          onClick={handleNextLocation}
          disabled={loading}
          style={{ backgroundColor: loading ? "#807c7cff" : "" }}
        >
          {loading ? <BeatLoader size={8} color="#fff" /> : "Next"}
        </button>
      </div>
    </section>
  );
};

export default Location;
