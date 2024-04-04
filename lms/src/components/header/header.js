
import { useEffect, useState } from 'react';
import { user } from '../../helpers/user';

import { Sidebar } from 'primereact/sidebar';
import authService from '../../services/authService';
        
export function Header() {
   
    const [visible,setVisible] = useState(false)
    useEffect(()=>{

    },[user])
    const logout=()=>{
        authService.logout();
    }
    return (<>
        <div className="w-100 shadow py-3 rounded position-sticky">
          <div className='  d-flex align-items-center justify-content-between px-2'>
         <div>
         <h1 className='fw-800'>LMS  <span className="pi pi-bars cursor-pointer" style={{ fontSize: '1.5rem' }} onClick={() => setVisible(true)} ></span></h1>
        
         </div>
         
          <h6><span className='fw-800'>Welcome : </span>{user.username}</h6>
          </div>
        </div>
        <div className="card flex justify-content-center">
    <Sidebar visible={visible} onHide={() => setVisible(false)}>
        <h2>LMS</h2>
        <h6><span className='fw-800'>Welcome : </span>{user.username}</h6>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="#">Books</a>
        </li>
        <li className="nav-item">
          <a className="nav-link " aria-current="page" href="#">Fines</a>
        </li>
    {  user.role=="Admin"?  <li className="nav-item">
          <a className="nav-link " aria-current="page" href="#">Users</a>
        </li>:null}
        <li className="nav-item">
          <a className="nav-link " aria-current="page" href="#">Reservations</a>
        </li>
        <li className="nav-item">
          <a className="nav-link " aria-current="page" href="#">Transactions</a>
        </li>
        <li className="nav-item">
          <span className=' nav-link cursor-pointer' onClick={logout}>Logout</span>
        </li>
        </ul>
    </Sidebar>
  
</div>
        </>
    )
}