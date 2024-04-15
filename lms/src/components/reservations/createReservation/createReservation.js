import  { useEffect }from 'react';
import authService from '../../../services/authService';
import { useState } from "react";
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import Swal from 'sweetalert2'
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import bookService from '../../../services/bookService';
import UserService from '../../../services/userService';
import ReservationService from '../../../services/reservationService';
export function CreateReservation(){
    const [inputs, setInputs] = useState({
        book: {value:"",err:false,errMsg:""},
        patron: {value:"",err:false,errMsg:""},
        reservationDate: {value:new Date(),err:false,errMsg:""},
        otherDetails: {value:"",err:false,errMsg:""},
        status: {value:"0",err:false,errMsg:""},})
        const [patrons, setPatrons] =useState([])
        const [books, setBooks] =useState([])
  
    useEffect(() => {
        document.title = 'Create Reservation';
        authService.verify().then((isLoggedin)=>{
         
          if(!isLoggedin){
            window.open("/login","_self")
          }
        }).catch((err)=>{
          window.open("/login","_self")
        });
        
        UserService.getUsers().then(data => {
            if (data?.users) {
               setPatrons(data.users)
            } 
      
          }).catch(err => {
            Swal.fire({
              title: 'Error!',
              text: err.response.data.message,
              icon: 'error',
            })
          })
        bookService.getBooks().then(data => {
            if (data?.books) {
               setBooks(data.books)
            } 
      
          }).catch(err => {
            Swal.fire({
              title: 'Error!',
              text: err.response.data.message,
              icon: 'error',
            })
          })
      }, []);
      const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        var isErr = false;
        if(!value){
          isErr=true
        }else{
          isErr=false
        }
        setInputs(values => ({ ...values, [name]: {
          ...values[name],
          value:value,
          err:isErr
        } }))
      }
      const handleSubmit=(e)=>{
        e.preventDefault();
        if(!inputs.reservationDate.value 
          ||!inputs.book.value 
          ||!inputs.patron.value 
          ||!inputs.otherDetails.value 
       
          ){
            Swal.fire({
              title: 'Error!',
              text: "Please fill all fields",
              icon: 'error',
            })
          }else{
           const data={
            
               "bookId": inputs.book.value.id,
              "patronID":inputs.patron.value.id,
              "reservationDate": inputs.reservationDate.value,
              "status": inputs.status.value,
              "otherDetails": inputs.otherDetails.value,
            }
            ReservationService.createReservation(data);
          }
      }
      return (
        <>
        <Link className=" nav-link px-2 mt-4 d-flex align-items-center " to="/reservations"><h4><span className='pi pi-arrow-left'></span> Back</h4></Link>
        <form onSubmit={handleSubmit} className=' p-2 mt-2'>
        <div className='card'>

      <div className='w-100 row p-2'>
      <h1>Create Reservation</h1>
      <div className='col-12 col-md-6 col-lg-4'>
              <div>
                <label className='fw-500 my-3'>Patron </label>
                <Dropdown value={inputs?.patron?.value} placeholder='patron'  options={patrons} optionLabel="userName"  type='text' name="patron" onChange={handleChange} className='w-100'  />
                 <span className='text-danger'>{inputs?.patron?.err?"Patron  is required":""}</span>
              </div>
          
        </div>  
      <div className='col-12 col-md-6 col-lg-4'>
              <div>
                <label className='fw-500 my-3'>Book </label>
                <Dropdown value={inputs?.book?.value} placeholder='Book'  options={books} optionLabel="title"  type='text' name="book" onChange={handleChange} className='w-100'  />
                 <span className='text-danger'>{inputs?.book?.err?"Book  is required":""}</span>
              </div>
          
        </div>  
        <div className='col-12 col-md-6 col-lg-4'>
              <div>
                <label className='fw-500 my-3'>Reservation Date</label>
                <Calendar value={inputs?.reservationDate?.value} placeholder='reservation Date' name="reservationDate" onChange={handleChange}  onBlur={handleChange} className='w-100' />
                <span className='text-danger'>{inputs?.reservationDate?.err?"Reservation date is required":""}</span>
              </div>
          
        </div>
         <div className='col-12'>
              <div>
                <label className='fw-500 my-3'>Other Details</label>
                <InputTextarea rows={10} value={inputs?.otherDetails?.value} placeholder='Other Details' type='text' name="otherDetails" onChange={handleChange}  onBlur={handleChange} className='w-100' />
                <span className='text-danger'>{inputs?.otherDetails?.err?"Other details are required":""}</span>
              </div>
          
        </div>
    
    
        <div className='text-end'>
              <div>
              <Button label="Create" type='submit' size="small" raised rounded className='mt-5 rounded' disabled={!inputs.book.value 
          ||!inputs.patron.value 
          ||!inputs.otherDetails.value 
          ||!inputs.reservationDate.value 
       
                  ? true : false} />
              </div>
          
        </div>
      </div>
      </div>
      </form>
        </>
      );
}