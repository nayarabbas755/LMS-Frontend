import  { useEffect }from 'react';
import authService from '../../../services/authService';
import { useState } from "react";
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { ToggleButton } from 'primereact/togglebutton';
import { InputTextarea } from 'primereact/inputtextarea';
import Swal from 'sweetalert2'
import { Button } from 'primereact/button';
import bookService from '../../../services/bookService';
import { Link, useParams } from 'react-router-dom';
import genreService from '../../../services/genreService';

import { Dropdown } from 'primereact/dropdown';
export function EditBook(){
    
    const [inputs, setInputs] = useState({
        title: {value:"",err:false,errMsg:""},
        isbn: {value:"",err:false,errMsg:""},
        genre: {value:"",err:false,errMsg:""},
        publicationDate: {value:"",err:false,errMsg:""},
        availabilityStatus: {value:true,err:false,errMsg:""},
        otherDetails: {value:"",err:false,errMsg:""},
      author: {value:"",err:false,errMsg:""},})
    let { id } = useParams();
  
    const [genres,setGenres]=useState([])
    useEffect(() => {
      document.title = 'Edit Book';
      authService.verify().then((isLoggedin) => {
  
        if (!isLoggedin) {
          window.open("/login", "_self")
        }
      }).catch((err) => {
        window.open("/login", "_self")
      });
  
      bookService.getBookById(id).then(data => {
        if (data?.books) {
            setInputs(values => ({ ...values, ["author"]: {
                ...values["author"],
                value:data.books.author,
                err:false
              } }))
            setInputs(values => ({ ...values, ["title"]: {
                ...values["title"],
                value:data.books.title,
                err:false
              } }))
            setInputs(values => ({ ...values, ["isbn"]: {
                ...values["isbn"],
                value:data.books.isbn,
                err:false
              } }))
            setInputs(values => ({ ...values, ["genre"]: {
                ...values["genre"],
                value:data.books.genre,
                err:false
              } }))
            setInputs(values => ({ ...values, ["publicationDate"]: {
                ...values["publicationDate"],
                value:new Date(data.books.publicationDate),
                err:false
              } }))
            setInputs(values => ({ ...values, ["availabilityStatus"]: {
                ...values["availabilityStatus"],
                value:data.books.availabilityStatus,
                err:false
              } }))
            setInputs(values => ({ ...values, ["otherDetails"]: {
                ...values["otherDetails"],
                value:data.books.otherDetails,
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
      genreService.getGenres().then(data => {
        if (data?.genres) {
           setGenres(data.genres)
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
        console.log(inputs)
      }
      const handleSubmit=(e)=>{
        e.preventDefault();
        if(!inputs.title.value 
          ||!inputs.author.value 
          ||!inputs.genre.value 
          ||!inputs.isbn.value 
          ||!inputs.publicationDate.value 
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
              "title": inputs.title.value ,
              "author": inputs.author.value ,
              "isbn": inputs.isbn.value ,
              "genre": inputs.genre.value.id ,
              "publicationDate": inputs.publicationDate.value ,
              "availabilityStatus": inputs.availabilityStatus.value.toString() ,
              "otherDetails": inputs.otherDetails.value 
            }
            bookService.updateBook(data);
          }
      }
      return (
        <>
        <Link className=" nav-link px-2 mt-4 d-flex align-items-center " to="/books"><h4><span className='pi pi-arrow-left'></span> Back</h4></Link>
        <form onSubmit={handleSubmit} className=' p-2 mt-2'>
        <div className='card'>

      <div className='w-100 row p-2'>
      <h1>Edit Book</h1>
        <div className='col-12 col-md-6 col-lg-4'>
              <div>
                <label className='fw-500 my-3'>Title</label>
                <InputText value={inputs?.title?.value} placeholder='Title' type='text' name="title" onChange={handleChange}  onBlur={handleChange} className='w-100' />
                <span className='text-danger'>{inputs?.title?.err?"Title is required":""}</span>
              </div>
          
        </div>  
        <div className='col-12 col-md-6 col-lg-4'>
              <div>
                <label className='fw-500 my-3'>Author</label>
                <InputText value={inputs?.author?.value} placeholder='Author' type='text' name="author" onChange={handleChange}  onBlur={handleChange} className='w-100' />
                <span className='text-danger'>{inputs?.author?.err?"Author is required":""}</span>
              </div>
          
        </div>
        <div className='col-12 col-md-6 col-lg-4'>
              <div>
                <label className='fw-500 my-3'>ISBN</label>
                <InputText value={inputs?.isbn?.value} placeholder='ISBN' type='text' name="isbn" onChange={handleChange}  onBlur={handleChange} className='w-100' />
                <span className='text-danger'>{inputs?.isbn?.err?"Author is required":""}</span>
              </div>
          
        </div>
        <div className='col-12 col-md-6 col-lg-4'>
              <div>
                <label className='fw-500 my-3'>Genre</label>
                <Dropdown value={inputs?.genre?.value} placeholder='Genre'  options={genres} optionLabel="genreName"  type='text' name="genre" onChange={handleChange} className='w-100'  />
                {/* <InputText value={inputs?.genre?.value} placeholder='Genre' type='text' name="genre" onChange={handleChange}  onBlur={handleChange} className='w-100' /> */}
                <span className='text-danger'>{inputs?.genre?.err?"Genre is required":""}</span>
               </div>
          
        </div>
        <div className='col-12 col-md-6 col-lg-4'>
              <div>
                <label className='fw-500 my-3'>Publication Date</label>
                <Calendar value={inputs?.publicationDate?.value} placeholder='Publication Date' name="publicationDate" onChange={handleChange}  onBlur={handleChange} className='w-100' />
                <span className='text-danger'>{inputs?.publicationDate?.err?"Publication date is required":""}</span>
              </div>
          
        </div>
        <div className='col-12 col-md-6 col-lg-4'>
              <div>
                <label className='fw-500 my-3'>Availability Status</label>
                <ToggleButton checked={inputs?.availabilityStatus?.value} onLabel="Available" offLabel="Out of stock" placeholder='Availability Status'  name="availabilityStatus" onChange={handleChange}  onBlur={handleChange} className='w-100' />
                
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
              <Button label="Update" type='submit' size="small" raised rounded className='mt-5 rounded' disabled={!inputs.title.value 
                  ||!inputs.author.value 
                  ||!inputs.genre.value
                  ||!inputs.isbn.value 
                  ||!inputs.publicationDate.value 
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