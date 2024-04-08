import  { useEffect }from 'react';
import authService from '../../../services/authService';
import { useState } from "react";
import { InputText } from 'primereact/inputtext';
import Swal from 'sweetalert2'
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';
import UserService from '../../../services/userService';
import FineService from '../../../services/fineService';
import { Dropdown } from 'primereact/dropdown';
export function CreateFine(){
  const [inputs, setInputs] = useState({
    patron: {value:"",err:false,errMsg:""},
    fineAmount: {value:"",err:false,errMsg:""},
    fineDate: {value:new Date(),err:false,errMsg:""},
    otherDetails: {value:"",err:false,errMsg:""},
    status: {value:"0",err:false,errMsg:""},})
    const [patrons, setPatrons] =useState([])
    useEffect(() => {
        document.title = 'Create Fine';
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
        if(!inputs.patron.value 
          ||!inputs.fineAmount.value 
          ||!inputs.fineDate.value 
          ||!inputs.status.value 
          ||!inputs.otherDetails.value 
       
          ){
            Swal.fire({
              title: 'Error!',
              text: "Please fill all fields",
              icon: 'error',
            })
          }else{
           const data={
              "patronId": inputs.patron.value.id,
              "fineAmount": inputs.fineAmount.value ,
              "fineDate": inputs.fineDate.value ,
              "status": inputs.status.value ,
              "otherDetails": inputs.otherDetails.value 
            }
            FineService.createFine(data);
          }
      }
      return (
        <>
        <Link className=" nav-link px-2 mt-4 d-flex align-items-center " to="/fines"><h4><span className='pi pi-arrow-left'></span> Back</h4></Link>
        <form onSubmit={handleSubmit} className=' p-2 mt-2'>
        <div className='card'>

      <div className='w-100 row p-2'>
      <h1>Create Fine</h1>
        <div className='col-12 col-md-6 col-lg-4'>
              <div>
                <label className='fw-500 my-3'>Patron </label>
                <Dropdown value={inputs?.patron?.value} placeholder='patron'  options={patrons} optionLabel="userName"  type='text' name="patron" onChange={handleChange} className='w-100'  />
                 <span className='text-danger'>{inputs?.patron?.err?"Patron  is required":""}</span>
              </div>
          
        </div>  
        <div className='col-12 col-md-6 col-lg-4'>
              <div>
                <label className='fw-500 my-3'>Fine Amount</label>
                <InputText value={inputs?.fineAmount?.value} placeholder='Fine Amount' type='number' min={0} name="fineAmount" onChange={handleChange}  onBlur={handleChange} className='w-100' />
                <span className='text-danger'>{inputs?.fineAmount?.err?"Fine Amount is required":""}</span>
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
              <Button label="Create" type='submit' size="small" raised rounded className='mt-5 rounded' disabled={!inputs.patron.value 
          ||!inputs.fineAmount.value 
          ||!inputs.fineDate.value 
          ||!inputs.status.value 
          ||!inputs.otherDetails.value 
                  ? true : false} />
              </div>
          
        </div>
      </div>
      </div>
      </form>
        </>
      );
}