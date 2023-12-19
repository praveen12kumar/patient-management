import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import { fetchWards } from '../../features/ward/wardSlice';
import { addPatientAsync, updatePatientAsync } from '../../features/patient/patientSlice';


const AddUpdatePatient = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {state} = useLocation();
    const patient = state ? state : null;
    const wards = useSelector(({wards})=>wards);
    
    const [patientInput, setPatientInput] = useState({
        name: patient ? patient.name : "",
        age: patient ? patient.age : 0,
        gender: patient ? patient.gender : "male",
        medicalHistory: patient ? patient.medicalHistory.join(",") : "",
        contactInfo: patient ? patient.contactInfo : 0,
        assignedWard: patient ? patient.assignedWard : 101,
    })

    const handleSubmit = (e)=>{
        
        e.preventDefault();
        if(patient){
            dispatch(updatePatientAsync({id:patient._id, patient:patientInput}))
            navigate(`/patient/${patient._id}`);
        }
        else{
            dispatch(addPatientAsync(patientInput));
            navigate("/");
        }
    }

    useEffect(()=>{
        if(wards.wards.length === 0){
            dispatch(fetchWards());
        }
    },[]);

  return (
    <>
     <h2>{patient ? "Update" : "Add"} Patient</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label><strong>Name:</strong></label>
                <input type="text" value={patientInput.name} 
                    placeholder='John Cena'
                    className='form-control'
                    onChange={(e)=> setPatientInput({...patientInput, name:e.target.value}) }
                    required
                    />
            </div>
            <div className="form-group">
                <label><strong>Age:</strong></label>
                <input type="number" min={0}
                    value={patientInput.age}
                    className='form-control'
                    onChange={(e)=> setPatientInput({...patientInput, age:e.target.value})}
                    required
                    placeholder='Age'
                />
            </div>
            <div className="form-group">
                <label><strong>Gender:</strong></label>
                <span>
                    <label>
                        <input type="radio" name='gender' className='form-control'
                            value="male" 
                            onChange={(e)=> setPatientInput({...patientInput, gender:e.target.value})}
                            checked={patientInput.gender === 'male'}
                        />{" "} Male
                    </label>
                </span>
                <span>
                    <label>
                        <input type="radio"name='gender' value="female" className='form-control'
                            onChange={(e)=> setPatientInput({...patientInput, gender:e.target.value})}
                            checked={patientInput.gender === 'female'}
                        />
                    </label>{" "} Female
                </span>
                <span>
                    <label>
                        <input type="radio" name='gender' value="other" className='form-control'
                            onChange={(e)=> setPatientInput({...patientInput, gender:e.target.value})}
                            checked={patientInput.gender === 'other'}
                        />{" "}Other
                    </label>
                </span>
            </div>
            <div className="form-group">
                <label><strong>Medical History</strong></label>
                    <input type="text" value={patientInput.medicalHistory}
                     className='form-control'
                     placeholder='History'
                     onChange={(e)=> setPatientInput({...patientInput, medicalHistory:e.target.value.replace(/ /g, "").split(",")})}
                    />
            </div>

            <div className="form-group">
                <label><strong>Contact</strong></label>
                <input type="number" className="form-control"
                 value={patientInput.contactInfo}
                 onChange={(e)=> setPatientInput({...patientInput, contactInfo:e.target.value})}
                 required
                 placeholder='Contact'
                />
            </div>
            <div className="form-group">
                <label><strong>Ward</strong></label>
                <select name="ward" id=""
                    value={patientInput.assignedWard} 
                    onChange={(e)=>setPatientInput({...patientInput, assignedWard:e.target.value})} >
                        {
                            wards.wards?.map((ward, index)=>(
                                <option key={index} value={ward.wardNumber}>{ward.wardNumber} - {ward.specialization}</option>
                            ))
                        }
                    </select>
            </div>
           <div className="btn-section">
           <input type="submit" value={patient ? "Update" : "Add"} />
           <button onClick={(e)=> navigate('/')}>back</button>
           </div>

        </form> 
    </>
  )
}

export default AddUpdatePatient
