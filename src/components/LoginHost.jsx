import React from "react";
import AuthForm from "./AuthForm";

const LoginHost = () => {
  return (
    <div className="container">
      <div className="row justify-content-center mt-5 pt-5">
        <div className="col-lg-6">
          <div className="card rounded-4 border-1 border-semidark overflow-hidden">
            <div className="card-header text-center p-3 bg-white">
              <h6 className="card-title mb-0">Log in or Sign up</h6>
            </div>
            <div className="card-body">
              <AuthForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginHost;
