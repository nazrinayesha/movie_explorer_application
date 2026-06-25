import React,{useState} from 'react'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import Navbar from './Components/Navbar'
import PopularMoviesPage from './Components/PopularMoviesPage'
import UpcomingMoviesPage from './Components/UpcomingMoviesPage'
import TopRatedMoviesPage from './Components/TopRatedMoviesPage'


const App = () => {
  let [searchMovies, setSearchMovies] = useState([]);

  return (
    <BrowserRouter>
       
       <Navbar setSearchMovies={setSearchMovies}/>
       
      {
        searchMovies.length > 0 ? (

          <div className="movie-container">

            {searchMovies.map((movie)=>(
              
              <div className="search-movie-card" key={movie.id}>

                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  className="search-movie-card-img-top"
                />

                <h3>{movie.title}</h3>

              </div>

            ))}

          </div>

        ) : (

          <>
            <PopularMoviesPage />
            <UpcomingMoviesPage />
            <TopRatedMoviesPage />
          </>

        )
      }

    </BrowserRouter>
   
  )
}

export default App