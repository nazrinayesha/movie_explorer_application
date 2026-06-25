import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import {Menu, Search, BookmarkPlus, ChevronDown} from "lucide-react";
import './Navbar.css';
import axios from 'axios';

const Navbar = ({setSearchMovies}) => {

  let [movieName, setMovieName] =useState("");
  

  useEffect( () => {
    if(movieName.length > 2){
    axios.get(`https://api.themoviedb.org/3/search/movie?api_key=cfe422613b250f702980a3bbf9e90716&query=${movieName}`)
    .then((res) => {
     setSearchMovies(res.data.results);
    })
  }else {
    setSearchMovies([]);
  }
  }, [movieName])

  return (

    
    <nav className='navbar'>

      <div className="logo">
        <h2>MovieHub</h2>
      </div>

      <div className="menu">
        <Menu size={20} absoluteStrokeWidth />
        <h3>Menu</h3>
      </div>

      <div className="search-box">
        <input  type='text' placeholder='Search movies....' 
          value={movieName}
          onChange={ (e) => {
            setMovieName(e.target.value)
          }}
        />
        <Search className="search-icon"  size={18} />
      </div>

      <div className="nav-links">
        <NavLink to="/Watchlist"> <BookmarkPlus size={20} />Watchlist</NavLink>
        <NavLink to="/Signin">Sign in</NavLink>
        <NavLink to="/En">En <ChevronDown size={16} strokeWidth={3} absoluteStrokeWidth /></NavLink>
      </div>

    </nav>

  )
}

export default Navbar