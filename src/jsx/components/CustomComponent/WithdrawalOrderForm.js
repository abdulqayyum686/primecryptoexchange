import { useState } from 'react';
import { Button,  } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { postWithdrawalAction } from '../../../store/actions/WithdrawalAction';


const WithdrawalOrderForm = () => {
	const [data,setData]=useState('')
	let errorsObj = { data: ''};
	const [errors, setErrors] = useState(errorsObj);

	const dispatch=useDispatch()
	const postDeposit = (e) =>{
		e.preventDefault();
		let error = false;
		const errorObj = { ...errorsObj };
		if (data === '') {
			errorObj.data = 'Input is Required';
			error = true;
		}
		setErrors(errorObj);
		if (error) {
			return;
		}
		dispatch(postWithdrawalAction(data))
		setData('');
	}
	return (
		<>
			<form className='border-4' >
				<h2 className=' d-flex justify-content-center' style={{ marginBottom: '1rem' }}>Withdrawal Amount</h2>
				<p className=' d-flex justify-content-center'>Enter valid amount to Withdraw from your wallet.</p>
				<div className="sell-blance ">
				{errors.data && <div className="text-danger fs-12">{errors.data}</div>}

					<div className="input-group  d-flex justify-content-center">

						<input type="text" value={data} onChange={(e)=>setData(e.target.value)} className="form-control form-control-sm" placeholder="Amount" />
						<span className="input-group-text">USD</span>
					</div>
				</div>
				<div className="text-center  d-flex justify-content-center " style={{ marginTop: '2rem', marginLeft:'1rem' }}>
					<Button onClick={postDeposit} className="btn w-50 text-white" style={{backgroundColor:'#3eacff'}}>Withdraw</Button>
				</div>
			</form>
		</>
	)
}
export default WithdrawalOrderForm;