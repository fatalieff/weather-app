import React from "react";
import "../assets/styles/WeatherInfoPanel.css";
import Input from "./SearchInput";

function WeatherInfoPanel({ weather, loading, city , setCity }) {
  const tempMax = weather?.main?.temp_max ?? "—";
  const tempMin = weather?.main?.temp_min ?? "—";
  const humidity = (weather?.main?.humidity ?? "—");
  const cloudiness = weather?.weather?.[0]?.description ?? (weather?.clouds?.all ? `${weather.clouds.all}%` : "—");
  const windMps = weather?.wind?.speed ?? null;
//Cevirmeler
  const windKmh = windMps == null ? "—" : (Math.round(windMps * 3.6));
  const formatTemp = (t) => (typeof t === "number" ? `${Math.round(t)}°C` : t);
  const formatHumidity = (h) => (typeof h === "number" ? `${h}%` : h);
  const formatWind = (w) => (typeof w === "number" ? `${w} km/h` : w);
  return (
    <div className="weather-info-panel">
      <div className="search-panel">
        <Input weather={weather} loading={loading} city={city} setCity={setCity} />
      </div>
      <div className="weather-details">
        <h4 className="text-center text-[40px] poppins ">Weather Details {}</h4>
        <div className="details flex flex-col">
         {loading ? (
          <p>Loading</p>
         ): weather ? (
          <dl className="details grid grid-cols-1 sm:grid-cols-2 gap-[30px]">
            <div className="flex justify-between">
              <dt className="poppins text-[20px] font-[400]">Temp max</dt>
              <dd className="poppins text-[20px] font-[400]">{formatTemp(tempMax)}</dd>
            </div>

            <div className="flex justify-between">
              <dt className="poppins text-[18px] font-[400]">Temp min</dt>
              <dd className="poppins text-[18px] font-[400]">{formatTemp(tempMin)}</dd>
            </div>

            <div className="flex justify-between">
              <dt className="poppins text-[18px] font-[400]">Humidity</dt>
              <dd className="poppins text-[18px] font-[400]">{formatHumidity(humidity)}</dd>
            </div>

            <div className="flex justify-between">
              <dt className="poppins text-[18px] font-[400]">Cloudy</dt>
              <dd className="poppins text-[18px] font-[400] capitalize">{cloudiness}</dd>
            </div>

            <div className="flex justify-between">
              <dt className="poppins text-[18px] font-[400]">Wind</dt>
              <dd className="poppins text-[18px] font-[400]">{formatWind(windKmh)}</dd>
            </div>
          </dl>
        ) :(
          <p className="text-center text-[30px] font-[700] poppins">Search country...</p>
        )}
        </div>
      </div>
    </div>
  );
}

export default WeatherInfoPanel;
