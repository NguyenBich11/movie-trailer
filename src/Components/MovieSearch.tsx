import PropTypes from 'prop-types';
import { useContext } from 'react';
import { MovieContext } from '../Context/MovieProvider';

interface Movie {
  id: number;
  title?: string;
  original_title?: string;
  poster_path: string;
}

interface MovieSearchProps {
  title: string;
  data: Movie[];
}

const MovieSearch = ({title, data}: MovieSearchProps) => {
    const { fetchTrailer } = useContext(MovieContext);
  return (
    <div className='text-white p-10 mb-10'>
        <h2 className='uppercase text-xl mb-4'>{title}</h2>
        <div className='grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5'>
            {data && data.map((movie) => (
                <div key={movie.id} className="w-[200px] h-[300px] relative group"
                 onClick={() => fetchTrailer(movie.id)}
                >
                <div className="w-full h-full cursor-pointer group-hover:scale-105 transition-transform duration-500 ease-in-out">
                    <div className="absolute top-0 left-0 w-full h-full bg-black/40"/>
                        <img src={`${import.meta.env.VITE_IMG_URL}${movie.poster_path}`} alt={movie.title} className='w-full h-full object-cover'/>
                        <div className="absolute bottom-4 left-2">
                            <p className='uppercase text-md'>{movie.title || movie.original_title}</p>
                        </div>
                    </div>
                </div>
            ))}   
        </div>
    </div>
  )
}

MovieSearch.prototype = {
    title: PropTypes.string , 
    data: PropTypes.any
}

export default MovieSearch