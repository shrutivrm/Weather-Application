import { createSlice } from "@reduxjs/toolkit";

export const weatherSlice = createSlice({
  name: "weather",
  initialState: {
    city: null,
    weatherData: null,
    position: null,
  },
  reducers: {
    setCity: (state, action) => {
      state.city = action.payload;
    },
    setWeatherData: (state, action) => {
      state.weatherData = action.payload;
    },
    setPosition: (state, action) => {
      state.position = action.payload;
    },
  },
});

export const { setCity, setWeatherData, setPosition } = weatherSlice.actions;

export const selectCity = (state) => state.weather.city;
export const selectWeatherData = (state) => state.weather.weatherData;
export const selectPosition = (state) => state.weather.position;

export default weatherSlice.reducer;
