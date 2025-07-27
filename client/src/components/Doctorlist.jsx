import React from 'react'
import { useNavigate } from 'react-router-dom'

function Doctorlist({doctor}) {
    const navigate=useNavigate()
  
  return (
<>
<div className='card p-2'
style={{cursor:'pointer'} }
onClick={()=>navigate(`/doctor/book-appointment/${doctor._id}`)}>
    <div className='card-header'>
        Dr. {doctor.firstname}  {doctor.lastname}
    </div>
    <div className='card-body'>
        <p>
            <b>Specialization</b> {doctor.specialization} 
        </p>
          <p>
            <b>Experiance</b> {doctor.experiance} 
        </p>
          <p>
            <b>Feee per consultation</b> {doctor.feesperconsultation} 
        </p>
          <p>
            <b>Timing</b> {doctor.timings[0]}- {doctor.timings[1]}
        </p>
    
    </div>
</div>

</>
  )
}

export default Doctorlist
