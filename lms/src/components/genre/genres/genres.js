import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import genreService from '../../../services/genreService';
import authService from '../../../services/authService';
import { user } from '../../../helpers/user';
import {DataView} from '../../dataView/DataView'
export function Genres() {
  const [genre, setGenre] = useState([])
  

  useEffect(() => {
    document.title = 'Genres';
    authService.verify().then((isLoggedin) => {

      if (!isLoggedin) {
        window.open("/login", "_self")
      }
    }).catch((err) => {
      window.open("/login", "_self")
    });

    genreService.getGenres().then(data => {
      if (data?.genres) {
        setGenre(data.genres)
      } else {
        setGenre([])
      }

    }).catch(err => {
      Swal.fire({
        title: 'Error!',
        text: err.response.data.message,
        icon: 'error',
      })
    })
  }, []);
 const columns=[
    {
        field:"genreName",
        header:"Genre Name",
        type:"text"
    },
    {
        field:"description",
        header:"Description",
        type:"text"
    },
    {
        field:"otherDetails",
        header:"Other Details",
        type:"text"
    }
 ]
 const handleClick = (value) => {
    if(user.role=="Admin"){
        window.open("/genre/edit/"+value,"_self")
    }
       }
  return (
    <>
      <div className='w-100 d-flex align-items-center justify-content-between px-2 mt-4'>
        <h1>Genres </h1>
       
        {user.role == "Admin" ? <Link to="/create_genre" className='btn btn-sm primary-bg text-white d-flex align-items-center' > <span className='pi pi-plus me-2'></span> Add genre</Link> : null}
      </div>

      <div className=' w-100 px-2 '>
      {user.role == "Admin" ? <h5 className='text-danger'>Click on row to edit genre</h5>:null}
        <DataView  columns={columns} data={genre} click={handleClick}/>
    
      </div>
    </>
  );
}
