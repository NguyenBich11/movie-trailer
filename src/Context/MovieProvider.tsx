import { Children, createContext, useState} from 'react';
import Modal from 'react-modal';
import YouTube from 'react-youtube';
import PropTypes from 'prop-types';


const opts = {
  height: '390',
  width: '640',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1,
  },
};

const MovieContext = createContext();

const MovieProvider = ({children}) => {
  const [ modalIsOpen, setModalIsOpen ] = useState(false);
  const [ trailerKey, setTrailerKey ] = useState("");

  const fetchTrailer = async(id) => {
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