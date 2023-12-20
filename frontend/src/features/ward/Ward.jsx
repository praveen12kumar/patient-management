import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchWards } from './wardSlice';
import WardTable from '../../components/table/WardTable';
import Loader from '../../components/loader/Loader';
import { useNavigate } from 'react-router';

const Ward = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    

    const {wards, status, error} = useSelector(({wards})=> wards);

    

    useEffect(()=>{
        if(status === "idle"){
            dispatch(fetchWards());
        }
    },[status, dispatch])
  
    return (
    <div className='ward-container'>
      <h2>Wards</h2>
      <div className="">
        <button onClick={()=> navigate('/addWard')}>Add Ward</button>
      </div>
      {
        status === "loading" ? (<Loader/>) : (
          <div className="">
            {
              status === "error" ? (error) : (
                wards.length === 0 ? "No Ward Found" : 
                (
                  <div className="">
                    {
                      <WardTable data={wards}/>
                    }
                  </div>
                )
              )
            }
          </div>
        )
      }
    </div>
  )
}

export default Ward;
