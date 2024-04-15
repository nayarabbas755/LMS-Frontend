import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

import {DataView} from '../dataView/DataView'
import authService from '../../services/authService';
import { user } from '../../helpers/user';
import ReservationService from '../../services/reservationService';
export function Reservations() {
  const [reservations, setReservations] = useState([])
  

  useEffect(() => {
    document.title = 'Reservations';
    authService.verify().then((isLoggedin) => {

      if (!isLoggedin) {
        window.open("/login", "_self")
      }
      if(user.role == "Admin" )
    {
        ReservationService.getreservations().then(data => {
      if (data?.reservations) {
        data.reservations.forEach(element => {
            element.bookName =  element.book.title
            element.userName =  element.patron.userName
         });
        setReservations(data.reservations)
      } else {
        setReservations([])
      }

    }).catch(err => {
      Swal.fire({
        title: 'Error!',
        text: err.response.data.message,
        icon: 'error',
      })
    })}else{
        ReservationService.getreservationByUser().then(data => {
            if (data?.reservations) {
                data.reservations.forEach(element => {
                    element.userName =  element.patron.userName
                    element.bookName =  element.book.title
                 });
                setReservations(data.reservations)
            } else {
              setReservations([])
            }
      
          }).catch(err => {
            Swal.fire({
              title: 'Error!',
              text: err.response.data.message,
              icon: 'error',
            })
          })
    }
    }).catch((err) => {
      window.open("/login", "_self")
    });


  }, []);
 const columns=[
    {
        field:"bookName",
        header:"Book Name",
        type:"text",  module:"reservations"
    },
    {
        field:"reservationDate",
        header:"Reservation Date",
        type:"date",  module:"reservations"
    },
    {
        field:"userName",
        header:"UserName",
        type:"text",  module:"reservations"
    },
    {
        field:"otherDetails",
        header:"Other Details",
        type:"text",  module:"reservations"
    }
 ]

  return (
    <>
      <div className='w-100 d-flex align-items-center justify-content-between px-2 mt-4'>
        <h1>Reservations </h1>

        {user.role == "Admin" ? <Link to="/create_reservation" className='btn btn-sm primary-bg text-white d-flex align-items-center' > <span className='pi pi-plus me-2'></span> Add Reservation</Link> : null}
      </div>

      <div className=' w-100 px-2 '>
        <DataView  columns={columns} data={reservations} />
    
      </div>
    </>
  );
}
