import React, { useState } from "react";
import { NavLink, Link, useNavigate, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  loadingToggleAction,
  signupAction,
} from "../../store/actions/AuthActions";
// image

import logo from "../../images/logo/logo-full.png";
import logoPrime from "../../images/logo/logo-prime.png";
import bg6 from "../../images/background/bg6.jpg";
import { userSignUp } from "../../Redux/user";

function Register(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    user_name: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  let errorsObj = {
    user_name: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  };

  const [errors, setErrors] = useState(errorsObj);

  const handelChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  function onSignUp(e) {
    e.preventDefault();
    let error = false;
    const errorObj = { ...errorsObj };
    if (user.email === "") {
      errorObj.email = "Email is Required";
      error = true;
    }
    if (user.password === "") {
      errorObj.password = "Password is Required";
      error = true;
    }
    if (user.last_name === "") {
      errorObj.lname = "Last Name is Required";
      error = true;
    }
    if (user.first_name === "") {
      errorObj.fname = "First Name is Required";
      error = true;
    }
    if (user.user_name === "") {
      errorObj.uname = "User Name is Required";
      error = true;
    }
    setErrors(errorObj);
    if (error) return;
    dispatch(userSignUp(user));
    navigate("/login");
  }

  return (
    <>
      <div className="page-wraper">
        <div className="browse-job login-style3">
          <div
            className="bg-img-fix overflow-hidden"
            style={{ background: "#fff url(" + bg6 + ")", height: "100vh" }}
          >
            <div className="row gx-0">
              <div className="col-xl-4 col-lg-5 col-md-6 col-sm-12 vh-100 bg-white">
                <div
                  id="mCSB_1"
                  className="mCustomScrollBox mCS-light mCSB_vertical mCSB_inside"
                  style={{ maxHeight: "653px" }}
                >
                  <div
                    id="mCSB_1_container"
                    className="mCSB_container"
                    style={{
                      position: "relative",
                      top: "0",
                      left: "0",
                      dir: "ltr",
                    }}
                  >
                    <div className="login-form style-2">
                      <div className="card-body">
                        <div className="logo-header mb-3">
                          <Link to="/login" className="logo">
                            <img
                              src={logoPrime}
                              alt=""
                              className="width-230 mCS_img_loaded"
                            />
                          </Link>
                        </div>
                        <nav className="nav nav-tabs border-bottom-0">
                          <div
                            className="tab-content w-100"
                            id="nav-tabContent"
                          >
                            <div className="tab-pane active show fade">
                              {props.errorMessage && (
                                <div className="">{props.errorMessage}</div>
                              )}
                              {props.successMessage && (
                                <div className="">{props.successMessage}</div>
                              )}
                              <form
                                className="dz-form py-2"
                                onSubmit={onSignUp}
                              >
                                <h3 className="form-title">Sign Up</h3>
                                <div className="dz-separator-outer m-b5">
                                  <div className="dz-separator bg-primary style-liner"></div>
                                </div>
                                <p>Enter your personal details below: </p>
                                <div className="form-group mt-3">
                                  <input
                                    name="first_name"
                                    value={user.first_name}
                                    onChange={(e) => handelChange(e)}
                                    className="form-control"
                                    placeholder="First Name"
                                    type="text"
                                  />
                                  {errors.first_name && (
                                    <div className="text-danger fs-12">
                                      {errors.first_name}
                                    </div>
                                  )}
                                </div>
                                <div className="form-group mt-3">
                                  <input
                                    name="last_name"
                                    value={user.last_name}
                                    onChange={(e) => handelChange(e)}
                                    className="form-control"
                                    placeholder="last Name"
                                    type="text"
                                  />
                                  {errors.last_name && (
                                    <div className="text-danger fs-12">
                                      {errors.last_name}
                                    </div>
                                  )}
                                </div>
                                <div className="form-group mt-3">
                                  <input
                                    name="user_name"
                                    value={user.user_name}
                                    onChange={(e) => handelChange(e)}
                                    className="form-control"
                                    placeholder="User Name"
                                    type="text"
                                  />
                                  {errors.user_name && (
                                    <div className="text-danger fs-12">
                                      {errors.user_name}
                                    </div>
                                  )}
                                </div>
                                <div className="form-group mt-3">
                                  <input
                                    value={user.email}
                                    name="email"
                                    onChange={(e) => handelChange(e)}
                                    className="form-control"
                                    placeholder="hello@example.com"
                                  />
                                  {errors.email && (
                                    <div className="text-danger fs-12">
                                      {errors.email}
                                    </div>
                                  )}
                                </div>

                                <div className="form-group mt-3">
                                  <input
                                    name="password"
                                    value={user.password}
                                    onChange={(e) => handelChange(e)}
                                    className="form-control"
                                    placeholder="passowrd"
                                  />
                                  {errors.password && (
                                    <div className="text-danger fs-12">
                                      {errors.password}
                                    </div>
                                  )}
                                </div>

                                <div className="mb-3 mt-3">
                                  <span className="form-check float-start me-2">
                                    <input
                                      type="checkbox"
                                      className="form-check-input mt-0"
                                      id="check2"
                                      name="example1"
                                    />
                                    <label
                                      className="form-check-label d-unset"
                                      htmlFor="check2"
                                    >
                                      I agree to the
                                    </label>
                                  </span>
                                  <label>
                                    <Link to={"#"}>Terms of Service </Link>&amp;{" "}
                                    <Link to={"#"}>Privacy Policy</Link>
                                  </label>
                                </div>
                                <div className="form-group clearfix text-left">
                                  <NavLink
                                    to="/login"
                                    style={{ backgroundColor: "#3eacff" }}
                                    className="text-white btn outline gray"
                                    type="button"
                                  >
                                    Back
                                  </NavLink>
                                  <button
                                    type="submit"
                                    style={{ backgroundColor: "#3eacff" }}
                                    className="btn text-white float-end"
                                  >
                                    Submit
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </nav>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
