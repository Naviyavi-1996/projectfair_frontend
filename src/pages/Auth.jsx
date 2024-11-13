import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useState } from 'react'
import Auimg from '/src/assets/authimage.png'
import { Link, useNavigate } from 'react-router-dom'
import { loginApi, registerApi } from '../services/allApi'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginResponseContext } from '../context/Contextshare'

function Auth({register}) {
  const{setLoginResponse}=useContext(loginResponseContext)
  const navigate=useNavigate()
  const [userDetails,setUserDetails]=useState({
    username:"",
    email:"",
    password:"" 
  })
  console.log(userDetails);

  const handleRegister=async()=>{
    const{username,email,password}=userDetails
    if(!username || !email || !password)
    {
    toast.info("Please fill the form completely")
    }
    else
    {
       const result = await registerApi(userDetails)
       console.log(result);
       if(result.status==200)
       {
        toast.success("Registration Successfull")
        setUserDetails({
          username:"",
          email:"",
          password:"" 
        })
        navigate('/login')
       }
       else if(result.status==406)
       {
        toast.warning(result.response.data)
       }else{
        toast.error("Something went wrong")
       }
    }
  }
  const handleLogin=async()=>{
    const{email,password}=userDetails
    if(!email || !password)
    {
    toast.info("Please fill the form completely")
    }
    else{
      const result=await loginApi({email,password})
      console.log(result);
      if(result.status==200)
      {
        toast.success("Login successfull");
        sessionStorage.setItem("existinguser",JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token",result.data.token)
        setLoginResponse(true)
        setUserDetails({
          username:"",
          email:"",
          password:"" 
        })
        setTimeout(() => {
          navigate('/')
        }, 2000)
      }
      else if(result.status==406)
      {
        toast.warning(result.response.data);
        setUserDetails({
          username:"",
          email:"",
          password:"" 
        })
      }
      else{
        toast.error("incorrect emailid or password");
        setUserDetails({
          username:"",
          email:"",
          password:"" 
        })
      }
    }
  }
  return (
    <>

   <div className='container mt-5'>
     <Link to={'/'} style={{textDecoration:'none'}}> <h4 className='text-warning'><FontAwesomeIcon icon={faArrowLeft} />Back to Home</h4></Link>
       <div className='row bg-success mt-3' >
        <div className='col-md-6 d-flex justify-content-center align-items-center'>
          <img src={Auimg} alt="no image" className='w-25' style={{height:'300px'}} />
        </div>
        <div className='col-md-6 d-flex justify-content-center align-items-center flex-column'>
        <h3 className='text-light text-center mt-5'><span className='fs-3 ms-3'><FontAwesomeIcon icon={faStackOverflow} /></span>Project Fair</h3> 
        {!register? <h4  className='text-light'>Sign In to Your Account</h4> :
        <h4  className='text-light'>Sign Up to Your Account</h4>}
       { register && <input type="text" className='w-75 form-control rounded-0 mt-5'placeholder='Username' value={userDetails.username} onChange={(e)=>{setUserDetails({...userDetails,username:e.target.value})}}/>}
        <input type="text" className='w-75 form-control mb-2 rounded-0 mt-3'placeholder='Email ID'value={userDetails.email}  onChange={(e)=>{setUserDetails({...userDetails,email:e.target.value})}}/>
        <input type="password" className='w-75 form-control mt-2 rounded-0'placeholder='Password' value={userDetails.password}  onChange={(e)=>{setUserDetails({...userDetails,password:e.target.value})}}/>
       
       {!register ? <div className='w-75 mt-2'>
        <button className='btn btn-warning w-100 mt-3'onClick={handleLogin}>Login</button>
                <p className='text-light text-start'>
                    New User? click Here to <Link to='/register' className='text-danger'> Register</Link>
                </p>
            </div>:
            <div className='w-75 mt-2'>
        <button className='btn btn-warning w-100 mt-3'onClick={handleRegister}>Register</button>
                <p className='text-light text-start'>
                   Already a User? click Here to <Link to='/login' className='text-danger'> Login</Link>
                </p>
            </div>}
        </div>
       </div>
      </div>
      <ToastContainer theme='colored' position='top-center' autoClose={2000} />
    </>
  )
}

export default Auth