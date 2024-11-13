import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import photo from '/src/assets/image1.webp'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { homeProjectApi } from '../services/allApi'
function Home() {
  const [islogin, setIsLogin] = useState(false)
  const [homeProject, setHomeProject] = useState([])

  const getHomeProject = async () => {
    const result = await homeProjectApi()
    console.log (result); 
    setHomeProject(result.data)
  }
  useEffect(() => {
    getHomeProject()
    if (sessionStorage.getItem("token")) {
      setIsLogin(true)
    }
    else {
      setIsLogin(false)
    }
  }, [])
  return (
    <>
      <div style={{ height: '100vh' }} className='bg-success p-5'>
        <div className='container-fluid'>
          <div className='row d-flex justify-content-center align-items-center'>
            <div className='col-md-6'>
              <h1 style={{ fontSize: '70px', color: 'white' }}>Project Fair</h1>
              <p>One stop destination for all software development projects</p>
              {!islogin ? <Link to={'/login'}> <button className='btn text-light p-0 mt-3'>Get Started <FontAwesomeIcon icon={faArrowRight} /></button> </Link> :
                <Link to={'dashboard'}><button className='btn text-light p-0 mt-3'>Manage Project <FontAwesomeIcon icon={faArrowRight} /></button></Link>}
            </div>
            <div className='col-md-6 mt-5 mt-md-0 d-flex justify-content-center'>
              <img src={photo} alt="no image" className='w-75' />
            </div>
          </div>
        </div>
      </div>
      <div >
        <h3 className='text-center mt-5'>Explore Our Projects</h3>
        <div className='container-fluid my-5'>
          <div className="row">
            {homeProject?.map((item)=>(<div className="col-md-4 p-md-5 text-center">

              <ProjectCard project={item}/>

            </div>))}

          </div>
          <div className='row'>
            <Link to={'/projects'}> <p className='text-center text-danger'>See more projects</p></Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home