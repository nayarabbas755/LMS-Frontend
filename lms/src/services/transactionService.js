import Swal from 'sweetalert2'
import axios from 'axios';
const TransactionService = {
    createTransaction : function(data){

        var token = localStorage.getItem('token')
        axios.post(process.env.REACT_APP_apiUrl+'transaction/transactions/Createtransactions',data,{ headers: {"Authorization" : `Bearer ${token}`}})

.then((data) => {
  if(
    data.status==200)
    {
       
            window.open("/transactions","_self")
        
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
    getTransactions:async function() {
        var token = localStorage.getItem('token')
      
          var promis =  axios.get(process.env.REACT_APP_apiUrl+'transaction/transactions/Gettransactions',{ headers: {"Authorization" : `Bearer ${token}`} })
    
          return  promis.then((data) => {
            return data.data;
        } )
         
        
       },
       getTransactionById:async function(id) {
        var token = localStorage.getItem('token')
      
          var promis =  axios.get(process.env.REACT_APP_apiUrl+'transaction/transactions/GetById/'+id,{ headers: {"Authorization" : `Bearer ${token}`} })
    
          return  promis.then((data) => {
            return data.data;
        } )
         
        
       },
       updateTransaction: function(data) {
        var token = localStorage.getItem('token')
        axios.put(process.env.REACT_APP_apiUrl+'transaction/transactions/update',data,{ headers: {"Authorization" : `Bearer ${token}`}})

.then((data) => {
  if(
    data.status==200)
    {
       
            window.open("/transactions","_self")
        
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

export default  TransactionService;