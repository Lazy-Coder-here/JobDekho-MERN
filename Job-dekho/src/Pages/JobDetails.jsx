import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const JobDetails = () => {
    const {id} = useParams();
    const [job, setJob] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:3000/all-jobs/${id}`).then(res => res.json()).then(data => setJob(data));
    }, [])
  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
        <h2></h2>
    </div>
  )
}

export default JobDetails