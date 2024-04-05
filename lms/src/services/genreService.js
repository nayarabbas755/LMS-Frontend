import Swal from 'sweetalert2'
import axios from 'axios';
const genreService = {
    createGenre: function(data) {
        var token = localStorage.getItem('token')
        axios.post(process.env.REACT_APP_apiUrl+'genre/Genres/CreateGenre',data,{ headers: {"Authorization" : `Bearer ${token}`}})

.then((data) => {
  if(
    data.status==200)
    {
       
            window.open("/genres","_self")
        
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
    updateGenre: function(data) {
        var token = localStorage.getItem('token')
        axios.put(process.env.REACT_APP_apiUrl+'genre/Genres/update',data,{ headers: {"Authorization" : `Bearer ${token}`}})

.then((data) => {
  if(
    data.status==200)
    {
       
            window.open("/genres","_self")
        
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
    getGenres:async function() {
    var token = localStorage.getItem('token')
  
      var promis =  axios.get(process.env.REACT_APP_apiUrl+'genre/Genres/GetGenres',{ headers: {"Authorization" : `Bearer ${token}`} })

      return  promis.then((data) => {
        return data.data;
    } )
     
    
   },
    getGenreById:async function(id) {
    var token = localStorage.getItem('token')
  
      var promis =  axios.get(process.env.REACT_APP_apiUrl+'genre/Genres/GetGenreById/'+id,{ headers: {"Authorization" : `Bearer ${token}`} })

      return  promis.then((data) => {
        return data.data;
    } )
     
    
   },
}


export default genreService;