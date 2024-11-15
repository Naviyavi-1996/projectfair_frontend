import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { serverUrl } from '../services/serverUrl'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateUserProfileApi } from '../services/allApi';
import { Collapse } from 'react-bootstrap';
function Profile() {
  const [open, setOpen] = useState(false);
  const[userDetails,setUserDetails]=useState({
    username:"",
    email:"",
    password:"",
    profile:"",
    github:"",
    linkedin:""
  })
  const [existingImage, setexistingImage] = useState("")
  const[preview,setPreview]=useState("")
  const [updateStatus, setupdateStatus] = useState({})

  console.log(userDetails);
  const handleFile=(e)=>{
    setUserDetails({...userDetails,profile:e.target.files[0]})
  }
  const handleUpdate = async () => {                                                       
    const { username, email, password, profile, github, linkedin } = userDetails
    console.log(username, email, password, profile, github, linkedin); 
    if (!github || !linkedin) {
      toast.info('Please add github and linkedin')
    }
    else {
      const reqBody = new FormData()
      reqBody.append("username", username)
      reqBody.append("email", email)
      reqBody.append("password", password)
      reqBody.append("github", github)
      reqBody.append("linkedin", linkedin)
      preview ? reqBody.append("profile", profile) : reqBody.append("profile",existingImage)

      const token = sessionStorage.getItem("token")

      if (preview) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        const result = await updateUserProfileApi(reqBody, reqHeader)
        console.log(result);
        if (result.status == 200) {
          toast.success('Profile Updated Successfully')
          sessionStorage.setItem("existinguser", JSON.stringify(result.data))
          setupdateStatus(result)
        }

      }
      else {
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
        const result = await updateUserProfileApi(reqBody, reqHeader)
        console.log(result);
        if (result.status == 200) {
          toast.success('Profile Updated Successfully')
          sessionStorage.setItem("existinguser", JSON.stringify(result.data))
          setupdateStatus(result)
        }
        else{
          toast.error('Something went wrong')
        }
      }
    }
  }
  useEffect(() => {
    if (userDetails.profile) {
      setPreview(URL.createObjectURL(userDetails.profile))
    }
  }, [userDetails.profile])


  console.log(preview);


  useEffect(() => {
    if (sessionStorage.getItem("existinguser")) {
      const user = JSON.parse(sessionStorage.getItem("existinguser"))
      console.log(user);
      setUserDetails({ ...userDetails, username: user.username, email: user.email, password: user.password, github: user.github, linkedin: user.linkedin })
      setexistingImage(user.profile)
    }
  }, [updateStatus])
  return (
    <>
    <div className='p-4 shadow'onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)}>
     <div className='d-flex justify-content-between'>
         <h3 style={{color:'rgb(62,179,24)'}}>Profile</h3>
         <button onClick={() => setOpen(!open)} className='btn' style={{borderColor:'rgb(160,90,192)',color:'rgb(160,90,192)'}}>{open==true?<FontAwesomeIcon icon={faAngleUp}/>:<FontAwesomeIcon icon={faAngleDown} />}</button>
         </div>
        <Collapse in={open}>
          <div>
             <div className='d-flex justify-content-center align-items-center flex-column mt-3'>
               <label htmlFor="profileimage"className='d-flex justify-content-center align-items-center flex-column mb-4' >
                <input type="file" id="profileimage" style={{display:'none'}}onChange={(e)=>{handleFile(e)}} />
                {existingImage==""?
                <img src={preview?preview:"https://www.iconpacks.net/icons/2/free-user-icon-3297-thumb.png"} alt="no image" className='w-50' style={{width:'200px',height:'200px',borderRadius:'50%'}} />
                :
                <img src={preview?preview:`${serverUrl}/upload/${existingImage}`} alt="no image" className='w-50' style={{width:'200px',height:'200px',borderRadius:'50%'}}/>
    }
               </label>
               <div className='w-100'>
                   <div className='mb-3'>
                    <input type="text" placeholder='gitHub'className='form-control' value={userDetails?.github} onChange={(e)=>setUserDetails({...userDetails,github:e.target.value})} />
                   </div>
                   <div className='mb-3'>
                   <input type="text" placeholder='LinkedIn' className='form-control' value={userDetails?.linkedin} onChange={(e)=>setUserDetails({...userDetails,linkedin:e.target.value})} />
                   </div>
                   <div className='mb-3'>
                   <button className='btn btn-success w-100'onClick={handleUpdate}>Update</button>
                   </div>
               </div>
             </div>
          </div>
        </Collapse>
    </div>
    <ToastContainer theme='colored' position='top-center' autoClose={2000} />
    </>
   
  )
}

export default Profile