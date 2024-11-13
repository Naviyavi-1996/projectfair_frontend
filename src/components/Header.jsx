import { faStackOverflow } from '@fortawesome/free-brands-svg-icons/faStackOverflow';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { loginResponseContext } from '../context/Contextshare';
function Header() {
  const[token,setToken]=useState("")
  const navigate=useNavigate()
  const{setLoginResponse}=useContext(loginResponseContext)
  useEffect(()=>{
    if(sessionStorage.getItem("token"))
    {
      setToken(sessionStorage.getItem("token"))
    }
  },[])
  const handleLogout =()=>{
    sessionStorage.removeItem('existingUser')
    sessionStorage.removeItem('token')
    setLoginResponse(false)
    navigate('/')
  }
  return (
   
    <> 
    <Navbar expand="lg" className="bg-success d-flex align-items-center">
    <Container>   
     <Link to={'/'} style={{textDecoration:'none'}}>
          <Navbar.Brand className='text-light'>
           <h3><span className='fs-3 ms-3'><FontAwesomeIcon icon={faStackOverflow} /></span>Project Fair</h3>
          </Navbar.Brand>
     </Link>
     {token && <button className='btn btn-warning ms-auto rounded-0'onClick={handleLogout}><FontAwesomeIcon icon={faPowerOff} className='me-2' />LogOut</button>}
    </Container>
  </Navbar>
  </>
  )
}

export default Header