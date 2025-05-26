import { useEffect, useState } from 'react'
import Header from './Components/Header'
import Banner from './Components/Banner'
import MovieList from './Components/MovieList'
import MovieSearch from './Components/MovieSearch';
import { MovieProvider } from './Context/MovieProvider';

function App() {
  const [ movie, setMovie ] = useState([]);
  const [ movieRate, setMovieRate ] = useState([]);
  const [ searchKey, setSearchKey ] = useState([]);

  const handleSearch = async (searchKey:string) => {
    setSearchKey([])
    try {
      const url = `https://api.themoviedb.org/3/search/movie?query=${searchKey}&include_adult=false&language=vi&page=1`;
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
        }
      };

      fetch(url, options)
        .then(res => res.json())
        .then(json => {
          setSearchKey(json.results)
          console.log(json)
        })
        .catch(err => console.error(err));
    }catch(error) {
      console.log(error)
    }
  };

  useEffect(() => {
    const fetchMovie = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`
        }
      };

      const url_pop = 'https://api.themoviedb.org/3/movie/popular?language=vi&page=1';
      const url_rate = 'https://api.themoviedb.org/3/movie/top_rated?language=vi&page=1';
      fetch(url_pop, options)
        .then(res => res.json())
        .then(json => {
          console.log(json)
          setMovie(json.results)
        })
        .catch(err => console.error(err))

      fetch(url_rate, options)
        .then(res => res.json())
        .then(json => {
          console.log(json)
          setMovieRate(json.results)
        })
        .catch(err => console.error(err))
    }

    fetchMovie();
  }, []);

  return (
    <>
      <MovieProvider>
        <div className='bg-black pb-10'>
          <Header onSearch={handleSearch}/>
          <Banner/>
          {searchKey.length > 0 ? <MovieSearch title={"Kết quả tìm kiếm"} data={searchKey}/> : (
            <>
              <MovieList data={movie} title={"Phim Hot"}/>
              <MovieList data={movieRate} title={"Phim De Cu"}/>
            </>
          )}
        </div>
      </MovieProvider>
    </>
  );
};

export default App
