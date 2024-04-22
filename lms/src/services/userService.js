import Swal from 'sweetalert2'
import axios from 'axios';
const UserService = {
     getUsers:async function (){
        var token = localStorage.getItem('token')
  
        var promis =  axios.get(process.env.REACT_APP_apiUrl+'auth/getusers',{ headers: {"Authorization" : `Bearer ${token}`} })
  
        return  promis.then((data) => {
          return data.data;
      } )
    },
     deleteUser:async function (id){
        var token = localStorage.getItem('token')
  
        var promis =  axios.put(process.env.REACT_APP_apiUrl+'auth/delete/'+id,{},{ headers: {"Authorization" : `Bearer ${token}`} })
  
        return  promis.then((data) => {
          return data.data;
      } )
    }
}

export default UserService;