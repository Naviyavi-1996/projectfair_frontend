import { faFacebook, faInstagram, faLinkedin, faStackOverflow, faTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
function Footer() {
    return (
        <div className='p-5 bg-success mt-5'>
            <div className='container-fluid'>
                <div className='row'>

                    <div className='col-md-4'>
                        <h3 className='text-light'><FontAwesomeIcon icon={faStackOverflow} className='me-3' />Project Fair</h3>
                        <p className="mt-3" style={{ textAlign: 'justify' }}> Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio, distinctio eum et possimus odio facilis id aut provident laborum doloribus quos, consectetur, reiciendis cum ullam animi earum! Repellendus, necessitatibus fugiat. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere officia porro iure doloremque necessitatibus. Temporibus eveniet esse pariatur beatae, quisquam rem adipisci corrupti neque laudantium mollitia consectetur veniam deleniti quae! </p>
                    </div>
                    <div className='col-md-2 d-md-flex justify-content-center'>
                        <div>
                            <h3 className='text-light'>Links</h3>
                            <p className='mt-3'>Home</p>
                            <p>Project</p>
                            <p>Dashboard</p>
                        </div>
                    </div>
                    <div className='col-md-1'></div>
                    <div className='col-md-2 d-md-flex justify-content-center'>
                        <div>
                            <h3 className='text-light'>Guides</h3>
                            <p className='mt-3'>React</p>
                            <p>React bootstrap</p>
                            <p>Bootswatch</p>
                        </div>
                    </div>
                    <div className='col-md-3'>
                        <h3 className='text-light'>Contact Us</h3>
                        <div className='d-flex mt-3'>
                            <input type="text" placeholder='Email-id' className='form-control rounded-0'/>
                            <button className='btn btn-warning ms-2 rounded-0'>Subscribe</button>
                        </div>
                        <div className='d-flex mt-3 justify-content-between'>
                        <FontAwesomeIcon icon={faInstagram} className='fa-2x text-light'/>
                        <FontAwesomeIcon icon={faTwitter} className='fa-2x text-light' />
                        <FontAwesomeIcon icon={faFacebook} className='fa-2x text-light' />
                        <FontAwesomeIcon icon={faLinkedin} className='fa-2x text-light'/>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Footer