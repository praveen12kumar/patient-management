import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router';
import {deleteWardAsync} from "./wardSlice";

const SingleWard = () => {
    const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const ward = useSelector(({ wards: { wards } }) =>
    wards.find((ward) => ward._id === id)
  );

  const handleDelete = ()=>{
    dispatch(deleteWardAsync(id));
    navigate('/ward');
  }
    
  return (
    <div className='singleWard'>
        <h3>Ward Details</h3>
        <div className="">
          <p><strong>Ward Number</strong>{ward.wardNumber}</p>
          <p><strong>Capacity</strong>{ward.capacity}</p>
          <p><strong>Specialization</strong>{ward.specialization}</p>
        </div>
        <div className="">
          <button>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </div>
    </div>
  )
}

export default SingleWard
