import React, { useEffect }from 'react'
import { Button } from 'primereact/button';
import Swal from 'sweetalert2'
import { Link } from "react-router-dom";
import { useState } from "react";
import { InputText } from 'primereact/inputtext';
import authService from '../../services/authService';
import {Map} from '../Map/map';

export function Register() {
  useEffect(() => {
    document.title = 'Register';
  }, []);
    const [inputs, setInputs] = useState({ email: {value:"",err:false,errMsg:""}, password: {value:"",err:false,errMsg:""},
    confirmPassword: {value:"",err:false,errMsg:""},userName: {value:"",err:false,errMsg:""}});
    const [showPassword, setShowPassword] = useState(false);
    const [message, setShowMessage] = useState(false);
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
  
    const handleSubmit = (e) => {
      e.preventDefault()
      if(inputs.password.err || inputs.email.err || inputs.userName.err){
        Swal.fire({
          title: 'Error!',
          text: "Please fill all fields",
          icon: 'error',
        })
      }else{
        var data = {
          email: inputs.email.value,
          password: inputs.password.value,
          userName:inputs.userName.value
        }
       authService.register(data);

      }

    }
    const passwordToggle = (e) => {
      if (!showPassword) {
        setShowPassword(true)
      }
      else {
        setShowPassword(false)
      }
  
  
    }
    return (
      <div className='w-100 d-flex flex-column min-h-90vh align-items-center justify-content-center'>
        <div className='row w-100'>
        <div className='col-12 col-lg-6 my3'>
        <div className='row w-100'>
          <div className='col-12'>
            <div className='text-center'>
              <h2 className='fw-800'>LMS - Register</h2>
            </div>
          </div>
  
          <div className='col-12 col-sm-10  card mt-3  shadow-lg py-3 mx-auto'>
            <form onSubmit={handleSubmit} className=' p-3'>
              <div>
                <label className='fw-500 my-3'>Email</label>
                <InputText value={inputs?.email?.value} placeholder='test@example.com' type='email' name="email" onChange={handleChange}  onBlur={handleChange} className='w-100' />
                <span className='text-danger'>{inputs?.password?.err?"Email is required":""}</span>
              </div>
              <div>
                <label className='fw-500 my-3'>UserName</label>
                <InputText value={inputs?.userName?.value} placeholder='UserName' type='text' name="userName" onChange={handleChange}  onBlur={handleChange} className='w-100' />
                <span className='text-danger'>{inputs?.userName?.err?"UserName is required":""}</span>
              </div>
              <div>
                <label className='fw-500 my-3'>Password</label>
                <div className='position-relative'>
                  <InputText value={inputs?.password.value} placeholder='Enter your password' type={showPassword ? 'text' : 'password'} name="password" onBlur={handleChange} onChange={handleChange} className='w-100' />
  
                  <span className={(!showPassword ? 'pi-eye' : 'pi-eye-slash') + " pi position-absolute end-0 my-3 me-2  cursor-pointer "} onClick={passwordToggle}></span>
                </div>
                <span className='text-danger'>{inputs?.password?.err?"Password is required":""}</span>
              </div>
              <div>
                <label className='fw-500 my-3'>Confirm Password</label>
                <div className='position-relative'>
                  <InputText value={inputs?.confirmPassword.value} placeholder='Enter your password' type={showPassword ? 'text' : 'password'} name="confirmPassword" onBlur={handleChange} onChange={handleChange} className='w-100' />
  
                  <span className={(!showPassword ? 'pi-eye' : 'pi-eye-slash') + " pi position-absolute end-0 my-3 me-2  cursor-pointer "} onClick={passwordToggle}></span>
                </div>
                <span className='text-danger'>{inputs?.confirmPassword?.value!==inputs?.password?.value?"Password is doesn't match":""}</span>
              </div>

              <div className='text-center'>
                <Button label="Register" type='submit' size="small" raised rounded className='mt-5 rounded' disabled={!inputs.email.value 
                  || inputs?.confirmPassword?.value!==inputs?.password?.value  ||  !inputs.userName.value 
                  ? true : false} />
               
              </div>
         
              <div className='text-center mt-2'>
              Already have an account?<Link to="/login"> Login</Link>
              </div>
            </form>
  
          </div>
        </div>
        </div>
        <div className='col-12 col-lg-6 mt-5'>
          <Map/>
        </div>
        </div>
      </div>
    );
  
}
