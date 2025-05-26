import { createContext, useState } from 'react';
import type {ReactNode} from 'react';
import Modal from 'react-modal';
import YouTube from 'react-youtube';
import PropTypes from 'prop-types';

// Type của context value
interface MovieContextType {
  fetchTrailer: (id: number) => void;
}

// Tạo context có kiểu cụ thể
const MovieContext = createContext<MovieContextType>({
  fetchTrailer: () => {},
});

// Props của MovieProvider
interface MovieProviderProps {
  children: ReactNode;
}


const opts = {
  height: '390',
  width: '640',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};

const MovieProvider = ({children}:MovieProviderProps) => {
  const [ modalIsOpen, setModalIsOpen ] = useState(false);
  const [ trailerKey, setTrailerKey ] = useState("");

  const fetchTrailer = async(id:number) => {
    setTrailerKey('');
  
    try {
      const url = `https://api.themoviedb.org/3/movie/${id}/videos?language=vi,en-US`;
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
          if(json.results && json.results.length > 0) {
            setTrailerKey(json.results[0].key)
            setModalIsOpen(true)
          }
        })
        .catch(err => console.error(err));
    } catch (error) {
      setModalIsOpen(false)
      console.log(error)
    }
  };


  return (
    <MovieContext.Provider value={{fetchTrailer}}>
      {children}
      <Modal  
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          overlay: {
            position: "fixed",
            zIndex: 9999
          },
          content: {
            top: "50%",
            left: "50%",
            bottom: "auto",
            right: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)"
          }
        }}
        ariaHideApp={true}
        contentLabel="Example Modal"
      >
        <YouTube videoId={trailerKey} opts={opts}/>
      </Modal>
    </MovieContext.Provider>
  )
}

MovieProvider.propTypes = {
  children: PropTypes.node,
}

export { MovieContext, MovieProvider}