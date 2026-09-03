import React, { useState } from 'react'
import logo from './assets/logoaledev.png'
import SearchBar from './components/SearchBar'
import TemperatureToggle from './components/TemperatureToggle'
import WeatherDisplay from './components/WeatherDisplay'

const API_KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE_URL = "https://api.openweathermap.org/data/2.5"

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center mt-4 z-20">
      <div className="w-12 h-12 border-4 border-blue-400 border-t-pink-400 rounded-full animate-spin"></div>
      <p className="mt-2 font-semibold text-white text-center">Searching city...</p>
    </div>
  )
}

function App() {
  const [loading, setLoading] = useState(false)
  const [unit, setUnit] = useState('C')
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState(null)

  const fetchWeather = async (city) => {
    const query = city?.trim()
    if (!query) return
    if (!API_KEY) {
      setError("Missing API key. Create a .env with VITE_WEATHER_API_KEY.")
      return
    }
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(
        `${BASE_URL}/weather?q=${encodeURIComponent(query)}&appid=${API_KEY}&units=metric`
      )
      const data = await response.json()
      if (!response.ok) {
        setError(data.message === 'city not found' ? `City "${query}" not found.` : (data.message || 'City not found'))
        setWeatherData(null)
      } else {
        setWeatherData(data)
      }
    } catch {
      setError("Error fetching weather. Check your connection.")
      setWeatherData(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative flex justify-center items-start px-4 pb-16 pt-10 md:pt-16">
      <div
        className="absolute inset-0 bg-cover bg-center before:content-[''] before:absolute before:inset-0 before:bg-blue/70"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/1431822/pexels-photo-1431822.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`
        }}
      ></div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-2xl
                      bg-black/30 backdrop-blur-md border-4 border-white/20 rounded-3xl
                      px-5 py-8 md:px-8 md:py-10 space-y-6 shadow-2xl">
        <img
          src={logo}
          alt="AleDev Logo"
          className="w-28 md:w-36 mb-2 brightness-200 contrast-200 saturate-250 drop-shadow-[0_0_20px_rgba(255,0,255,0.4)]"
        />

        <h1 className="text-3xl md:text-4xl font-extrabold text-white text-center">
          Weather <span className="text-blue-400">App</span>
        </h1>

        <p className="text-gray-200 text-center text-sm md:text-base leading-relaxed">
          Discover weather like never before with real-time data, beautiful visuals, and precise forecasts for any location worldwide.
        </p>

        <div className="w-full flex flex-col md:flex-row items-center justify-between
                        gap-2 p-3 bg-white/10 rounded-2xl border border-white/20">
          <div className="flex-1 w-full">
            <SearchBar fetchWeather={fetchWeather} loading={loading} />
          </div>
          <div className="flex justify-center md:justify-end mt-2 md:mt-0">
            <TemperatureToggle unit={unit} setUnit={setUnit} />
          </div>
        </div>

        {loading && <LoadingSpinner />}

        {error && !loading && (
          <p role="alert" className="text-red-300 bg-red-500/10 border border-red-400/30 px-4 py-2 rounded-xl font-semibold text-center capitalize">{error}</p>
        )}

        {weatherData && !loading && (
          <div className="w-full mt-4">
            <WeatherDisplay weatherData={weatherData} unit={unit} />
          </div>
        )}

        <footer className="pt-2 text-center text-xs text-gray-300/80">
          Data by OpenWeatherMap · Built with React + Vite + Tailwind
        </footer>
      </div>
    </div>
  )
}

export default App
