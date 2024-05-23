import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { API_KEY } from "./env";
import { getCoorFromCity, getLocation } from "./Location";
import store from "./redux/store";
import { Provider } from "react-redux";

jest.mock("./Location", () => ({
  getLocation: jest.fn(),
  getCoorFromCity: jest.fn(),
}));

global.navigator.geolocation = {
  getCurrentPosition: jest.fn(),
};

describe("Text cases for App Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders weather image", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const image = screen.getByAltText("Weather Image");
    expect(image).toBeInTheDocument();
  });

  test("fetches location and weather data on mount", async () => {
    const mockPosition = { latitude: 12.34, longitude: 56.78 };
    const mockWeatherData = {
      main: { temp: 20, humidity: 50, pressure: 1000 },
      weather: [{ main: "Clear" }],
      name: "Mock City",
      wind: { speed: 5 },
      visibility: 10000,
      timezone: 3600,
    };

    getLocation.mockResolvedValue(mockPosition);
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: async () => mockWeatherData,
    });

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const temp = await screen.findByText("20");
    expect(temp).toBeInTheDocument();

    const city = await screen.findByText(/Mock City/i);
    expect(city).toBeInTheDocument();
  });
});
