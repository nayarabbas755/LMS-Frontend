import React, { useEffect }from 'react';
import { Button } from 'primereact/button';
import Swal from 'sweetalert2'
import { Link } from "react-router-dom";
import { useState } from "react";
import { InputText } from 'primereact/inputtext';
import authService from '../../services/authService';
export function Login() {
  useEffect(() => {
    document.title = 'Login';
    authService.verify().then((isLoggedin)=>{
      console.log(isLoggedin)
      if(isLoggedin){
        window.open("/books","_self")
      }
    }).catch((err)=>{
    });;
 
  }, []);
  const [inputs, setInputs] = useState({ email: {value:"",err:false,errMsg:""}, password: {value:"",err:false,errMsg:""}});
  const [showPassword, setShowPassword] = useState(false);
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

  const handleSubmit =  (e) => {
    e.preventDefault()
    if(inputs.password.err || inputs.email.err){
      Swal.fire({
        title: 'Error!',
        text: "Please fill all fields",
        icon: 'error',
      })
    }else{
      var data = {
        email: inputs.email.value,
        password: inputs.password.value}
     authService.login(data);
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
        <div className='col-12'>
          <div className='text-center'>
            <h2 className='fw-800'>LMS - Login</h2>
          </div>
        </div>

        <div className='col-12 col-md-10 col-lg-8 col-xl-6 card mt-3  shadow-lg py-3 mx-auto'>
          <form onSubmit={handleSubmit} className=' p-3'>
            <div>
              <label className='fw-500 my-3'>Email</label>
              <InputText value={inputs?.email?.value} placeholder='test@example.com' type='email' name="email" onChange={handleChange}  onBlur={handleChange} className='w-100' />
              <span className='text-danger'>{inputs?.password?.err?"Email is required":""}</span>
            </div>
            <div>
              <label className='fw-500 my-3'>Password</label>
              <div className='position-relative'>
                <InputText value={inputs?.password.value} placeholder='Enter your password' type={showPassword ? 'text' : 'password'} name="password" onBlur={handleChange} onChange={handleChange} className='w-100' />

                <span className={(!showPassword ? 'pi-eye' : 'pi-eye-slash') + " pi position-absolute end-0 my-3 me-2  cursor-pointer "} onClick={passwordToggle}></span>
              </div>
              <span className='text-danger'>{inputs?.password?.err?"Password is required":""}</span>
            </div>
            <div className='text-center'>
              <Button label="Login" type='submit' size="small" raised rounded className='mt-5 rounded' disabled={!inputs.email.value || !inputs.password.value ? true : false} />
             
            </div>
            <div className='text-center mt-2'>
            <Link to="/register">Create an account</Link>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}