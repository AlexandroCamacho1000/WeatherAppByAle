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
    <form onSubmit={handleSubmit} className="w-full">
      <div className="
        flex flex-col min-[420px]:flex-row gap-2
        bg-white/10 backdrop-blur-md
        p-2 rounded-2xl
        border border-white/25
        shadow-xl shadow-black/20
        focus-within:border-[#4f8dff]/70 focus-within:ring-2 focus-within:ring-[#4f8dff]/30
        transition
      ">
        <label className="flex items-center gap-2.5 flex-1 min-w-0 bg-black/25 rounded-xl px-3.5 py-3">
          <Search className="w-5 h-5 shrink-0 text-white/70" />
          <input
            type="text"
            placeholder="Try Seoul, Madrid, Tokyo..."
            aria-label="Search city"
            autoComplete="off"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            disabled={loading}
            className="
              w-full min-w-0 bg-transparent text-white text-base
              placeholder-white/50 outline-none
              disabled:opacity-60
            "
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="
            inline-flex items-center justify-center gap-2
            bg-gradient-to-r from-[#4f8dff] to-[#8b6cff]
            hover:brightness-110 hover:shadow-xl hover:shadow-[#4f8dff]/40
            active:brightness-95 active:scale-[0.98]
            shadow-lg shadow-[#4f8dff]/30
            disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:brightness-100
            text-white pl-4 pr-5 py-3 rounded-xl font-bold text-base tracking-wide transition-all
            w-full min-[420px]:w-auto shrink-0
          "
        >
          <Search className="w-4 h-4" strokeWidth={2.5} />
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>
    </form>
  )
}

export default SearchBar
