import { useEffect, useState } from "react";
import "./App.css";
import "./assets/styles/Background.css";
import WeatherInfoPanel from "./components/WeatherInfoPanel";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    const API_KEY = "4d8fb5b93d4af21d66a2948710284366";
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (city) fetchData();
  }, [city]);

  const handleCitySelect = (selectedCity) => {
    setCity(selectedCity);
  };

  const handleClear = () => {
    setCity("");
    setWeather(null);
  };

  const formatTemp = (t) => (typeof t === "number" ? `${Math.round(t)}°` : "—°");
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="app">
      <div className="sky-bg" aria-hidden="true">
        <div className="stars" />
        <div className="cloud cloud-1" />
        <div className="cloud cloud-2" />
        <div className="cloud cloud-3" />
        <div className="cloud cloud-4" />
      </div>

      <div className="weather-header">
        <div className="left-section">
          <span className={`temperature poppins ${loading ? "loading" : ""}`}>
            {formatTemp(weather?.main?.temp)}
          </span>
        </div>
        <div className="right-section">
          <span className="city-name poppins">
            {weather?.name ?? "Weather"}
          </span>
          {weather?.weather?.[0]?.description && (
            <span className="weather-desc poppins">
              {weather.weather[0].description}
            </span>
          )}
          <span className="date-text poppins">{today}</span>
        </div>
      </div>

      <div className="info-panel">
        <WeatherInfoPanel
          weather={weather}
          loading={loading}
          onCitySelect={handleCitySelect}
          onClear={handleClear}
        />
      </div>
    </div>
  );
}

export default App;
