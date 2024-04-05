import { useParams  } from "react-router-dom";
import bookService from "../../../services/bookService";
import { useEffect, useState } from 'react';
import authService from '../../../services/authService';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import bookImage1 from '../../../assets/images/books/13939.jpg'
import bookImage2 from '../../../assets/images/books/157.jpg'
import bookImage3 from '../../../assets/images/books/309012-P8ZH0K-662.jpg'
import bookImage4 from '../../../assets/images/books/3145.jpg'
import bookImage5 from '../../../assets/images/books/317881-P9FSAE-962.jpg'
import bookImage6 from '../../../assets/images/books/4824032.jpg'
import bookImage7 from '../../../assets/images/books/572.jpg'
import bookImage8 from '../../../assets/images/books/7188504.jpg'
import bookImage9 from '../../../assets/images/books/858.jpg'
import Moment from 'moment';
export function ViewBook(){
    
   
    let { id,index } = useParams();
    const [book, setBook] = useState()
    const [bookImages, setImages] = useState([bookImage1, bookImage2, bookImage3, bookImage4, bookImage5, bookImage6, bookImage7, bookImage8, bookImage9])
  
  
    useEffect(() => {
      document.title = 'Book Details';
      authService.verify().then((isLoggedin) => {
  
        if (!isLoggedin) {
          window.open("/login", "_self")
        }
      }).catch((err) => {
        window.open("/login", "_self")
      });
  
      bookService.getBookById(id).then(data => {
        if (data?.books) {
          setBook(data.books)
        } else {
          setBook()
        }
  
      }).catch(err => {
        Swal.fire({
          title: 'Error!',
          text: err.response.data.message,
          icon: 'error',
        })
      })
    }, []);
  
    return (
      <>
         <Link className=" nav-link px-2 mt-4 d-flex align-items-center " to="/books"><h4><span className='pi pi-arrow-left'></span> Back</h4></Link>
     
        <div className='w-100 d-flex align-items-center justify-content-between px-2 mt-2'>
          <h1>Book details </h1>
  
      </div>
  
        <div className=' w-100 my-4  '>
  
          {
           <div className="row w-100 " key={book?.id}>
            <div className='col-12 col-sm-6 col-md-4 ' >
              <div className=' mx-2 my-4'>
              
                <div className='card-body'>
                <img src={bookImages[index]} className='w-100' />
                
               
              </div>
            </div>
            </div>
            <div className='col-12 col-sm-6 col-md-8 '>
              <div className=' mx-2 my-4'>
             
                <div className='card-body'>
                 
                <div className='d-flex justify-content-between align-items-center'>
                    <h6 className='fw-800'>Title</h6>
                    {book?.title}
                  </div>
                <div className='d-flex justify-content-between align-items-center'>
                    <h6 className='fw-800'>Author</h6>
                    {book?.author}
                  </div>
                <div className='d-flex justify-content-between align-items-center'>
                    <h6 className='fw-800'>Availability</h6>
                    {book?.availabilityStatus=="true" ? <span className='green-text'>Available</span> : <span className='text-danger'>Out of stock</span>}
                  </div>
                  <div className='d-flex justify-content-between align-items-center'>
                    <h6 className='fw-800'>Publication Date</h6>
                    {Moment(book?.publicationDate).format('DD-MM-YYYY')}
                  </div>
                  <div className='d-flex justify-content-between align-items-center'>
                    <h6 className='fw-800'>Genre</h6>
                    {book?.genre?.genreName}
                  </div>
                  <div className='d-flex justify-content-between align-items-center'>
                    <h6 className='fw-800'>ISBN</h6>
                    {book?.isbn}
                  </div>
                  <div className='d-flex justify-content-between align-items-center'>
                    <h6 className='fw-800'>Other Details</h6>
                   
                  </div>
                  <div className='d-flex justify-content-between align-items-center'>
                  {book?.otherDetails}
                   
                  </div>
                </div>
               
              </div>
            </div></div>
            }
        </div>
      </>
    );
}