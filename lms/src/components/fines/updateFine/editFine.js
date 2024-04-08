import  { useEffect }from 'react';
import authService from '../../../services/authService';
import { useState } from "react";
import { InputText } from 'primereact/inputtext';
import Swal from 'sweetalert2'
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Link, useParams } from 'react-router-dom';
import UserService from '../../../services/userService';
import FineService from '../../../services/fineService';
import { Dropdown } from 'primereact/dropdown';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
         
export function EditFine(){
    let {id}=useParams();
  const [inputs, setInputs] = useState({
    patron: {value:"",err:false,errMsg:""},
    fineAmount: {value:"",err:false,errMsg:""},
    fineDate: {value:new Date(),err:false,errMsg:""},
    otherDetails: {value:"",err:false,errMsg:""},
    status: {value:"0",err:false,errMsg:""},})
    const [patrons, setPatrons] =useState([])
    const [selectdPatron, setSelectedPatrons] =useState()
    useEffect(() => {
        document.title = 'Edit Fine';
        authService.verify().then((isLoggedin)=>{
         
          if(!isLoggedin){
            window.open("/login","_self")
          }
        }).catch((err)=>{
          window.open("/login","_self")
        });
        
     
          FineService.getFineById(id).then(data => {
            if (data?.fines) {
                setInputs(values => ({ ...values, ["patron"]: {
                    ...values["patron"],
                    value:data.fines.patron,
                    err:false
                  } }))
                  setSelectedPatrons(data.fines.patron)
                setInputs(values => ({ ...values, ["fineAmount"]: {
                    ...values["fineAmount"],
                    value:data.fines.fineAmount,
                    err:false
                  } }))
              
      
                setInputs(values => ({ ...values, ["otherDetails"]: {
                    ...values["otherDetails"],
                    value:data.fines.otherDetails,
                    err:false
                  } }))
                setInputs(values => ({ ...values, ["status"]: {
                    ...values["status"],
                    value:data.fines.status,
                    err:false
                  } }))
            } 
     
          }).catch(err => {
            Swal.fire({
              title: 'Error!',
              text: err.response.data.message,
              icon: 'error',
            })
          })
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
          console.log(inputs,patrons)
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
        console.log(inputs)
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
            "Id":id,
              "patronId": inputs.patron.value.id,
              "fineAmount": inputs.fineAmount.value ,
              "fineDate": inputs.fineDate.value ,
              "status": inputs.status.value ,
              "otherDetails": inputs.otherDetails.value 
            }
            FineService.updateFine(data);
          }
      }
      return (
        <>
        <Link className=" nav-link px-2 mt-4 d-flex align-items-center " to="/fines"><h4><span className='pi pi-arrow-left'></span> Back</h4></Link>
        <form onSubmit={handleSubmit} className=' p-2 mt-2'>
        <div className='card'>
    
      <div className='w-100 row p-2'>
      <h1>Edit Fine</h1>
        {/* <div className='col-12 col-md-6 col-lg-4'>
              <div>
                <label className='fw-500 my-3'>Patron </label>
                <Dropdown value={selectdPatron} placeholder='patron'  options={patrons} optionLabel="userName"  type='text' name="patron" onChange={handleChange} className='w-100'  />
                 <span className='text-danger'>{inputs?.patron?.err?"Patron  is required":""}</span>
              </div>
          
        </div>   */}
        <div className='col-12 col-md-6 col-lg-4'>
              <div>
                <label className='fw-500 my-3'>Fine Amount</label>
                <InputText value={inputs?.fineAmount?.value} placeholder='Fine Amount' type='number' min={0} name="fineAmount" onChange={handleChange}  onBlur={handleChange} className='w-100' />
                <span className='text-danger'>{inputs?.fineAmount?.err?"Fine Amount is required":""}</span>
              </div>
          
        </div> 
        <div className='col-12 col-md-6 col-lg-4'>
              <div>
                <label className='fw-500 my-3'>Status</label>
                <TriStateCheckbox value={inputs?.status?.value=="0"?null:inputs?.status?.value=="2"?true:false} placeholder='Statys' type='number' name="status" onChange={(event)=>{
                    const name = event.target.name;
                    let value =  event.target.value;
                    if(value==null){
                        value="0"
                    }else if (value==false){
                        value="1"
                    }else if (value==true){
                        value="2"
                    }
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
                }} className='w-100' />
                <label>{
                (inputs.status.value=="0")?"Pending": (inputs.status.value=="1")?"Cancelled":"Paid"

            }</label>
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
              <Button label="Update" type='submit' size="small" raised rounded className='mt-5 rounded' disabled={!inputs.patron.value 
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