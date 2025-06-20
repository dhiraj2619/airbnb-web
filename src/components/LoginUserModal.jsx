import React from "react";
import AuthForm from "./AuthForm";

const LoginUserModal = ({ onModalClose, BackdropLogin }) => {
  return (
    <>
      <div className="modal fade show d-block fade-down">
        <div className="modal-dialog modal-dialog-centered" style={{maxWidth:'600px'}}>
          <div className="modal-content rounded-5">
            <div className="modal-header p-4">
              <h6 className="modal-title text-center">
                 Log in or Sign up
              </h6>
              <button
                type="button"
                className="btn-close"
                onClick={onModalClose}
              ></button>
            </div>
            <div className="modal-body">
                <AuthForm/>
            </div>
           
          </div>
        </div>
      </div>

      {BackdropLogin}
    </>
  );
};

export default LoginUserModal;
