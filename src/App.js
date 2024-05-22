import "./App.css";
import Temperature from "./Components/Temperature";
import Highlights from "./Components/Highlights";
import { useEffect, useState } from "react";
import { getCoorFromCity, getLocation } from "./Location";
import { API_KEY } from "./env";
import weatherImage from "./images/weather-image.jpg";

function App() {
  console.log(weatherImage);
  const [city, setCity] = useState();
  const [weatherData, setWeatherData] = useState();
  const [position, setPosition] = useState();
  const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${position?.latitude}&lon=${position?.longitude}&appid=${API_KEY}&units=metric`;

  useEffect(() => {
    const hanldeLoc = async () => {
      if (city) {
        const coors = await getCoorFromCity(city, API_KEY);
        setPosition(() => ({
          latitude: coors[0],
          longitude: coors[1],
        }));
      } else {
        const res = await getLocation();
        setPosition(res);
      }
    };
    hanldeLoc();
  }, [city]);

  useEffect(() => {
    fetch(api_url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Error");
        }
        return res.json();
      })
      .then((Data) => {
        setWeatherData(Data);
      })
      .catch((Error) => {
        console.log("Error thrown is ", Error);
      });
  }, [city, position, api_url]);

  return (
    <div className="main-container">
      <img
        src={weatherImage}
        alt="Weather Image"
        style={{ height: "auto", width: "100%" }}
      />
      {weatherData && (
        <>
          <div className="main-content">
            <div className="temp-content">
              <Temperature
                setCity={setCity}
                stats={{
                  temp: weatherData?.main.temp,
                  condition: weatherData?.weather[0]?.main,
                  location: weatherData?.name,
                  time: weatherData?.timezone,
                }}
              />
            </div>
            <div className="highlight-content">
              <h2 className="header">Today's Highlights</h2>

              <>
                <Highlights
                  stats={{
                    title: "Wind Status",
                    value: weatherData?.wind?.speed,
                    unit: "mph",
                  }}
                />
                <Highlights
                  stats={{
                    title: "Humidity",
                    value: weatherData?.main?.humidity,
                    unit: "%",
                  }}
                />
                <Highlights
                  stats={{
                    title: "Visibility",
                    value: weatherData?.visibility,
                    unit: "miles",
                  }}
                />
                <Highlights
                  stats={{
                    title: "Air Pressure",
                    value: weatherData?.main?.pressure,
                    unit: "mb",
                  }}
                />
              </>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
