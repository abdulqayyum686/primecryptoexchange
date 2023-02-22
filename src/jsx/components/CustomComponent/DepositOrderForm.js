import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postDepositAction } from '../../../store/actions/DepositAction';
import { Button } from 'react-bootstrap';


const DepositOrderForm = () => {
	const [data,setData]=useState('')
	const dispatch=useDispatch()
	const postDeposit = () =>{
		dispatch(postDepositAction(data))
		setData('');
	}
	return (
		<>
			<form className='border-4' >
				<h2 className=' d-flex justify-content-center' style={{ marginBottom: '1rem' }}>Deposit Amount</h2>
				<p className=' d-flex justify-content-center'>Enter valid amount to deposit into your wallet.</p>
				<div className="sell-blance ">
					<div className="input-group  d-flex justify-content-center">
						<input type="text" value={data} onChange={(e)=>setData(e.target.value)} className="form-control form-control-sm" placeholder='Amount'  />
						<span className="input-group-text">USD</span>
					</div>
				</div>
				<div className="text-center  d-flex justify-content-center " style={{ marginTop: '2rem', marginLeft:'1rem' }}>
					<Button onClick={postDeposit} className="btn w-50 text-white" style={{backgroundColor:'#3eacff'}}>Deposit</Button>
				</div>
			</form>
		</>
	)
}
export default DepositOrderForm;