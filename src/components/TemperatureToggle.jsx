import React from 'react'

function TemperatureToggle({ unit, setUnit }) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setUnit('C')}
        className={`px-4 py-2 rounded-xl font-semibold transition ${
          unit === 'C'
            ? 'bg-gradient-to-br from-[#4f8dff] to-[#8b6cff] text-white shadow-lg shadow-[#4f8dff]/30'
            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
        }`}
      >
        °C
      </button>
      <button
        onClick={() => setUnit('F')}
        className={`px-4 py-2 rounded-xl font-semibold transition ${
          unit === 'F'
            ? 'bg-gradient-to-br from-[#4f8dff] to-[#8b6cff] text-white shadow-lg shadow-[#4f8dff]/30'
            : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
        }`}
      >
        °F
      </button>
    </div>
  )
}

export default TemperatureToggle
