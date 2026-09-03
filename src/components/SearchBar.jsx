import { Search } from 'lucide-react'
import React, { useState } from 'react'

function SearchBar({ fetchWeather, loading }) {
  const [city, setCity] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const query = city.trim()
    if (!query || loading) return
    fetchWeather(query)
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
          aria-label="Search city"
          autoComplete="off"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          disabled={loading}
          className="
            flex-1 bg-transparent text-white
            placeholder-white/60 outline-none
            text-lg disabled:opacity-60
          "
        />
        <button
          type="submit"
          disabled={loading || !city.trim()}
          className="
            bg-gradient-to-r from-blue-500 to-pink-400
            hover:from-blue-600 hover:to-pink-500
            disabled:opacity-50 disabled:cursor-not-allowed
            text-white px-4 py-2 rounded-xl font-semibold transition
          "
        >
          {loading ? '...' : 'Search'}
        </button>
      </div>
    </form>
  )
}

export default SearchBar
