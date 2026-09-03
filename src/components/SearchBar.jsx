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
        flex flex-col min-[420px]:flex-row min-[420px]:items-center gap-2 min-[420px]:gap-3
        bg-blue-900/30 backdrop-blur-md
        px-4 py-3 rounded-2xl
        border border-blue-400/30
        shadow-lg
      ">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <Search className="w-5 h-5 shrink-0" stroke="white" />
          <input
            type="text"
            placeholder="Search city worldwide..."
            aria-label="Search city"
            autoComplete="off"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            disabled={loading}
            className="
              flex-1 min-w-0 bg-transparent text-white
              placeholder-white/60 outline-none
              text-base min-[420px]:text-lg disabled:opacity-60
            "
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="
            bg-gradient-to-r from-[#4f8dff] to-[#8b6cff]
            hover:brightness-110 active:brightness-95
            shadow-lg shadow-[#4f8dff]/30
            disabled:opacity-50 disabled:cursor-not-allowed
            text-white px-4 py-2 rounded-xl font-semibold transition
            w-full min-[420px]:w-auto shrink-0
          "
        >
          {loading ? '...' : 'Search'}
        </button>
      </div>
    </form>
  )
}

export default SearchBar
