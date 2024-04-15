import  { useEffect }from 'react';
import authService from '../../../services/authService';
import { useState } from "react";
import { InputText } from 'primereact/inputtext';
import Swal from 'sweetalert2'
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Link, useParams } from 'react-router-dom';
import genreService from '../../../services/genreService';
export function EditGenre(){
    let {id} = useParams();
  const [inputs, setInputs] = useState({
    genreName: {value:"",err:false,errMsg:""},
     description: {value:"",err:false,errMsg:""},
     otherDetails: {value:"",err:false,errMsg:""},
   author: {value:"",err:false,errMsg:""},})
  
    useEffect(() => {
        document.title = 'Edit Genre';
        authService.verify().then((isLoggedin)=>{
         
          if(!isLoggedin){
            window.open("/login","_self")
          }
        }).catch((err)=>{
          window.open("/login","_self")
        });
        
        genreService.getGenreById(id).then(data => {
            if (data?.genres) {
                
                setInputs(values => ({ ...values, ["genreName"]: {
                    ...values["genreName"],
                    value:data.genres.genreName,
                    err:false
                  } }))
                setInputs(values => ({ ...values, ["description"]: {
                    ...values["description"],
                    value:data.genres.description,
                    err:false
                  } }))
                setInputs(values => ({ ...values, ["otherDetails"]: {
                    ...values["otherDetails"],
                    value:data.genres.otherDetails,
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
        if(!inputs.genreName.value 
          ||!inputs.description.value 
          ||!inputs.otherDetails.value 
       
          ){
            Swal.fire({
              title: 'Error!',
              text: "Please fill all fields",
              icon: 'error',
            })
          }else{
           const data={
            "id":id,
              "genreName": inputs.genreName.value ,
              "description": inputs.description.value ,
              "otherDetails": inputs.otherDetails.value 
            }
            genreService.updateGenre(data);
          }
      }
      return (
        <>
        <Link className=" nav-link px-2 mt-4 d-flex align-items-center " to="/genres"><h4><span className='pi pi-arrow-left'></span> Back</h4></Link>
        <form onSubmit={handleSubmit} className=' p-2 mt-2'>
        <div className='card'>

      <div className='w-100 row p-2'>
      <h1>Edit Genre</h1>
        <div className='col-12 col-md-6 col-lg-4'>
              <div>
                <label className='fw-500 my-3'>Name</label>
                <InputText value={inputs?.genreName?.value} placeholder='Name' type='text' name="genreName" onChange={handleChange}  onBlur={handleChange} className='w-100' />
                <span className='text-danger'>{inputs?.genreName?.err?"Name is required":""}</span>
              </div>
          
        </div>  
        <div className='col-12 col-md-6 col-lg-4'>
              <div>
                <label className='fw-500 my-3'>Description</label>
                <InputText value={inputs?.description?.value} placeholder='Description' type='text' name="description" onChange={handleChange}  onBlur={handleChange} className='w-100' />
                <span className='text-danger'>{inputs?.description?.err?"Description is required":""}</span>
              </div>
          
        </div>  <div className='col-12'>
              <div>
                <label className='fw-500 my-3'>Other Details</label>
                <InputTextarea rows={10} value={inputs?.otherDetails?.value} placeholder='Other Details' type='text' name="otherDetails" onChange={handleChange}  onBlur={handleChange} className='w-100' />
                <span className='text-danger'>{inputs?.otherDetails?.err?"Other details are required":""}</span>
              </div>
          
        </div>
    
        <div className='text-end'>
              <div>
              <Button label="Update" type='submit' size="small" raised rounded className='mt-5 rounded' disabled={!inputs.genreName.value 
          ||!inputs.description.value 
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