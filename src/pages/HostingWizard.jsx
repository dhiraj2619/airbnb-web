import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Aboutplace from "../components/steps/Aboutplace";
import PropertyType from "../components/steps/PropertyType";
import PrivacyType from "../components/steps/PrivacyType";

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

  useEffect(() => {
    const savedStep = localStorage.getItem(`listing-progress-${propertyId}`);

    if (!step && savedStep) {
      navigate(`/hosting/${propertyId}/${savedStep}`);
    }
  }, [step, propertyId, navigate]);

  useEffect(() => {
    if (step) {
      localStorage.setItem(`listing-progress-${propertyId}`, step);
    }
  }, [step, propertyId]);

  const currentStepIndex = stepsOrder.indexOf(step);
  console.log(`Current step: ${step}, Index: ${currentStepIndex}`);

  const goToNextStep = () => {
    if (currentStepIndex < stepsOrder.length - 1) {
      const nextStep = stepsOrder[currentStepIndex + 1];
      navigate(`/hosting/${propertyId}/${nextStep}`);
    } else {
      console.log("No more steps to navigate to.");
    }
  };

  const goToPreviousStep = () => {
    if (currentStepIndex > 0) {
      const previousStep = stepsOrder[currentStepIndex - 1];
      navigate(`/hosting/${propertyId}/${previousStep}`);
    } else {
      console.log("Already at the first step.");
    }
  };
  const renderStepComponent = () => {
    const stepProps = {
      onNext: goToNextStep,
      onBack: goToPreviousStep,
      currentStep: step,
    };
    switch (step) {
      case "about-your-place":
        return <Aboutplace {...stepProps} />;

      case "property-type":
        return <PropertyType {...stepProps} />;

      case "privacy-type":
        return <PrivacyType {...stepProps} />;

      default:
        return <div>Step not found</div>;
    }
  };

  return (
    <div>
      <div className="mt-4">{renderStepComponent()}</div>
    </div>
  );
};

export default HostingWizard;
