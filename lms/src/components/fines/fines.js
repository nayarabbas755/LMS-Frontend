import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import {DataView} from '../dataView/DataView'
import authService from '../../services/authService';
import { user } from '../../helpers/user';
import FineService from '../../services/fineService';
export function Fines() {
  const [fines, setFIne] = useState([])
  

  useEffect(() => {
    document.title = 'Fines';
    authService.verify().then((isLoggedin) => {

      if (!isLoggedin) {
        window.open("/login", "_self")
      }
    }).catch((err) => {
      window.open("/login", "_self")
    });

    FineService.getfines().then(data => {
      if (data?.fines) {
        data.fines.forEach(element => {
           element.name =  element.patron.userName
        });
        setFIne(data.fines)
      } else {
        setFIne([])
      }

    }).catch(err => {
      Swal.fire({
        title: 'Error!',
        text: err.response.data.message,
        icon: 'error',
      })
    })
  }, []);
 const columns=[
    {
        field:"name",
        header:"Patron",
        type:"text",
        module:"fine"
    },
    {
        field:"fineAmount",
        header:"Fine Amount",
        type:"text",
        module:"fine"
    },
    {
        field:"status",
        header:"Status",
        type:"bool",
        module:"fine"
    },
    {
        field:"fineDate",
        header:"Fine Date",
        type:"date",
        module:"fine"
    }
 ]
 const handleClick = (value) => {
    if(user.role=="Admin"){
        window.open("/fine/edit/"+value,"_self")
    }
       }
  return (
    <>
      <div className='w-100 d-flex align-items-center justify-content-between px-2 mt-4'>
        <h1>Fines </h1>
       
        {user.role == "Admin" ? <Link to="/create_fine" className='btn btn-sm primary-bg text-white d-flex align-items-center' > <span className='pi pi-plus me-2'></span> Add fine</Link> : null}
      </div>

      <div className=' w-100 px-2 '>
      {user.role == "Admin" ? <h5 className='text-danger'>Click on row to edit fine</h5>:null}
        <DataView  columns={columns} data={fines} click={handleClick}/>
    
      </div>
    </>
  );
}
