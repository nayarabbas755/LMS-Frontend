import { useEffect, useState } from 'react';
import Swal from 'sweetalert2'
import {DataView} from '../dataView/DataView'
import authService from '../../services/authService';
import { user } from '../../helpers/user';
import UserService from '../../services/userService';
export function Users() {
  const [users, setUsers] = useState([])
  
  const getUser=()=>{
    UserService.getUsers().then(data => {
      if (data?.users) {
      
        setUsers(data.users)
      } else {
        setUsers([])
      }

    }).catch(err => {
      Swal.fire({
        title: 'Error!',
        text: err.response.data.message,
        icon: 'error',
      })
    })
  }

  useEffect(() => {
    document.title = 'Users';
    authService.verify().then((isLoggedin) => {

      if (!isLoggedin) {
        window.open("/login", "_self")
      }
    }).catch((err) => {
      window.open("/login", "_self")
    });

    getUser();
  }, []);
 const columns=[
    {
        field:"userName",
        header:"Name",
        type:"text",
        module:"users"
    },
    {
        field:"email",
        header:"Email",
        type:"text",
        module:"users"
    },
    {
        field:"emailConfirmed",
        header:"Status",
        type:"bool",
        module:"users"
    },
    {
        field:"creationTime",
        header:"Creation Date",
        type:"date",
        module:"fine"
    }
 ]
 const handleClick = (value) => {
  if(user.role=="Admin"){
    Swal.fire({
      title: 'Alert!',
      text: "Do you really want to delete this user?",
      icon: 'warning',
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: "No"
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        UserService.deleteUser(value).then(resp=>{
          Swal.fire({
            title: 'Success',
            text: "User deleted",
            icon: 'success',
          })
         getUser();
        }).catch(err=>{
          Swal.fire({
            title: 'Error!',
            text: err.response.data.message,
            icon: 'error',
          })
        })
      } 
    });

}
       }
  return (
    <>
      <div className='w-100 d-flex align-items-center justify-content-between px-2 mt-4'>
        <h1>Users </h1>
       
    </div>

      <div className=' w-100 px-2 '>

      {user.role == "Admin" ? <h5 className='text-danger'>Click on row to delete user</h5>:null}
        <DataView  columns={columns} data={users} click={handleClick}/>
    
      </div>
    </>
  );
}
