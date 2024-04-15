import Swal from 'sweetalert2'
import axios from 'axios';
const ReservationService = {
    createReservation: function(data){

        var token = localStorage.getItem('token')
        axios.post(process.env.REACT_APP_apiUrl+'reservation/Reservation/CreateReservation',data,{ headers: {"Authorization" : `Bearer ${token}`}})

.then((data) => {
  if(
    data.status==200)
    {
       
            window.open("/reservations","_self")
        
    }   
})
.catch((err) => {
    Swal.fire({
        title: 'Error!',
        text: err.response.data.message,
        icon: 'error',
      })
});
    },
    getreservations:async function() {
        var token = localStorage.getItem('token')
      
          var promis =  axios.get(process.env.REACT_APP_apiUrl+'reservation/Reservation/Getreservations',{ headers: {"Authorization" : `Bearer ${token}`} })
    
          return  promis.then((data) => {
            return data.data;
        } )
         
        
       },
       getreservationByUser:async function() {
        var token = localStorage.getItem('token')
      
          var promis =  axios.get(process.env.REACT_APP_apiUrl+'reservation/Reservation/GetReservationsbyUser',{ headers: {"Authorization" : `Bearer ${token}`} })
    
          return  promis.then((data) => {
            return data.data;
        } )
         
        
       },
     
}

export default ReservationService;