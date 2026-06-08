import React from "react";
import "../assets/styles/WeatherInfoPanel.css";
import Input from "./SearchInput";

function WeatherInfoPanel({ weather, loading, onCitySelect, onClear }) {
  const tempMax = weather?.main?.temp_max ?? "—";
  const tempMin = weather?.main?.temp_min ?? "—";
  const humidity = weather?.main?.humidity ?? "—";
  const cloudiness =
    weather?.weather?.[0]?.description ??
    (weather?.clouds?.all ? `${weather.clouds.all}%` : "—");
  const windMps = weather?.wind?.speed ?? null;

  const windKmh = windMps == null ? "—" : Math.round(windMps * 3.6);
  const formatTemp = (t) => (typeof t === "number" ? `${Math.round(t)}°C` : t);
  const formatHumidity = (h) => (typeof h === "number" ? `${h}%` : h);
  const formatWind = (w) => (typeof w === "number" ? `${w} km/h` : w);

  const details = [
    { label: "Temp max", value: formatTemp(tempMax) },
    { label: "Temp min", value: formatTemp(tempMin) },
    { label: "Humidity", value: formatHumidity(humidity) },
    { label: "Cloudy", value: cloudiness, capitalize: true },
    { label: "Wind", value: formatWind(windKmh) },
  ];

  return (
    <div className="weather-info-panel">
      <div className="search-panel">
        <Input onCitySelect={onCitySelect} onClear={onClear} />
      </div>

      <div className="weather-details">
        <h4 className="poppins">Weather Details</h4>
        <div className="details">
          {loading ? (
            <div className="loading-state poppins">
              <span className="loading-spinner" />
              Loading...
            </div>
          ) : weather ? (
            <dl className="details-grid">
              {details.map(({ label, value, capitalize }) => (
                <div className="detail-row" key={label}>
                  <dt className="poppins">{label}</dt>
                  <dd className={`poppins${capitalize ? " capitalize" : ""}`}>
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="empty-state poppins">
              <span className="empty-state-icon">🌤</span>
              Enter a city name to see weather details
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default WeatherInfoPanel;
