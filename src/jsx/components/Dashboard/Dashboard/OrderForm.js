import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ReactSlider from 'react-slider'
import Nouislider from "nouislider-react";
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
//import noUiSlider from "nouislider";
//import "nouislider/distribute/nouislider.css";
//import 'nouislider/dist/nouislider.css';

//let slider;

// function destroyExistingSlider(){
//   if(slider && slider.noUiSlider){
//     slider.noUiSlider.destroy();
//   }
// }

const OrderForm = () => {
	// useEffect(()=>{
	// 	//destroyExistingSlider();
	// 	var slider = document.getElementById('slider');
	// 	noUiSlider.create(slider, {
	// 		start: [20, 80],
	// 		connect: true,
	// 		range: {
	// 			'min': 0,
	// 			'max': 100
	// 		}
	// 	});
	//});
	return (
		<>
			<form className='' >
				<h2 className=' d-flex justify-content-center' style={{ marginBottom: '1rem' }}>Deposit Amount</h2>
				<p className=' d-flex justify-content-center'>Enter valid amount to deposit into your wallet.</p>
				<div className="sell-blance ">
					<div className="input-group  d-flex justify-content-center">
						<input type="text" className="form-control form-control-sm" placeholder="Amount" />
						<span className="input-group-text">USD</span>
					</div>
				</div>
				<div className="text-center  d-flex justify-content-center " style={{ marginTop: '2rem', marginLeft:'1rem' }}>
					<Link to={"/exchange"} className="btn btn-primary w-50">Deposit</Link>
				</div>
			</form>
		</>
	)
}
export default OrderForm;