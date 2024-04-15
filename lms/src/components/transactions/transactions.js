import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

import {DataView} from '../dataView/DataView'
import authService from '../../services/authService';
import { user } from '../../helpers/user';
import TransactionService from '../../services/transactionService';

export function Transactions() {
  const [transaction, setTransaction] = useState([])
  

  useEffect(() => {
    document.title = 'transaction';
    authService.verify().then((isLoggedin) => {

      if (!isLoggedin) {
        window.open("/login", "_self")
      }
  
 
    }).catch((err) => {
      window.open("/login", "_self")
    });

    TransactionService.getTransactions().then(data => {
        if (data?.tran) {
          data.tran.forEach(element => {
              element.bookName =  element.book.title
              element.userName =  element.patron.userName
           });
          setTransaction(data.tran)
        } else {
          setTransaction([])
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
        field:"bookName",
        header:"Book Name",
        type:"text",  module:"transaction"
    },
    {
        field:"transactionDate",
        header:"Transaction Date",
        type:"date",  module:"transaction"
    },
    {
        field:"dueDate",
        header:"Due Date",
        type:"date",  module:"transaction"
    },
    {
        field:"userName",
        header:"UserName",
        type:"text",  module:"transaction"
    },
    {
        field:"otherDetails",
        header:"Other Details",
        type:"text",  module:"transaction"
    }
 ]
 const handleClick = (value) => {
    if(user.role=="Admin"){
        window.open("/transaction/edit/"+value,"_self")
    }
       }
  return (
    <>
      <div className='w-100 d-flex align-items-center justify-content-between px-2 mt-4'>
        <h1>Transactions </h1>

        {user.role == "Admin" ? <Link to="/create_transaction" className='btn btn-sm primary-bg text-white d-flex align-items-center' > <span className='pi pi-plus me-2'></span> Add transaction</Link> : null}
      </div>

      <div className=' w-100 px-2 '>
      {user.role == "Admin" ? <h5 className='text-danger'>Click on row to edit transaction</h5>:null}
     
        <DataView  columns={columns} data={transaction}  click={handleClick}/>
    
      </div>
    </>
  );
}
