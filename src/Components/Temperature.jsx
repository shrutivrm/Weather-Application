import React from "react";
import "./style.css";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";

function Temperature(props) {
  const { setCity, stats } = props;

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  const localTime = new Date(Date.now() + stats.time * 1000).toLocaleString(
    "en-US",
    { timeZone: "UTC" }
  );

  return (
    <>
      <div className="temp-container">
        <input
          type="text"
          className="inputStyle"
          placeholder="Enter Your Location"
          onChange={handleCityChange}
        />
        <LocationOnOutlinedIcon
          style={{ margin: "1rem", color: "white" }}
          className="locationIcon"
        />
      </div>
      <div className="icon-style">
        {new Date(localTime).getHours() >= 17 ? (
          <DarkModeOutlinedIcon style={{ fontSize: "4rem", color: "white" }} />
        ) : (
          <LightModeOutlinedIcon
            style={{ fontSize: "4rem", color: "yellow" }}
          />
        )}
      </div>
      <div className="temp-style">
        <p style={{ fontSize: "55px", fontWeight: "600" }}>{stats.temp}</p>
        <span style={{ fontSize: "33px" }}>°C</span>
      </div>
      <div className="tempName-style">{stats.condition}</div>
      <div className="tempDetails-style">
        {" "}
        Today . {localTime} | {stats.location}
      </div>
    </>
  );
}

export default Temperature;
