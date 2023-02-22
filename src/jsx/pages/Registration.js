import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import {  useDispatch } from 'react-redux';
import { userSignUp } from "../../Redux/user";
import {
	loadingToggleAction,
	signupAction,
} from '../../store/actions/AuthActions';
// image

import logo from '../../images/logo/logo-full.png'
import logoPrime from "../../images/logo/logo-prime.png"
import bg6 from '../../images/background/bg6.jpg';

function Register(props) {
	const [heartActive, setHeartActive] = useState(true);

	const [email, setEmail] = useState('');
	const [fname, setFname] = useState('');
	const [lname, setLname] = useState('');
	const [uname, setUname] = useState('');
	let errorsObj = { email: '', password: '', fname: '', lname: '', uname: '' };
	const [errors, setErrors] = useState(errorsObj);
	const [password, setPassword] = useState('');

	const dispatch = useDispatch();
	const navigate = useNavigate();

	function onSignUp(e) {
		e.preventDefault();
		let error = false;
		const errorObj = { ...errorsObj };
		if (email === '') {
			errorObj.email = 'Email is Required';
			error = true;
		}
		if (password === '') {
			errorObj.password = 'Password is Required';
			error = true;
		}
		if (lname === '') {
			errorObj.lname = 'last name is Required';
			error = true;
		}
		if (fname === '') {
			errorObj.fname = 'first name is Required';
			error = true;
		}
		if (uname === '') {
			errorObj.uname = 'user name is Required';
			error = true;
		}
		setErrors(errorObj);
		if (error) return;
		const payload = {
			user_name: uname,
			first_name: fname,
			last_name: lname,
			email:email,
			password: password
		}
		dispatch(loadingToggleAction(true));
		dispatch(userSignUp(payload));
		navigate('/login');
	}

	return (
		<>
			<div className="page-wraper">
				<div className="browse-job login-style3">
					<div className="bg-img-fix overflow-hidden" style={{ background: '#fff url(' + bg6 + ')', height: "100vh" }}>
						<div className="row gx-0">
							<div className="col-xl-4 col-lg-5 col-md-6 col-sm-12 vh-100 bg-white">
								<div id="mCSB_1" className="mCustomScrollBox mCS-light mCSB_vertical mCSB_inside" style={{ maxHeight: "653px" }}>
									<div id="mCSB_1_container" className="mCSB_container" style={{ position: "relative", top: "0", left: "0", dir: "ltr" }}>
										<div className="login-form style-2">
											<div className="card-body">
												<div className="logo-header mb-3">
													<Link to="/login" className="logo"><img src={logoPrime} alt="" className="width-230 mCS_img_loaded" /></Link>
												</div>
												<nav className="nav nav-tabs border-bottom-0" >
													<div className="tab-content w-100" id="nav-tabContent">
														<div className="tab-pane active show fade">
															{props.errorMessage && (
																<div className=''>
																	{props.errorMessage}
																</div>
															)}
															{props.successMessage && (
																<div className=''>
																	{props.successMessage}
																</div>
															)}
															<form className="dz-form py-2" onSubmit={onSignUp}>
																<h3 className="form-title">Sign Up</h3>
																<div className="dz-separator-outer m-b5">
																	<div className="dz-separator bg-primary style-liner"></div>
																</div>
																<p>Enter your personal details below: </p>
																<div className="form-group mt-3">
																	<input name="dzName" value={fname} onChange={((e) => setFname(e.target.value))} className="form-control" placeholder="First Name" type="text" />
																	{errors.fname && <div className="text-danger fs-12">{errors.fname}</div>}
																</div>
																<div className="form-group mt-3">
																	<input name="dzName" value={lname} onChange={(e) => setLname(e.target.value)} className="form-control" placeholder="last Name" type="text" />
																	{errors.lname && <div className="text-danger fs-12">{errors.lname}</div>}

																</div>
																<div className="form-group mt-3">
																	<input name="dzName2" value={uname} onChange={(e) => setUname(e.target.value)} className="form-control" placeholder="User Name" type="text" />
																	{errors.uname && <div className="text-danger fs-12">{errors.uname}</div>}
																</div>
																<div className="form-group mt-3">
																	{/* <input name="dzName" required="" className="form-control" placeholder="Email Address" type="text" /> */}
																	<input value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" placeholder="hello@example.com" />
																	{errors.email && <div className="text-danger fs-12">{errors.email}</div>}
																</div>

																<div className="form-group mt-3">
																	{/* <input name="dzName" required="" className="form-control" placeholder="Password" type="password" /> */}
																	<input
																		value={password}
																		onChange={(e) =>
																			setPassword(e.target.value)
																		}
																		className="form-control"
																		//defaultValue="Password"
																		placeholder="passowrd"
																	/>
																	{errors.password && <div className="text-danger fs-12">{errors.password}</div>}
																</div>
																{/* <div className="form-group mt-3 mb-3">
																	<input name="dzName" required="" className="form-control" placeholder="Re-type Your Password" type="password" />
																</div> */}
																<div className="mb-3 mt-3">
																	<span className="form-check float-start me-2">
																		<input type="checkbox" className="form-check-input mt-0" id="check2" name="example1" />
																		<label className="form-check-label d-unset" htmlFor="check2">I agree to the</label>
																	</span>
																	<label><Link to={"#"}>Terms of Service </Link>&amp; <Link to={"#"}>Privacy Policy</Link></label>
																</div>
																<div className="form-group clearfix text-left">
																	<NavLink to="/login" style={{ backgroundColor: '#3eacff', }} className="text-white btn outline gray" type="button">Back</NavLink >
																	<button type="submit" style={{ backgroundColor: '#3eacff', }} className="btn text-white float-end">Submit</button>
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
};



export default Register;

