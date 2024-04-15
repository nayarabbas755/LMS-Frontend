import { useEffect } from 'react';
import authService from '../../../services/authService';
import { useState } from "react";
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import Swal from 'sweetalert2'
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { Link, useParams } from 'react-router-dom';
import bookService from '../../../services/bookService';
import UserService from '../../../services/userService';
import TransactionService from '../../../services/transactionService';
export function EditTransaction() {
    let { id } = useParams()
    const [inputs, setInputs] = useState({
        book: {
            value: ""
            , err: false, errMsg: ""
        },
        patron: { value: "", err: false, errMsg: "" },
        transactionType: { value: "", err: false, errMsg: "" },
        dueDate: { value: new Date(), err: false, errMsg: "" },
        transactionDate: { value: new Date(), err: false, errMsg: "" },
        otherDetails: { value: "", err: false, errMsg: "" },
        fineAmount: { value: "", err: false, errMsg: "" },
    })
    const [patrons, setPatrons] = useState([])
    const [books, setBooks] = useState([])

    useEffect(() => {
        document.title = 'Edit Transaction';

        authService.verify().then((isLoggedin) => {

            if (!isLoggedin) {
                window.open("/login", "_self")
            }
        }).catch((err) => {
            window.open("/login", "_self")
        });
        bookService.getBooks().then(data => {
            if (data?.books) {
                setBooks(data.books)
            }

        }).catch(err => {
            Swal.fire({
                title: 'Error!',
                text: err.response.data.message,
                icon: 'error',
            })
        })

        UserService.getUsers().then(data => {
            if (data?.users) {
                setPatrons(data.users)
            }

        }).catch(err => {
            Swal.fire({
                title: 'Error!',
                text: err.response.data.message,
                icon: 'error',
            })
        })


        setTimeout(() => {
            TransactionService.getTransactionById(id).then(data => {
                if (data?.tran) {

                    setInputs(values => ({
                        ...values, ["book"]: {
                            ...values["book"],
                            value: data.tran.book,
                            err: false
                        }
                    }))
                    setInputs(values => ({
                        ...values, ["patron"]: {
                            ...values["patron"],
                            value: data.tran.patron,
                            err: false
                        }
                    }))


                    setInputs(values => ({
                        ...values, ["transactionType"]: {
                            ...values["transactionType"],
                            value: data.tran.transactionType,
                            err: false
                        }
                    }))

                    setInputs(values => ({
                        ...values, ["fineAmount"]: {
                            ...values["fineAmount"],
                            value: data.tran.fineAmount,
                            err: false
                        }
                    }))

                    setInputs(values => ({
                        ...values, ["transactionDate"]: {
                            ...values["transactionDate"],
                            value: data.tran.transactionDate,
                            err: false
                        }
                    }))

                    setInputs(values => ({
                        ...values, ["dueDate"]: {
                            ...values["dueDate"],
                            value: new Date(data.tran.dueDate),
                            err: false
                        }
                    }))


                    setInputs(values => ({
                        ...values, ["otherDetails"]: {
                            ...values["otherDetails"],
                            value: data.tran.otherDetails,
                            err: false
                        }
                    }))
                }

            }).catch(err => {
                Swal.fire({
                    title: 'Error!',
                    text: err.response.data.message,
                    icon: 'error',
                })
            })
        }, 1000);
    }, []);
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        var isErr = false;
        if (!value) {
            isErr = true
        } else {
            isErr = false
        }
        setInputs(values => ({
            ...values, [name]: {
                ...values[name],
                value: value,
                err: isErr
            }
        }))
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputs.book.value
            || !inputs.patron.value
            || !inputs.otherDetails.value
            || !inputs.transactionDate.value
            || !inputs.transactionType.value
            || !inputs.fineAmount.value


        ) {
            Swal.fire({
                title: 'Error!',
                text: "Please fill all fields",
                icon: 'error',
            })
        } else {
            const data = {

                "bookId": inputs.book.value.id,
                "patronID": inputs.patron.value.id,
                "transactionType": inputs.transactionType.value,
                "transactionDate": inputs.transactionDate.value,
                "dueDate": inputs.dueDate.value,
                "fineAmount": 0,
                "otherDetails": inputs.otherDetails.value,
            }
            TransactionService.createTransaction(data);
        }
    }
    return (
        <>
            <Link className=" nav-link px-2 mt-4 d-flex align-items-center " to="/transactions"><h4><span className='pi pi-arrow-left'></span> Back</h4></Link>
            <form onSubmit={handleSubmit} className=' p-2 mt-2'>
                <div className='card'>

                    <div className='w-100 row p-2'>
                        <h1>Edit Transaction</h1>
                        <div className='col-12 col-md-6 col-lg-4'>
                            <div>
                                <label className='fw-500 my-3'>Patron </label>
                                <Dropdown value={inputs?.patron?.value} placeholder='patron' options={patrons} optionLabel="userName" type='text' name="patron" onChange={handleChange} className='w-100' />
                                <span className='text-danger'>{inputs?.patron?.err ? "Patron  is required" : ""}</span>
                            </div>

                        </div>
                        <div className='col-12 col-md-6 col-lg-4'>
                            <div>
                                <label className='fw-500 my-3'>Book </label>
                                {/* <Dropdown value={inputs?.book?.value} placeholder='Book'  options={books} optionLabel="title"  type='text' name="book" onChange={handleChange} className='w-100'  /> */}
                                <select placeholder='Book' name="book" onChange={handleChange} className='w-100 p-inputtext'  >
                                    {
                                        books.map(book=>{
                                            return <option value={book} selected={book.id===inputs.book.value.id}>
                                                {book.title}
                                            </option>
                                        })
                                    }
                                </select>                 <span className='text-danger'>{inputs?.book?.err ? "Book  is required" : ""}</span>
                            </div>

                        </div>
                        <div className='col-12 col-md-6 col-lg-4'>
                            <div>
                                <label className='fw-500 my-3'>Due Date</label>
                                <Calendar value={inputs?.dueDate?.value} placeholder='Due Date' name="dueDate" onChange={handleChange} onBlur={handleChange} className='w-100' />
                                <span className='text-danger'>{inputs?.reservationDate?.err ? "Due date is required" : ""}</span>
                            </div>

                        </div>
                        <div className='col-12 col-md-6 col-lg-4'>
                            <div>
                                <label className='fw-500 my-3'>Transaction Type</label>
                                <InputText value={inputs?.transactionType?.value} placeholder='Transaction Type' type='text' min={0} name="transactionType" onChange={handleChange} onBlur={handleChange} className='w-100' />
                                <span className='text-danger'>{inputs?.fineAmount?.err ? "Transaction Type is required" : ""}</span>
                            </div>

                        </div>
                        <div className='col-12 col-md-6 col-lg-4'>
                            <div>
                                <label className='fw-500 my-3'>Fine Amount</label>
                                <InputText value={inputs?.fineAmount?.value} placeholder='Fine Amount' type='number' min={0} name="fineAmount" onChange={handleChange} onBlur={handleChange} className='w-100' />
                                <span className='text-danger'>{inputs?.fineAmount?.err ? "Fine Amount is required" : ""}</span>
                            </div>

                        </div>
                        <div className='col-12'>
                            <div>
                                <label className='fw-500 my-3'>Other Details</label>
                                <InputTextarea rows={10} value={inputs?.otherDetails?.value} placeholder='Other Details' type='text' name="otherDetails" onChange={handleChange} onBlur={handleChange} className='w-100' />
                                <span className='text-danger'>{inputs?.otherDetails?.err ? "Other details are required" : ""}</span>
                            </div>

                        </div>


                        <div className='text-end'>
                            <div>
                                <Button label="Update" type='submit' size="small" raised rounded className='mt-5 rounded' disabled={!inputs.book.value
                                    || !inputs.patron.value
                                    || !inputs.otherDetails.value
                                    || !inputs.transactionDate.value
                                    || !inputs.transactionType.value
                                    || !inputs.fineAmount.value

                                    ? true : false} />
                            </div>

                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}