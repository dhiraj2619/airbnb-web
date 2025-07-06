import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Aboutplace from "../components/steps/Aboutplace";
import PropertyType from "../components/steps/PropertyType";


const HostingWizard = () => {
  const stepsOrder = [
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

  const { step, propertyId } = useParams();
  const navigate = useNavigate();

  const currentStepIndex = stepsOrder.indexOf(step);
  console.log(`Current step: ${step}, Index: ${currentStepIndex}`);

  const goToNextStep = () => {
    if (currentStepIndex < stepsOrder.length - 1) {
      const nextStep = stepsOrder[currentStepIndex + 1];
      navigate(`/hosting/${propertyId}/${nextStep}`);
    } else {
      // Handle case when there are no more steps
      console.log("No more steps to navigate to.");
    }
  };

  const renderStepComponent = () => {
    switch (step) {
      case "about-your-place":
        return <Aboutplace onNext={goToNextStep} />;

      case "property-type":
        return <PropertyType onNext={goToNextStep} />;

      default:
        return <div>Step not found</div>;
    }
  };

  return <div>
      <div className="mt-4">
           {renderStepComponent()}
      </div>
  </div>;
};

export default HostingWizard;
