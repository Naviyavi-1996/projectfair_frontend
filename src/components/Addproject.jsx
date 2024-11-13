import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addProjectApi } from '../services/allApi';
import { addResponseContext } from '../context/Contextshare';
function Addproject() {
  const [show, setShow] = useState(false);
  const {setAddResponse}=useContext(addResponseContext)
  const [projectDetails,setProjectDetails]=useState({
    title:"",
    language:"",
    github:"",
    website:"",
    overview:"",
    projectImage:""
  })
  const[preview,setPreview]=useState("")
  const[token,setToken]=useState("")
  const[key,setkey]=useState(1)
  console.log(projectDetails);
  console.log(preview)
  console.log(token)
  const handleClose = () => {handleCancel(),setShow(false)};
  const handleShow = () => setShow(true); 
  useEffect(()=>{if(projectDetails.projectImage)
  {
    setPreview(URL.createObjectURL(projectDetails.projectImage))
  }
  },[projectDetails.projectImage])
useEffect(()=>{if(sessionStorage.getItem("token")){
  setToken(sessionStorage.getItem("token"))
}},[])
  const handleCancel=()=>{
    setProjectDetails({
      title:"",
      language:"",
      github:"",
      website:"",
      overview:"",
      projectImage:""
    })
    setPreview("")
    if(key==1)
    {
      setkey(0)
    }
    else{
      setkey(1)
    }
  }

  const handleAdd=async()=>{
    const {title,language,github,website,overview,projectImage}=projectDetails
    if(!title || !language || !github || !website || !overview || !projectImage)
    {
      toast.info("Please complete the form completely");
    }
    else
    {
    
      const reqBody=new FormData()
      reqBody.append("title",title)
      reqBody.append("language",language)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("overview",overview)
      reqBody.append("projectImage",projectImage)
     if(token)
     {
       const reqHeader ={
        "Content-Type":"multipart/form-data",
        "Authorization":`Bearer ${token}`
       }
       const result=await addProjectApi(reqBody,reqHeader)
       console.log(result);
       if(result.status==200)
       {
        toast.success("Project added succesfully");
        setTimeout(() => {
          handleClose()
        }, 2000)
        setAddResponse(result);
       }
       else if(result.status==406)
       {
        toast.warning(result.response.data)
        handleCancel()
       }
       else
       {
        toast.error("Something went wrong");
        handleClose()
       }
     }
     else{
      toast.warning("Please Login");
     }
    }
  }

  return (
    <>
    <button className='btn rounded-0 text-light'onClick={handleShow} style={{backgroundColor:'rgb(62,179,24)'}}>Add Project</button>
    <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title className='text-success'>Add Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-md-6'>
                        <label htmlFor="projectimage">
                        <input type="file" id='projectimage' style={{display:'none'}} key={key} onChange={(e)=>{setProjectDetails({...projectDetails,projectImage:e.target.files[0]})}}/>
                        <img src={preview?preview:"https://m.media-amazon.com/images/I/71sKzRQtXtL.png"} alt="no image"className='w-100'/>
                        </label>
                    </div>
                    <div className='col-md-6'>
                        <div className="mb-3">
                            <input type="text" placeholder='Title' className='form-control'  value={projectDetails.title} onChange={(e)=>{setProjectDetails({...projectDetails,title:e.target.value})}}/>
                        </div>
                        <div className="mb-3">
                        <input type="text" placeholder='Language' className='form-control'  value={projectDetails.language}onChange={(e)=>{setProjectDetails({...projectDetails,language:e.target.value})}}/>
                        </div>
                        <div className="mb-3">
                        <input type="text" placeholder='GitHub' className='form-control' value={projectDetails.github} onChange={(e)=>{setProjectDetails({...projectDetails,github:e.target.value})}}/>
                        </div>
                        <div className="mb-3">
                        <input type="text" placeholder='website' className='form-control' value={projectDetails.website} onChange={(e)=>{setProjectDetails({...projectDetails,website:e.target.value})}}/>
                        </div>
                        <div className="mb-3">
                            <textarea className='form-control' rows={5} placeholder='Overview' value={projectDetails.overview} onChange={(e)=>{setProjectDetails({...projectDetails,overview:e.target.value})}}></textarea>
                        </div>
                    </div>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAdd}>
            Add 
          </Button>
        </Modal.Footer>
        <ToastContainer theme='colored' position='top-center' autoClose={2000} />
      </Modal>
     
    </>
  )
}

export default Addproject