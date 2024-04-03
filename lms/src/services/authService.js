import Swal from 'sweetalert2'
import axios from 'axios';
const authService = {
    login: function(data) {
        axios.post(process.env.REACT_APP_apiUrl+'Auth/login',data)

.then((data) => {
  if(
    data.status==200)
    {
        localStorage.setItem("token",data.data.user.token)
        if(data.data.user.emailConfirmed==false){
            Swal.fire({
                title: 'Error!',
                text: "Please activate your account",
                icon: 'error',
              })
        }
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

    verify: function() {
     var token = localStorage.getItem('token')
     if(token){
        axios.post(process.env.REACT_APP_apiUrl+'Auth/me',{ headers: {"Authorization" : `Bearer ${token}`} })

        .then((data) => {
          console.log(data)
          if(
            data.status==200)
            {
                
            }   
        })
        .catch((err) => {
            Swal.fire({
                title: 'Error!',
                text: err.response.data.message,
                icon: 'error',
              })
        });
     }
    },
    register: function(data) {
        axios.post(process.env.REACT_APP_apiUrl+'Auth/register',data )

        .then((data) => {
          if(
            data.status==200)
            {
                Swal.fire({
                    title: 'Success!',
                    text: "Activation link sent to your email address",
                    icon: 'success',
                  })
            }   
        })
        .catch((err) => {
            Swal.fire({
                title: 'Error!',
                text: err.response.data.message,
                icon: 'error',
              })
        });
    }
};

export default authService;