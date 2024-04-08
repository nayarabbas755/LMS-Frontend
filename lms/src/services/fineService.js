import Swal from 'sweetalert2'
import axios from 'axios';
const FineService = {
    createFine : function(data){

        var token = localStorage.getItem('token')
        axios.post(process.env.REACT_APP_apiUrl+'fine/Fines/CreateFine',data,{ headers: {"Authorization" : `Bearer ${token}`}})

.then((data) => {
  if(
    data.status==200)
    {
       
            window.open("/fines","_self")
        
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
    getfines:async function() {
        var token = localStorage.getItem('token')
      
          var promis =  axios.get(process.env.REACT_APP_apiUrl+'fine/fines/GetFines',{ headers: {"Authorization" : `Bearer ${token}`} })
    
          return  promis.then((data) => {
            return data.data;
        } )
         
        
       },
       getFineById:async function(id) {
        var token = localStorage.getItem('token')
      
          var promis =  axios.get(process.env.REACT_APP_apiUrl+'fine/fines/GetFineById/'+id,{ headers: {"Authorization" : `Bearer ${token}`} })
    
          return  promis.then((data) => {
            return data.data;
        } )
         
        
       },
       updateFine: function(data) {
        var token = localStorage.getItem('token')
        axios.put(process.env.REACT_APP_apiUrl+'fine/fines/update',data,{ headers: {"Authorization" : `Bearer ${token}`}})

.then((data) => {
  if(
    data.status==200)
    {
       
            window.open("/fines","_self")
        
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
}

export default FineService;