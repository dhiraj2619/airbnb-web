import React, { useState } from "react";
import AuthForm from "./AuthForm";

const LoginHost = () => {

  const [formStage, setFormStage] = useState("check");


  const getTitle=()=>{
     switch(formStage){
        case 'login':
           return "Login to Your Account";
        
        case "signup":
          return "Finish Signing up";

        default :
            return "Log in or Sign up"
     }
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5 pt-5">
        <div className="col-lg-5">
          <div className="card rounded-4 border-1 border-semidark overflow-hidden">
            <div className="card-header text-center p-3 bg-white">
              <h6 className="card-title mb-0">{getTitle()}</h6>
            </div>
            <div className="card-body">
              <AuthForm  onStateChange={setFormStage}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginHost;
