import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { API_KEY } from "./env";
import { getLocation } from "./Location";
import fetchMock from "jest-fetch-mock";

jest.mock("./Location");
jest.mock("./env", () => ({
  API_KEY: "test-api-key",
}));

fetchMock.enableMocks();

const mockWeatherData = {
  coord: {
    lon: 77.674,
    lat: 27.5249,
  },
  weather: [
    {
      id: 801,
      main: "Clouds",
      description: "few clouds",
      icon: "02n",
    },
  ],
  base: "stations",
  main: {
    temp: 38.16,
    feels_like: 35.74,
    temp_min: 38.16,
    temp_max: 38.16,
    pressure: 997,
    humidity: 14,
    sea_level: 997,
    grnd_level: 979,
  },
  visibility: 10000,
  wind: {
    speed: 5.14,
    deg: 81,
    gust: 10.45,
  },
  clouds: {
    all: 17,
  },
  dt: 1716395610,
  sys: {
    country: "IN",
    sunrise: 1716335837,
    sunset: 1716384899,
  },
  timezone: 19800,
  id: 1263364,
  name: "Mathura",
  cod: 200,
};

describe("Text cases for App Component", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("should fetch and display weather data for user location", async () => {
    getLocation.mockResolvedValue({
      latitude: 40.712776,
      longitude: -74.005974,
    });
    fetch.mockResponseOnce(JSON.stringify(mockWeatherData));

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/38.16/i)).toBeInTheDocument();
      expect(screen.getByText(/Clouds/i)).toBeInTheDocument();
      expect(screen.getByText(/Mathura/i)).toBeInTheDocument();
      expect(screen.getByText(/Wind Status/i)).toBeInTheDocument();
      expect(screen.getByText(/Humidity/i)).toBeInTheDocument();
      expect(screen.getByText(/Visibility/i)).toBeInTheDocument();
      expect(screen.getByText(/Air Pressure/i)).toBeInTheDocument();
    });
  });
});
