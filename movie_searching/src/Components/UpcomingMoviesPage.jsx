import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { BookmarkPlus, Play,ChevronLeft, ChevronRight, CirclePlay } from 'lucide-react';
import './UpcomingMoviesPage.css'

const UpcomingMoviesPage = () => {

    let [upcomingMovies, setUpcomingMovies] = useState([]);
    let [startIndex, setStartIndex] = useState(0);

    useEffect(() => {
        axios.get("https://api.themoviedb.org/3/movie/upcoming?api_key=cfe422613b250f702980a3bbf9e90716")
        .then((res) => {
            setUpcomingMovies(res.data.results)
        })
    }, []);

    const nextMovies = () => {
    if (startIndex + 3 < upcomingMovies.length) {
      setStartIndex(startIndex + 3);
    }
  };

  const prevMovies = () => {
    if (startIndex - 3 >= 0) {
      setStartIndex(startIndex - 3);
    }
  };

  const visibleMovies = upcomingMovies.slice(startIndex, startIndex + 3);

  return (
    <div className="top-movie-section">

      <div className="heading"><h2>Upcoming movies</h2></div>

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
    
        <div className="movie-card" key={item.id}>

          <div className="movie-card-img">
            <img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} className='movie-card-img-top'  />
            <CirclePlay className="play-icon" strokeWidth={2.25} />
          </div>
        

          <div className="movie-card-body">
            <BookmarkPlus size={42} color="#444343" strokeWidth={1.5} />
            <div className="card-details">
              <span>{new Date(item.release_date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                    })}
              </span>
              <h5>{item.title}</h5>
            </div>
          </div>

        </div>
        ))}
      </div>
      <button
          className="arrow-btn"
          onClick={nextMovies}
          disabled={startIndex + 3 >= upcomingMovies.length}
        >
          <ChevronRight size={30} />
        </button>
     </div>   
    </div>
  )
}

export default UpcomingMoviesPage