import React from 'react'
import { useNavigate } from 'react-router'
const WardTable = ({data}) => {
    const navigate = useNavigate();
  return (
    <table>
        <thead>
            <tr>
                <td>Ward Number</td>
                <td>Capacity</td>
                <td>Specialization</td>
            </tr>
        </thead>
        <tbody>
            {
                data?.map(({_id, wardNumber, capacity, specialization})=>(
                    <tr key={_id}>
                        <td onClick={()=>navigate(`/ward/${_id}`)} >{wardNumber}</td>
                        <td onClick={()=>navigate(`/ward/${_id}`)}>{capacity}</td>
                        <td onClick={()=>navigate(`/ward/${_id}`)}>{specialization}</td>
                    </tr>

                ))
            }
        </tbody>
    </table>
  )
}

export default WardTable
