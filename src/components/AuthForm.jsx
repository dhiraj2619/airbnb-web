import React, { useEffect, useState } from "react";
import "./css/input.css";
import { useDispatch, useSelector } from "react-redux";
import { checkUserExists } from "../redux/actions/UserAction";

const AuthForm = ({onStateChange}) => {
  const {
    userExists,
    loading,
    error: reduxError,
  } = useSelector((state) => state.users);

  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [stage, setStage] = useState("check");
  const [emailChecked, setEmailChecked] = useState(false);

  const clearError = () => error && setError("");


  useEffect(()=>{
    if(onStateChange) onStateChange(stage);
  },[stage])
  useEffect(() => {
    if (!emailChecked || loading) return;

    if (userExists === true) {
      setStage("login");
    } else if (userExists === false) {
      setStage("signup");
    }
  }, [userExists, loading, emailChecked]);

  useEffect(() => {
    if (reduxError) setError(reduxError);
  }, [reduxError]);

  const handleContinue = async () => {
    clearError();

    const trimmed = email.trim().toLowerCase();

    if (!trimmed) return setError("Please enter an email address.");
    if (!/^\S+@\S+\.\S+$/.test(trimmed)) {
      return setError("Please enter a valid email address.");
    }

    setEmailChecked(true);
    dispatch(checkUserExists(trimmed));
  };

 const ErrorCard = () => {
  if (!error) return null;

  return (
    <div className="card rounded-4 my-4">
      <div className="card-body d-flex flex-row gap-3 align-items-center">
        <span>
          <svg
            fill="#e07912"
            width="23px"
            height="23px"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g>
              <path d="M15.83,13.23l-7-11.76a1,1,0,0,0-1.66,0L.16,13.3c-.38.64-.07,1.7.68,1.7H15.2C15.94,15,16.21,13.87,15.83,13.23Zm-7,.37H7.14V11.89h1.7Zm0-3.57H7.16L7,4H9Z" />
            </g>
          </svg>
        </span>
        <span className="fs-lg">{error}</span>
      </div>
    </div>
  );
};


  return (
    <div className="p-3 authcard">
      

      {stage === "check" && (
        <div className="mt-3">
          <>
          <h4 className="mb-4">Welcome to Airbnb</h4>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control authInput"
                id="floatingInput"
                placeholder="Enter Email"
                value={email}
                name="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError("");
                }}
              />
              <label for="floatingInput">Email</label>
            </div>

            <div className="my-3">
              <p className="fs-small">
                We’ll call or text you to confirm your number. Standard message
                and data rates apply.
              </p>
            </div>

            <ErrorCard />
            <button className="btn submitbtn w-100" onClick={handleContinue}>
              Continue
            </button>

            <div className="text-center my-4">
              <h6 className="fs-small fw-semibold ortext">OR</h6>
            </div>

            <button
              className="btn btn-outline-dark w-100 googleauthbtn"
              type="button"
            >
              <svg
                width="22px"
                height="22px"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
              >
                <path
                  fill="#4285F4"
                  d="M14.9 8.161c0-.476-.039-.954-.121-1.422h-6.64v2.695h3.802a3.24 3.24 0 01-1.407 2.127v1.75h2.269c1.332-1.22 2.097-3.02 2.097-5.15z"
                />
                <path
                  fill="#34A853"
                  d="M8.14 15c1.898 0 3.499-.62 4.665-1.69l-2.268-1.749c-.631.427-1.446.669-2.395.669-1.836 0-3.393-1.232-3.952-2.888H1.85v1.803A7.044 7.044 0 008.14 15z"
                />
                <path
                  fill="#FBBC04"
                  d="M4.187 9.342a4.17 4.17 0 010-2.68V4.859H1.849a6.97 6.97 0 000 6.286l2.338-1.803z"
                />
                <path
                  fill="#EA4335"
                  d="M8.14 3.77a3.837 3.837 0 012.7 1.05l2.01-1.999a6.786 6.786 0 00-4.71-1.82 7.042 7.042 0 00-6.29 3.858L4.186 6.66c.556-1.658 2.116-2.89 3.952-2.89z"
                />
              </svg>
              <span>Continue With Google</span>
            </button>

            <button
              className="btn btn-outline-dark w-100 googleauthbtn"
              type="button"
            >
              <svg
                width="22px"
                height="22px"
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
              >
                <path
                  fill="#1877F2"
                  d="M15 8a7 7 0 00-7-7 7 7 0 00-1.094 13.915v-4.892H5.13V8h1.777V6.458c0-1.754 1.045-2.724 2.644-2.724.766 0 1.567.137 1.567.137v1.723h-.883c-.87 0-1.14.54-1.14 1.093V8h1.941l-.31 2.023H9.094v4.892A7.001 7.001 0 0015 8z"
                />
                <path
                  fill="#ffffff"
                  d="M10.725 10.023L11.035 8H9.094V6.687c0-.553.27-1.093 1.14-1.093h.883V3.87s-.801-.137-1.567-.137c-1.6 0-2.644.97-2.644 2.724V8H5.13v2.023h1.777v4.892a7.037 7.037 0 002.188 0v-4.892h1.63z"
                />
              </svg>
              <span>Continue With Facebook</span>
            </button>
          </>
        </div>
      )}

      {stage === "login" && (
        <>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control authInput"
              id="floatingInput"
              placeholder="Enter Password"
              value={password}
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
                clearError();
              }}
            />
            <label for="floatingInput">Password</label>
          </div>
          <ErrorCard />
          <button className="btn submitbtn w-100">Login</button>
        </>
      )}
      {stage === "signup" && (
        <>
          <p className="mb-1">
            Sign up with email: <strong>{email}</strong>
          </p>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="First Name"
              value={signupData.firstName}
              onChange={(e) =>
                setSignupData({ ...signupData, firstName: e.target.value })
              }
            />
            <label>First Name</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Last Name"
              value={signupData.lastName}
              onChange={(e) =>
                setSignupData({ ...signupData, lastName: e.target.value })
              }
            />
            <label>Last Name</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              value={email}
              readOnly
            />
            <label>Email</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="tel"
              className="form-control"
              placeholder="Mobile Number"
              maxLength="10"
              value={signupData.mobile}
              onChange={(e) =>
                setSignupData({
                  ...signupData,
                  mobile: e.target.value.replace(/\D/g, ""),
                })
              }
            />
            <label>Mobile Number</label>
          </div>

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={signupData.password}
              onChange={(e) =>
                setSignupData({ ...signupData, password: e.target.value })
              }
            />
            <label>Password</label>
          </div>

          <ErrorCard />
          <button className="btn submitbtn w-100">Sign Up</button>
        </>
      )}
    </div>
  );
};

export default AuthForm;
