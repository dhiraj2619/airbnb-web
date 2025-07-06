import React from "react";

const steps = [
  "about-your-place",
  "property-type",
  "privacy-type",
  "location",
  "amenities",
  "photos",
  "pricing",
  "house-rules",
  "publish",
];

const stepLabels = {
  "about-your-place": "Place",
  structure: "Structure",
  amenities: "Amenities",
  title: "Title",
  price: "Price",
  preview: "Preview",
};

const HostingSteps = ({ currentStep }) => {
  const currentStepIndex = steps.indexOf(currentStep);
  const progressPercentage = ((currentStepIndex + 1) / steps.length) * 100;


  return (
    <div className="hosting-progress-wrapper">
      <div className="progress-line-bg">
        <div
          className="progress-line-fill"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default HostingSteps;
