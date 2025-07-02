import React, { useEffect, useState } from "react";
import "./css/input.css";
import { useDispatch, useSelector } from "react-redux";
import {
  checkUserExists,
  LoginWithEmail,
  RegisterUser,
} from "../redux/actions/UserAction";
import Beatloader from "react-spinners/BeatLoader";
import { Link, useNavigate } from "react-router-dom";
import GoogleLoginButton from "../UI/GoogleLoginButton";

const AuthForm = ({
  closeOnAuthAction,
  onStateChange,
  stageFromParent,
  role = "user",
}) => {
  const {
    user,
    userExists,
    loading,
    existingUser,
    isAuthenticated,
    error: reduxError,
  } = useSelector((state) => state.users);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    dateofbirth: "",
    password: "",
    email: "",
  });

  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [stage, setStage] = useState("check");
  const [emailChecked, setEmailChecked] = useState(false);

  const clearError = () => {
    if (error) setError("");
    if (Object.keys(fieldErrors).length) setFieldErrors({});
  };

  useEffect(() => {
    if (onStateChange) onStateChange(stage);
  }, [stage]);

  useEffect(() => {
    if (!emailChecked || loading) return;

    if (userExists === true) {
      setStage("login");
    } else if (userExists === false) {
      setStage("signup");
    }
  }, [userExists, loading, emailChecked]);

  useEffect(() => {
    if (stageFromParent === "check") {
      setStage("check");
      setEmailChecked(false);
      setEmail("");
      setPassword("");
      setSignupData({
        firstName: "",
        lastName: "",
        mobile: "",
        password: "",
        dateofbirth: "",
      });
      setError("");
    }
  }, [stageFromParent]);

  useEffect(() => {
    if (isAuthenticated && closeOnAuthAction) {
      closeOnAuthAction();
    }
  }, [isAuthenticated, closeOnAuthAction]);

  useEffect(() => {
    if (reduxError) setError(reduxError);
  }, [reduxError]);

  const handleContinue = async () => {
    clearError();

    try {
      const trimmed = email.trim().toLowerCase();

      if (!trimmed) return setError("Please enter an email address.");
      if (!/^\S+@\S+\.\S+$/.test(trimmed)) {
        return setError("Please enter a valid email address.");
      }

      setEmailChecked(true);
      dispatch(checkUserExists(trimmed));
    } catch (error) {
      setError("Authentication failed");
    }
  };

  const handleSignUp = async () => {
    console.log("[SIGN-UP] handleSignUp clicked");
    clearError();

    const { firstName, lastName, mobile, password, dateofbirth } = signupData;

    const newErrors = {};

    if (!firstName) newErrors.firstName = "first name is required";
    if (!lastName) newErrors.lastName = "last name is required";
    if (!email) newErrors.email = "email is required";
    if (!mobile) newErrors.mobile = "mobile is required";
    if (!dateofbirth) newErrors.dateofbirth = "Date of birth is required";
    if (!password) newErrors.password = "password is required";
    else if (password.length < 8) {
      newErrors.password = "password should at least 8 characters";
    }

    if (dateofbirth) {
      const dob = new Date(dateofbirth);
      const today = new Date();

      let age = today.getFullYear() - dob.getFullYear();
      const monthDiff = today.getMonth() - dob.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < dob.getDate())
      ) {
        age--;
      }

      if (age < 18) {
        newErrors.dateofbirth = "Your must be atleast 18 years old";
      }
    }

    if (Object.keys(newErrors).length) {
      setFieldErrors(newErrors);
      return;
    }

    const res = await dispatch(
      RegisterUser({
        firstName,
        lastName,
        email,
        mobile,
        dateofbirth,
        password,
        role,
      })
    );

    if (res) {
      if (user?.role === "host") {
        navigate("/hosting");
      } else if (user?.role === "user") {
        navigate("/");
      }
    }
  };
  const handleLogin = async () => {
    clearError();

    if (!email.trim()) return setError("Email is required");
    if (!password.trim()) return setError("Password is required");

    const loginRes = await dispatch(LoginWithEmail(email, password));

    if (loginRes?.success) {
      closeOnAuthAction();

      if (loginRes.user.role === "host") navigate("/hosting");
      else navigate("/");
    }
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
                  clearError();
                }}
              />
              <label htmlFor="floatingInput">Email</label>
            </div>

            <div className="my-3">
              <p className="fs-small">
                We’ll call or text you to confirm your number. Standard message
                and data rates apply.
              </p>
            </div>

            <ErrorCard />
            <button
              className="btn submitbtn w-100"
              onClick={handleContinue}
              disabled={loading}
            >
              {loading ? <Beatloader color="#fff" size={10} /> : "Continue"}
            </button>

            <div className="text-center my-4">
              <h6 className="fs-small fw-semibold ortext">OR</h6>
            </div>

            <GoogleLoginButton
              onIncompleteProfile={(user) => {
                setStage("signup");
                setSignupData({
                  firstName: user.firstName || user.name?.split(" ")[0] || "",
                  lastName: user.lastName || user.name?.split(" ")[1] || "",
                  email: user.email || "",
                  mobile: user.mobile || "",
                  dateofbirth: user.dateofbirth
                    ? new Date(user.dateofbirth).toISOString().slice(0, 10)
                    : "",
                  password: "",
                });
                setEmail(user.email || "");
              }}
            />

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
          {existingUser?.googleId ? (
            <>
              <div className="my-3 d-flex justify-content-center">
                <div className="user-profile d-flex justify-content-center align-items-center">
                  <h3 className="fs-1 text-white">
                    {existingUser.firstName.charAt(0)}
                  </h3>
                </div>
              </div>
              <GoogleLoginButton />

              <div className="mt-3 d-flex flex-row justify-content-start align-items-center">
                <span className="text-dark fs-normal fw-normal">Not You? </span>
                <Link
                  className="btn btn-link text-dark fs-normal fw-bold"
                  onClick={() => setStage("check")}
                >
                  Use Another Account
                </Link>
              </div>
            </>
          ) : (
            <>
              {" "}
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
              <button
                className="btn submitbtn w-100"
                disabled={loading}
                onClick={handleLogin}
              >
                Login
              </button>
              <div className="mt-3 d-flex flex-column justify-content-start align-items-start">
                <Link className="btn btn-link text-dark fs-normal fw-normal px-0 py-2">
                  Forgotten your password?
                </Link>
                <Link className="btn btn-link text-dark fs-normal fw-normal mt-1 px-0 py-1">
                  More login options
                </Link>
              </div>
            </>
          )}
        </>
      )}
      {stage === "signup" && (
        <>
          <h5 className="fs-6">Legal Name</h5>
          <div className="combine-inputs mt-3 mb-4 rounded-2">
            <div className="form-floating border-1 border-bottom">
              <input
                type="text"
                className={`form-control border-0 ${
                  fieldErrors.firstName ? "is-invalid" : ""
                }`}
                placeholder="First Name"
                id="fname"
                value={signupData.firstName}
                onChange={(e) =>
                  setSignupData({ ...signupData, firstName: e.target.value })
                }
              />
              <label>First Name</label>
            </div>
            <div className="form-floating">
              <input
                type="text"
                name="lastName"
                className={`form-control border-0 ${
                  fieldErrors.lastName ? "is-invalid" : ""
                }`}
                placeholder="Last Name"
                value={signupData.lastName}
                onChange={(e) =>
                  setSignupData({ ...signupData, lastName: e.target.value })
                }
              />
              <label>Last Name</label>
            </div>
          </div>

          {fieldErrors.firstName && (
            <div className="invalid-feedback">{fieldErrors.firstName}</div>
          )}

          <p className="fs-small text-secondary">
            Make sure this matches the name on your government ID. If you go by
            another name, you can add a preferred first name.
          </p>

          <h5 className="fs-6 mb-3">Date of Birth</h5>
          <div className="form-floating mb-3">
            <input
              type="date"
              className={`form-control ${
                fieldErrors.dateofbirth ? "is-invalid" : ""
              }`}
              value={signupData.dateofbirth}
              name="dateofbirth"
              onChange={(e) =>
                setSignupData({ ...signupData, dateofbirth: e.target.value })
              }
            />
            <label>Date of Birth</label>
            {fieldErrors.dateofbirth && (
              <div className="invalid-feedback">{fieldErrors.dateofbirth}</div>
            )}
          </div>

          <p className="fs-small text-secondary">
            To sign up, you need to be at least 18. Your birthday won’t be
            shared with other people who use Airbnb.
          </p>

          <h5 className="fs-6 mb-3">Contact Info</h5>
          <div className="combine-inputs mt-3 mb-4 rounded-2">
            <div className="form-floating border-1 border-bottom">
              <input
                type="email"
                name="email"
                className="form-control border-0"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setFieldErrors((prev) => ({ ...prev, email: undefined }));
                }}
              />
              <label>Email</label>
            </div>

            <div className="form-floating">
              <input
                type="tel"
                className="form-control border-0"
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
          </div>

          <h5 className="fs-6 mb-3">Password</h5>
          <div className="form-floating mb-3">
            <input
              type="password"
              className={`form-control ${
                fieldErrors.password ? "is-invalid" : ""
              }`}
              placeholder="Password"
              value={signupData.password}
              onChange={(e) =>
                setSignupData({ ...signupData, password: e.target.value })
              }
            />
            <label>Password</label>
            {fieldErrors.password && (
              <div className="invalid-feedback">{fieldErrors.password}</div>
            )}
          </div>

          <ErrorCard />
          <button
            className="btn submitbtn w-100"
            disabled={loading}
            onClick={handleSignUp}
          >
            {loading ? <Beatloader color="#fff" size={10} /> : "Sign up"}
          </button>
        </>
      )}
    </div>
  );
};

export default AuthForm;
