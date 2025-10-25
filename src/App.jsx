import { useEffect, useState } from "react";
import "./App.css";
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
    if (city) {
      fetchData();
    }
  }, [city]);
  console.log(weather);
  
  const formatTemp = (t) => (typeof t === "number" ? `${Math.round(t)}°C` : t);
  return (
    <div className="container  items-end">
      <div className="info-panel w-min h-min">
        <WeatherInfoPanel
          weather={weather}
          loading={loading}
          city={city}
          setCity={setCity}
          setLoading={setLoading}
        />
      </div>
      <div className="weather-header flex gap-[10px] w-min h-min items-center mb-[100px]">
        <div className="left-section h-min w-min">
          <span className="text-[143px] font-[400] poppins tracking-[-8px] text-[#fff]">
            {formatTemp(weather?.main?.temp)}
          </span>
        </div>
        <div className="right-section flex flex-col h-min">
          <div className="country w-min h-min">
            <span className="text-center text-[60px] font-[400] text-[#fff] poppins tracking-[0px]">
              {weather?.name}
            </span>
          </div>
          <div className="date w-max h-min">
            <span className="text-center text-[18px] text-[#fff] tracking-[0px] poppins font-[400]">
              
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
