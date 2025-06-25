import React, { useState } from "react";
import AuthForm from "./AuthForm";

const LoginUserModal = ({ onModalClose, BackdropLogin }) => {

  const [formStage, setFormStage] = useState("check");

   const getTitle = () => {
    switch (formStage) {
      case "login":
        return "Login to Your Account";

      case "signup":
        return "Finish Signing up";

      default:
        return "Log in or Sign up";
    }
  };
  return (
    <>
      <div className="modal fade show d-block fade-down">
        <div className="modal-dialog modal-dialog-centered" style={{maxWidth:'600px'}}>
          <div className="modal-content rounded-5">
            <div className="modal-header p-4">
              <h6 className="modal-title text-center position-relative">
                 {(formStage === "login" ||
                formStage === "signup") && 
                 ( <button onClick={()=>setFormStage("check")}
                    className="position-absolute start-0 px-3"
                    style={{ background: "none", border: "none" }}
                  >
                    <i className="bi bi-arrow-left fs-5"></i>
                  </button>)
                }
                <span className="text-center ps-5">
               { getTitle()}
                </span>
              </h6>
              <button
                type="button"
                className="btn-close"
                onClick={onModalClose}
              ></button>
            </div>
            <div className="modal-body">
                <AuthForm stageFromParent={formStage}  onStateChange={setFormStage}/>
            </div>
           
          </div>
        </div>
      </div>

      {BackdropLogin}
    </>
  );
};

export default LoginUserModal;
