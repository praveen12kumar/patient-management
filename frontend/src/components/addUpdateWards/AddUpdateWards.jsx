import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { updateWardAsync, addWardAsync } from '../../features/ward/wardSlice';
import { useLocation } from 'react-router';
import { wardSpecializations } from '../utils';
import { useNavigate } from 'react-router';


const AddUpdateWards = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {state} = useLocation();
    const ward = state ? state : null;


    const [wardInput, setWardInput] = useState({
        wardNumber: ward ? ward.wardNumber : 0,
        capacity: ward ? ward.capacity : 0,
        specialization: ward ? ward.specialization : "General Ward"
    })

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(ward){
            dispatch(updateWardAsync({id:ward._id, ward:wardInput}))
            navigate(`ward/${ward._id}`)
        }
        else{
            dispatch(addWardAsync(wardInput));
            navigate('/ward');
        }
    }

  return (
    <>
     <h2>{ward ? "Update" : "Add "} Ward</h2> 
     <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label><strong>Ward Number:</strong></label>
            <input type="Number" className='form-control' 
                value={wardInput.wardNumber}
                required
                placeholder='101'
                onChange={(e)=> setWardInput({...wardInput, wardNumber:e.target.value})}
            />
        </div>
        <div className="form-group">
            <label><strong>Capacity</strong></label>
            <input type="number" className='form-control'
            value={wardInput.capacity}
            required
            placeholder='0'
            onChange={(e)=> setWardInput({...wardInput, capacity:e.target.value})}
            />
        </div>
        <div className="form-group">
            <label><strong>Spe</strong></label>
            <select name="ward" id="" value={wardInput.specialization} 
                onChange={(e)=> setWardInput({...wardInput, specialization:e.target.value})}
            >
            {
                wardSpecializations.map((specialization, index)=>(
                    <option key={index} value={specialization}>{specialization}</option>
                ))
            }
            </select>
        </div>
        <input type='submit' value={ward? "Update" : "Add"}  />
     </form>
     <div className="back-btn">
        <button onClick={()=> navigate('/ward')}>back</button>
     </div>
    </>
  )
}

export default AddUpdateWards
