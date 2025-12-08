import React, { useState } from 'react'
import logo from './assets/logoaledev.png'
import SearchBar from './components/SearchBar'
import TemperatureToggle from './components/TemperatureToggle'
import WeatherDisplay from './components/WeatherDisplay'

const API_KEY = "7a19baa71ff29d25289ba84cde79443d"
const BASE_URL = "https://api.openweathermap.org/data/2.5"

// Spinner
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
    if (!city) return
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(
        `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`
      )
      const data = await response.json()
      if (data.cod !== 200) {
        setError(data.message)
        setWeatherData(null)
      } else {
        setWeatherData(data)
      }
    } catch (err) {
      setError("Error fetching weather")
      setWeatherData(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen relative flex justify-center items-start pt-16">

      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center before:content-[''] before:absolute before:inset-0 before:bg-blue/70"
        style={{
          backgroundImage: `url('https://images.pexels.com/photos/1431822/pexels-photo-1431822.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`
        }}
      ></div>

      {/* Main container */}
      <div className="relative z-10 flex flex-col items-center w-full max-w-2xl 
                      bg-black/30 backdrop-blur-md border-4 border-white/20 rounded-3xl
                      px-8 py-10 space-y-6 shadow-2xl">

        {/* Logo */}
        <img 
          src={logo} 
          alt="AleDev Logo"
          className="w-28 md:w-36 mb-2 brightness-200 contrast-200 saturate-250 drop-shadow-[0_0_20px_rgba(255,0,255,0.4)]"
        />

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-white text-center">
          Weather <span className="text-blue-400">App</span>
        </h1>

        {/* Description */}
        <p className="text-gray-200 text-center text-sm md:text-base leading-relaxed">
          Discover weather like never before with real-time data, beautiful visuals, and precise forecasts for any location worldwide.
        </p>

        {/* SearchBar + TemperatureToggle */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between
                        gap-2 p-3 bg-white/10 rounded-2xl border border-white/20">
          <div className="flex-1">
            <SearchBar setLoading={setLoading} fetchWeather={fetchWeather} />
          </div>
          <div className="flex justify-center md:justify-end mt-2 md:mt-0">
            <TemperatureToggle unit={unit} setUnit={setUnit} />
          </div>
        </div>

        {/* Spinner */}
        {loading && <LoadingSpinner />}

        {/* Error */}
        {error && !loading && (
          <p className="text-red-400 font-semibold text-center">{error}</p>
        )}

        {/* Weather Display */}
        {weatherData && !loading && (
          <div className="w-full mt-4">
            <WeatherDisplay weatherData={weatherData} unit={unit} />
          </div>
        )}

      </div>
    </div>
  )
}

export default App
