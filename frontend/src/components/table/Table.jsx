import React from 'react'
import { useNavigate } from 'react-router'
import "./table.css"
const Table = ({patients}) => {
    const navigate = useNavigate();
  return (
    <table>
        <thead>
            <tr>
                <td>Name</td>
                <td>Age</td>
                <td>Gender</td>
                <td>Ward</td>
            </tr>
        </thead>
        <tbody>
            {
                patients?.map(({_id,name, age, gender, assignedWard}, index)=>(
                    <tr key={index} onClick={()=> navigate(`/patient/${_id}`)}>
                        <td>{name}</td>
                        <td>{age}</td>
                        <td>{gender}</td>
                        <td>{assignedWard}</td>
                    </tr>
                ) )
            }
        </tbody>
    </table>
  )
}

export default Table
