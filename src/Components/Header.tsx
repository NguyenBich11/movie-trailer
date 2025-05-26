import PropTypes from "prop-types"
import { useState } from "react"

const Header = ({onSearch}) => {
  const [ textSearch, setTextSearch ] = useState('');

  return (
    <div className="w-full p-4 bg-black flex justify-between items-center fixed z-9999">
      <div className="flex items-center space-x-4">
        <h1 className="text-[30px] uppercase font-bold text-red-700">Movie</h1>
        <nav className="flex items-center space-x-4">
          <a href="#" className="text-white">
            Home
          </a>
          <a href="#" className="text-white">
            About
          </a>
          <a href="#" className="text-white">
            Contact
          </a>
        </nav>
      </div>

      <div className="flex items-center space-x-4">
        <input 
          name="search_input"
          placeholder="Search" 
          onChange={(e) => setTextSearch(e.target.value)}
          value={textSearch}
          className="p-3 text-black border-white bg-white border-2" 
        />
        <button className="bg-red-700 text-white px-3 py-2 rounded-lg" onClick={() => onSearch(textSearch)}>Search</button>
      </div>
    </div>
  )
}

Header.prototype = {
  onSearch: PropTypes.func
}

export default Header