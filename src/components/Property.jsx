import React from "react";

const Property = () => {
  return (
    <div className="container d-flex flex-row align-items-center gap-5 py-3">
      <div className="property d-flex flex-column text-center">
        <div className="property-icon">
             <img src={require('../assets/img/beachfront.png')} className="img-fluid" alt="" />
        </div>
        <span className="property-text fs-small">Beachfront</span>
      </div>
      <div className="property d-flex flex-column text-center">
        <div className="property-icon">
             <img src={require('../assets/img/lake.png')} className="img-fluid" alt="" />
        </div>
        <span className="property-text fs-small">LakeSide</span>
      </div>
    </div>
  );
};

export default Property;
