import  { useEffect, useState }from 'react';
import authService from '../../services/authService';
import { DataView } from '../dataView/DataView';
import { user } from '../../helpers/user';
import { Link } from 'react-router-dom';
import bookService from '../../services/bookService';
import Swal from 'sweetalert2'
export function Books() {
  const [books,setBooks] = useState([])
  useEffect(() => {
    document.title = 'Books';
    authService.verify().then((isLoggedin)=>{
     
      if(!isLoggedin){
        window.open("/login","_self")
      }
    }).catch((err)=>{
      window.open("/login","_self")
    });

    bookService.getBooks().then(data=>{
        setBooks(data.books)
    }).catch(err=>{
      Swal.fire({
        title: 'Error!',
        text: err.response.data.message,
        icon: 'error',
      })
    })
  }, []);
  const columns = [
    {field: 'title', header: 'Title',type:"text"},
    {field: 'author', header: 'Author',type:"text"},
    {field: 'isbn', header: 'ISBN',type:"text"},
    {field: 'genre', header: 'Genre',type:"text"},
    {field: 'publicationDate', header: 'Publication Date',type:"date"},
    {field: 'availabilityStatus', header: 'Status',type:"bool"}
];
  return (
    <>
    <div className='w-100 d-flex align-items-center justify-content-between px-2 mt-4'>
      <h1>Books</h1>
      { user.role=="Admin"?<Link to="/create_book" className='btn btn-sm primary-bg text-white d-flex align-items-center' > <span className='pi pi-plus me-2'></span> Add book</Link>:null}
    </div>
    <div className='px-2 my-4'>
      <DataView columns={columns} data={books}/>
    </div>
    </>
  );
}
