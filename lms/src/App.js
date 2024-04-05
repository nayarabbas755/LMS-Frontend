
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/App.css'
import 'primeicons/primeicons.css';
import React, { useEffect, useState }from 'react';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { Login } from './components/login/login';
import { Route, Routes  ,Navigate } from "react-router-dom";
import { Register } from './components/register/Register';
import { Books } from './components/books/Books';
import authService from './services/authService';
import { Header } from './components/header/header';
import {CreateBook} from './components/books/createBook/CreateBook'
import { ViewBook } from './components/books/viewBook/ViewBook';
import { EditBook } from './components/books/editBook/editBook';
import { CreateGenre } from './components/genre/createGenre/createGenre';
import { Genres } from './components/genre/genres/genres';
import { EditGenre } from './components/genre/editGenre/editGenre';
function App() {
 const [loggedin,setLoggedIn]=useState(false)
  useEffect(() => {
    authService.verify().then((isLoggedin)=>{
     
      if(!isLoggedin){
        // window.open("/login","_self")
      }else{
        setLoggedIn(true)
      }
    }).catch((err)=>{
    });
  
  }, []);
  return (
    <div className={loggedin?'min-h-90vh':'container min-h-90vh'}>
   
      {loggedin?<Header/>:null}
    <Routes>
   
    <Route exact path="/" element={   <Navigate  to="/login" />}>
 
    </Route>

    <Route path='login' element={<Login/>} />
  
    <Route path='register' element={<Register/>}  />
    <Route path='books' element={<Books/>}  />
    <Route path='book/:id/:index' element={<ViewBook/>}  />
    <Route path='book/edit/:id' element={<EditBook/>}  />
    <Route path='create_book' element={<CreateBook/>}  />
    <Route path='create_genre' element={<CreateGenre/>}  />
    <Route path='genres' element={<Genres/>}  />
    <Route path='genre/edit/:id' element={<EditGenre/>}  />
  </Routes>
  </div>
  );
}

export default App;
