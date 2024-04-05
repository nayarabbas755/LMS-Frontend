import { useEffect, useState } from 'react';
import authService from '../../services/authService';
import { user } from '../../helpers/user';
import { Link } from 'react-router-dom';
import bookService from '../../services/bookService';
import Swal from 'sweetalert2'
import bookImage1 from '../../assets/images/books/13939.jpg'
import bookImage2 from '../../assets/images/books/157.jpg'
import bookImage3 from '../../assets/images/books/309012-P8ZH0K-662.jpg'
import bookImage4 from '../../assets/images/books/3145.jpg'
import bookImage5 from '../../assets/images/books/317881-P9FSAE-962.jpg'
import bookImage6 from '../../assets/images/books/4824032.jpg'
import bookImage7 from '../../assets/images/books/572.jpg'
import bookImage8 from '../../assets/images/books/7188504.jpg'
import bookImage9 from '../../assets/images/books/858.jpg'
import Moment from 'moment';

export function Books() {
  const [books, setBooks] = useState([])
  const [bookImages, setImages] = useState([bookImage1, bookImage2, bookImage3, bookImage4, bookImage5, bookImage6, bookImage7, bookImage8, bookImage9])
  const randomNumberInRange = (min, max,i) => {
    var random = Math.floor(Math.random()
    * (max - min + 1)) + min;
    books[i]["random"]=random
    return random;
}; 


  useEffect(() => {
    document.title = 'Books';
    authService.verify().then((isLoggedin) => {

      if (!isLoggedin) {
        window.open("/login", "_self")
      }
    }).catch((err) => {
      window.open("/login", "_self")
    });

    bookService.getBooks().then(data => {
      if (data?.books) {
        setBooks(data.books)
      } else {
        setBooks([])
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
      <div className='w-100 d-flex align-items-center justify-content-between px-2 mt-4'>
        <h1>Books </h1>

        {user.role == "Admin" ? <Link to="/create_book" className='btn btn-sm primary-bg text-white d-flex align-items-center' > <span className='pi pi-plus me-2'></span> Add book</Link> : null}
      </div>

      <div className=' w-100 my-4 row'>
        
        {books.map((row, i) => (
          <div className='col-12 col-md-6 col-lg-4 col-xl-3' key={row.id}>
            <div className='card mx-2 my-4'>
              <div className='card-header'>
                <img src={ 
                    bookImages[randomNumberInRange(0,8,i)]
                
                } className='w-100' />
              </div>
              <div className='card-body'>
                <div className='d-flex justify-content-between align-items-center'>
                  <h6 className='fw-800'>{row?.title}</h6>
                  {row.availabilityStatus=="true" ? <span className='green-text'>Available</span> : <span className='text-danger'>Out of stock</span>}

                </div>
                <div className='d-flex justify-content-between align-items-center'>
                  <h6 className='fw-800'>Author</h6>
                  {row.author}
                </div>
                <div className='d-flex justify-content-between align-items-center'>
                  <h6 className='fw-800'>Publication Date</h6>
                  {Moment(row.publicationDate).format('DD-MM-YYYY')}
                </div>
                <div className='d-flex justify-content-between align-items-center'>
                  <h6 className='fw-800'>Genre</h6>
                  {row.genre?.genreName}
                </div>
                <div className='d-flex justify-content-between align-items-center'>
                  <h6 className='fw-800'>ISBN</h6>
                  {row.isbn}
                </div>
              </div>
              <div className='card-footer'>
                <div className='w-100 text-end'>
                  <Link className='btn btn-sm primary-bg text-white' to={"/book/"+row.id+"/"+row.random}  >View</Link>
                { user.role=="Admin"? <Link className='btn btn-sm bg-warning  ms-2' to={"/book/edit/"+row.id}  >Edit</Link>:null}
                </div>
              </div>
            </div>
          </div>))}
      </div>
    </>
  );
}
