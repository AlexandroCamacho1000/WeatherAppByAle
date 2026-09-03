import React from 'react'
import {
  Sun,
  Moon,
  CloudSun,
  CloudMoon,
  Cloud,
  CloudRain,
  CloudDrizzle,
  CloudLightning,
  CloudSnow,
  CloudFog,
} from 'lucide-react'

function getWeatherIcon(main, iconCode) {
  const isDay = iconCode?.includes('d') ?? true
  switch (main) {
    case 'Clear':
      return isDay ? Sun : Moon
    case 'Clouds':
      if (iconCode === '02d') return CloudSun
      if (iconCode === '02n') return CloudMoon
      return Cloud
    case 'Rain':
      return CloudRain
    case 'Drizzle':
      return CloudDrizzle
    case 'Thunderstorm':
      return CloudLightning
    case 'Snow':
      return CloudSnow
    case 'Mist':
    case 'Smoke':
    case 'Haze':
    case 'Dust':
    case 'Fog':
    case 'Sand':
    case 'Ash':
    case 'Squall':
    case 'Tornado':
      return CloudFog
    default:
      return Cloud
  }
}

function getIconColor(main, isDay) {
  switch (main) {
    case 'Clear':
      return isDay ? 'text-yellow-300' : 'text-slate-200'
    case 'Thunderstorm':
      return 'text-yellow-200'
    case 'Rain':
    case 'Drizzle':
      return 'text-sky-300'
    case 'Snow':
      return 'text-cyan-100'
    default:
      return 'text-white'
  }
}

function WeatherIcon({ main, iconCode, className }) {
  const isDay = iconCode?.includes('d') ?? true
  const iconColor = getIconColor(main, isDay)
  return React.createElement(getWeatherIcon(main, iconCode), {
    className: `${className} ${iconColor} drop-shadow-[0_0_12px_rgba(255,255,255,0.35)]`,
    strokeWidth: 1.5,
  })
}

function InfoCard({ label, value, bgClass }) {
  return (
    <div className={`${bgClass} p-3 rounded-xl flex flex-col items-center justify-center shadow-md hover:scale-105 transition-transform backdrop-blur-none`}>
      <p className="text-base md:text-lg font-semibold text-white">{value}</p>
      <p className="text-xs md:text-sm text-gray-300">{label}</p>
    </div>
  )
}

function WeatherDisplay({ weatherData, unit }) {
  if (!weatherData) return null

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

  const windSpeed = unit === 'C'
    ? `${weatherData.wind.speed} m/s`
    : `${(weatherData.wind.speed * 2.237).toFixed(1)} mph`

  const main = weatherData.weather?.[0]?.main || 'Clouds'
  const iconCode = weatherData.weather?.[0]?.icon
  const description = weatherData.weather?.[0]?.description || 'N/A'

  return (
    <div className="mt-6 max-w-sm mx-auto p-4 bg-gradient-to-br from-blue-950 to-blue-900/80 backdrop-blur-lg rounded-3xl shadow-xl text-white animate-fadeIn">
      <div className="text-center mb-4">
        <h2 className="text-2xl md:text-3xl font-bold">{weatherData.name}, {weatherData.sys?.country}</h2>
        <p className="capitalize text-gray-200 text-sm md:text-base">{description}</p>
      </div>

      <div className="flex flex-col items-center mb-4">
        <div className="w-24 h-24 md:w-28 md:h-28 mb-2 flex items-center justify-center rounded-full bg-white/10 border border-white/10 shadow-inner">
          <WeatherIcon main={main} iconCode={iconCode} className="w-14 h-14 md:w-16 md:h-16" />
        </div>
        <p className="text-4xl md:text-5xl font-extrabold">{temp}{tempUnit}</p>
        <p className="text-gray-300 text-xs md:text-sm">Feels like {feels_like}{tempUnit}</p>
      </div>

      <div className="grid grid-cols-2 gap-2 mb-2">
        <InfoCard label="Min" value={`${tempMin}${tempUnit}`} bgClass="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700" />
        <InfoCard label="Max" value={`${tempMax}${tempUnit}`} bgClass="bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900" />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <InfoCard label="Humidity" value={`${weatherData.main.humidity}%`} bgClass="bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700" />
        <InfoCard label="Wind" value={windSpeed} bgClass="bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900" />
      </div>
    </div>
  )
}

export default WeatherDisplay
