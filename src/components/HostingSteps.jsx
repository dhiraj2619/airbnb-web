import React, { useEffect, useState } from "react";

const steps = [
  "about-your-place",
  "property-type",
  "privacy-type",
  "location",
  "speciality",
  "amenities",
  "photos",
  "pricing",
  "house-rules",
  "publish",
];

const HostingSteps = ({ currentStep }) => {
  const currentStepIndex = steps.indexOf(currentStep);
  const targetScale = (currentStepIndex + 1) / steps.length;

  const [progressScale, setProgressScale] = useState(targetScale);

  useEffect(() => {
    if (targetScale !== progressScale) {
      setProgressScale(targetScale);
    }
  }, [targetScale]);

  return (
    <div
      className="hosting-progress-wrapper"
      style={{
        height: "6px",
        backgroundColor: "#eee",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div
        style={{
          transform: `scaleX(${progressScale})`,
          transformOrigin: "left",
          height: "100%",
          backgroundColor: "#222",
          width: "100%",
          transition: "transform 600ms linear",
        }}
      ></div>
    </div>
  );
};

export default HostingSteps;
