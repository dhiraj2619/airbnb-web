import React from "react";

const Location = () => {
  return (
    <section className="" style={{ height: "520px" }}>
      <div className="container h-100">
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
                <label for="floatingInput">Select Country</label>
              </div>

              <div className="combine-inputs mt-3 mb-4 rounded-2">
           
                <div className="form-floating border-1 border-bottom">
                  <input
                    type="text"
                    name=""
                    className="form-control border-0"
                    placeholder="District/locality"
                  />
                  <label>Pincode</label>
                </div>
                <div className="form-floating border-1 border-bottom">
                  <input
                    type="text"
                    name=""
                    disabled
                    className="form-control border-0"
                    placeholder="District/locality"
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
                  />
                  <label>State</label>
                </div>
                <div className="form-floating border-bottom">
                  <input
                    type="text"
                    className="form-control border-0"
                    placeholder="Mobile Number"
                    maxLength="10"
                  />
                  <label>Flat,House,etc (if Applicable)</label>
                </div>
                <div className="form-floating border-1 border-bottom">
                  <input
                    type="text"
                    name=""
                    className="form-control border-0"
                    placeholder="Street Address"
                  />
                  <label>Street address</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
