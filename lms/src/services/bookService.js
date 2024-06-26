import Swal from 'sweetalert2'
import axios from 'axios';
const bookService = {

    createBook: function(data) {
        var token = localStorage.getItem('token')
        axios.post(process.env.REACT_APP_apiUrl+'book/Books/CreateBook',data,{ headers: {"Authorization" : `Bearer ${token}`}})

.then((data) => {
  if(
    data.status==200)
    {
       
            window.open("/books","_self")
        
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
    updateBook: function(data) {
        var token = localStorage.getItem('token')
        axios.put(process.env.REACT_APP_apiUrl+'book/Books/update',data,{ headers: {"Authorization" : `Bearer ${token}`}})

.then((data) => {
  if(
    data.status==200)
    {
       
            window.open("/books","_self")
        
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
getBooks:async function() {
    var token = localStorage.getItem('token')
  
      var promis =  axios.get(process.env.REACT_APP_apiUrl+'book/Books/GetBooks',{ headers: {"Authorization" : `Bearer ${token}`} })

      return  promis.then((data) => {
        return data.data;
    } )
     
    
   },
getBookById:async function(id) {
    var token = localStorage.getItem('token')
  
      var promis =  axios.get(process.env.REACT_APP_apiUrl+'book/Books/GetBookById/'+id,{ headers: {"Authorization" : `Bearer ${token}`} })

      return  promis.then((data) => {
        return data.data;
    } )
     
    
   }
}

export default bookService;