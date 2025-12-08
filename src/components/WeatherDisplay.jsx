import React from 'react'

// InfoCard: small stat box (Min, Max, Humidity, Wind)
function InfoCard({ label, value, bgClass }) {
  return (
    <div className={`${bgClass} p-3 rounded-xl flex flex-col items-center justify-center shadow-md hover:scale-105 transition-transform backdrop-blur-none`}>
      <p className="text-base md:text-lg font-semibold text-white">{value}</p>
      <p className="text-xs md:text-sm text-gray-300">{label}</p>
    </div>
  )
}

// WeatherDisplay: main weather 
function WeatherDisplay({ weatherData, unit }) {
  if (!weatherData) return null

  // Temperature conversions
  const temp = unit === 'C'
    ? Math.round(weatherData.main.temp)
    : Math.round(weatherData.main.temp * 9 / 5 + 32)

  const feels_like = unit === 'C'
    ? Math.round(weatherData.main.feels_like)
    : Math.round(weatherData.main.feels_like * 9 / 5 + 32)

  const tempMin = unit === 'C'
    ? Math.round(weatherData.main.temp_min)
    : Math.round(weatherData.main.temp_min * 9 / 5 + 32)

  const tempMax = unit === 'C'
    ? Math.round(weatherData.main.temp_max)
    : Math.round(weatherData.main.temp_max * 9 / 5 + 32)

  const tempUnit = unit === 'C' ? '°C' : '°F'

  // Wind conversion
  const windSpeed = unit === 'C'
    ? `${weatherData.wind.speed} m/s`
    : `${(weatherData.wind.speed * 2.237).toFixed(1)} mph`

  return (
    <div className="mt-6 max-w-sm mx-auto p-4 bg-gradient-to-br from-blue-950 to-blue-900/80 backdrop-blur-lg rounded-3xl shadow-xl text-white animate-fadeIn">

      {/* City name + description */}
      <div className="text-center mb-4">
        <h2 className="text-2xl md:text-3xl font-bold">{weatherData.name}, {weatherData.sys?.country}</h2>
        <p className="capitalize text-gray-200 text-sm md:text-base">{weatherData.weather?.[0]?.description || 'N/A'}</p>
      </div>

      {/* Weather icon + main temperature */}
      <div className="flex flex-col items-center mb-4">
        <img
          src={`https://openweathermap.org/img/wn/${weatherData.weather?.[0]?.icon}@4x.png`}
          alt={weatherData.weather?.[0]?.description || 'Weather icon'}
          className="w-24 h-24 md:w-28 md:h-28 mb-2"
        />
        <p className="text-4xl md:text-5xl font-extrabold">{temp}{tempUnit}</p>
        <p className="text-gray-300 text-xs md:text-sm">Feels like {feels_like}{tempUnit}</p>
      </div>

      {/* Row 1: Min & Max */}
      <div className="grid grid-cols-2 gap-2 mb-2">
        <InfoCard label="Min" value={`${tempMin}${tempUnit}`} bgClass="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700" />
        <InfoCard label="Max" value={`${tempMax}${tempUnit}`} bgClass="bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900" />
      </div>

      {/* Row 2: Humidity & Wind */}
      <div className="grid grid-cols-2 gap-2">
        <InfoCard label="Humidity" value={`${weatherData.main.humidity}%`} bgClass="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700" />
        <InfoCard label="Wind" value={windSpeed} bgClass="bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900" />
      </div>
    </div>
  )
}

export default WeatherDisplay
