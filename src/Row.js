import React from 'react';
import './Row.css';
import {  useState, useEffect } from 'react';
import axios from './axios.js';

function Row({ title, fetchUrl, isLargeRow = false }) {
    const [movies, setMovies] = useState([]);

    const base_url = "https://image.tmdb.org/t/p/original/";

    useEffect(() => {
        async function fetchData(){
            const request = await axios.get(fetchUrl);
            // console.log(request);
            setMovies(request.data.results);
            // Good practice: so that the function cuts out
            return request;
        }

        fetchData();
    }, [fetchUrl]);

    // console.log();

    return (
        <div className='row'>
            <h2>{title}</h2>
            <div className='row__posters'>
                {movies.map((movie) => (
                    (isLargeRow && movie.poster_path) ||
                    (!isLargeRow && movie.backdrop_path)) && (
                        <img 
                            className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                            key={movie.id}
                            src={`${base_url}${
                            isLargeRow ? movie.poster_path : movie.backdrop_path
                            }`} alt={movie.name}
                        />
                        )
                )}
            </div>
            
        </div>
    );
}

export default Row;
