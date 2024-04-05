import Swal from 'sweetalert2'
import axios from 'axios';
import { user } from '../helpers/user';
const authService = {
    login: function(data) {
        axios.post(process.env.REACT_APP_apiUrl+'Auth/login',data)

.then((data) => {
  if(
    data.status==200)
    {
      
        if(data.data.user.emailConfirmed==false){
            Swal.fire({
                title: 'Alert!',
                text: "Please activate your account,click on resend button to recieve activation link",
                icon: 'warning',
                showDenyButton: true,
                confirmButtonText: "Resend",
                denyButtonText: `Cancel`
              }).then((result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    axios.get(process.env.REACT_APP_apiUrl+'Auth/token-resend/'+data.data.user.id).then((resp)=>{
                       if( resp.status==200){
                        Swal.fire("Link sent!", "Please check you spam/inbox folder", "success");
                       }

                    })
                
                } 
              });
        }else{
            localStorage.setItem("token",data.data.user.token)
            window.open("/books","_self")
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

    verify:async function() {
     var token = localStorage.getItem('token')
     if(token){
       var promis =  axios.get(process.env.REACT_APP_apiUrl+'Auth/me',{ headers: {"Authorization" : `Bearer ${token}`} })

       return  promis.then((data) => {
         
          if(
            data.status==200)
            {
                user.email = data.data.user.email
                user.role = data.data.user.role
                user.username = data.data.user.userName
                user.isLoggedin=true
                return true;
            }   else{
                return false;
            }
        })
      
     }else{
        return false;
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
    },
    logout:function(){
        localStorage.removeItem("token");
        window.open("/login","_self")
    }
};

export default authService;