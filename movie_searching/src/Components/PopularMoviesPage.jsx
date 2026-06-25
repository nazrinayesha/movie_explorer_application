import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Star, Play,ChevronLeft, ChevronRight } from 'lucide-react';
import './PopularMoviesPage.css'

const PopularMoviesPage = () => {

    let [popularMovies, setPopularMovies] = useState([]);
    let [startIndex, setStartIndex] = useState(0);

    useEffect(() => {
        axios.get("https://api.themoviedb.org/3/movie/popular?api_key=cfe422613b250f702980a3bbf9e90716")
        .then((res) => {
            console.log(res.data)
            setPopularMovies(res.data.results);
        });
        
    }, []);

    const nextMovies = () => {
    if (startIndex + 6 < popularMovies.length) {
      setStartIndex(startIndex + 6);
    }
  };

  const prevMovies = () => {
    if (startIndex - 6 >= 0) {
      setStartIndex(startIndex - 6);
    }
  };

  const visibleMovies = popularMovies.slice(startIndex, startIndex + 6);

  return (
    <div className="movie-section">

      <div className="heading"><h2>Popular movies</h2></div>

      <div className="slider-wrapper">
        <button
          className="arrow-btn"
          onClick={prevMovies}
          disabled={startIndex === 0}
        >
          <ChevronLeft size={30} />
        </button>

      <div className="movies-row">
        {visibleMovies.map((item) => (
    
        <div className="card" key={item.id}>
          <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} className='card-img-top' />

          <div className="card-body">

            <div className="rating">
              <Star fill="#f5c518" color="#f5c518" size={16} />
              <span>{item.vote_average.toFixed(1)}</span>
            </div>

            <h5 className='card-title'>{item.title}</h5>
            <button className='watch-btn' >Watch options</button>
          </div>

          <div className="card-bottom">
              <Play fill="white" color="white" size={16} />
              <span>Trailer</span>
          </div>
        </div>
        ))}
      </div>
      <button
          className="arrow-btn"
          onClick={nextMovies}
          disabled={startIndex + 6 >= popularMovies.length}
        >
          <ChevronRight size={30} />
        </button>
     </div>   
    </div>
  )
}

export default PopularMoviesPage