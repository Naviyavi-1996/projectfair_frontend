import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ProjectCard from '../components/ProjectCard'
import { allProjectApi } from '../services/allApi'


function Projects() {
  const[allProjects,setAllProjects]=useState([])
  const[token,setToken]=useState("")
  const[searchKey,setSearchKey]=useState([])

  const getAllProject=async()=>{
   if(sessionStorage.getItem("token")){ 
    const token=sessionStorage.getItem("token")
    const reqHeader={
    "Content-Type":"application/json",
    "Authorization":`Bearer ${token}`
    }
    const result=await allProjectApi(searchKey,reqHeader)
    setAllProjects(result.data)}
  }
  console.log(allProjects);
  console.log(token);
  console.log(searchKey);
  useEffect(()=>{
    getAllProject()
  },[searchKey])
  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
  },[])
  return (
    <>
    <Header/>
     <div className='my-5'>
     <h5 className='text-center'>All projects</h5> 
    
{!token?    <div  className='container-fluid'>
      <div className='row'>
        <div className='col-md-3'></div>
        <div className='col-md-6 d-flex justify-content-cenyer aligh-items-center flex-column'>
          <img src="https://media.tenor.com/2cwdcFp9k2kAAAAj/lock.gif" alt="no image" className='w-25 mt-3' />
          <h4 className='text-danger mt-5'>Please <Link to={'/login'}>login</Link> to see more projects</h4>
        </div>
        <div className='col-md-3'></div>
      </div>
     </div>
    

   :
   <div className='mt-5'>
<div className='container'>
  <div className='row'>
    <div className='col-md-4'></div>
    <div className='col-md-4 d-flex'>
      <input type="text" placeholder='technologies' className='form-control shadow' onChange={(e)=>setSearchKey(e.target.value)} />
      <FontAwesomeIcon icon={faMagnifyingGlass} style={{color:'lightgrey',marginTop:'11.5px',marginLeft:'-30px'}} />
    </div>
    <div className='col-md-4'></div>
  </div>
</div>
   

   <div className='container-fluid p-md-5 p-4 mt-5'>
    <div className='row'>
     {allProjects?.map((item)=>(<div className='col-md-3'>
        <ProjectCard project={item}/>
      </div>))}
    </div>
   </div>
   </div>}
   </div> 
    </>
  )
}

export default Projects