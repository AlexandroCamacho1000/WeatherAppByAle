import { Search } from 'lucide-react'
import React, { useState } from 'react'

// SearchBar
function SearchBar({ fetchWeather, setLoading }) {
  const [city, setCity] = useState('')

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!city) return
    fetchWeather(city)
    setCity('') 
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="
        flex items-center gap-3
        bg-blue-900/30 backdrop-blur-md
        px-4 py-3 rounded-2xl
        border border-blue-400/30
        shadow-lg
      ">
      
        <Search className="w-5 h-5" stroke="white" />

        
        <input
          type="text"
          placeholder="Search city worldwide..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="
            flex-1 bg-transparent text-white
            placeholder-white-200 outline-none
            text-lg
          "
        />
        
        <button
          type="submit"
          className="
            bg-gradient-to-r from-blue-500 to-pink-400
            hover:from-blue-600 hover:to-pink-500
            text-white px-4 py-2 rounded-xl font-semibold transition
          "
        >
          Search
        </button>
      </div>
    </form>
  )
}

export default SearchBar
