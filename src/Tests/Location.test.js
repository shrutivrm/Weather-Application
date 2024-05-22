import { getCoorFromCity, getLocation } from "../Location";
import { API_KEY } from "../env";

global.fetch = jest.fn();

describe("Test Cases for getCoorFromCity function", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it("should return coordinates for a valid city", async () => {
    const mockData = [
      { lat: 27.4955539, lon: 77.6855554 }, // Mocked data for Mathura City
    ];
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockData,
    });

    const city = "Mathura";
    const key = API_KEY;
    const [lat, lon] = await getCoorFromCity(city, key);

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${key}`
    );
    expect(lat).toBe(27.4955539);
    expect(lon).toBe(77.6855554);
  });

  it("should throw an error if the API response is not ok", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
    });

    const city = "Mathura";
    const key = API_KEY;

    await expect(getCoorFromCity(city, key)).rejects.toThrow(
      "Network response was not ok"
    );

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${key}`
    );
  });
});

describe("Text cases for getLocation function", () => {
  beforeEach(() => {
    jest.restoreAllMocks();

    global.navigator.geolocation = {
      getCurrentPosition: jest.fn(),
    };
  });

  it("should reject if geolocation fails", async () => {
    const mockError = new Error("User denied Geolocation");

    jest
      .spyOn(navigator.geolocation, "getCurrentPosition")
      .mockImplementation((success, error) => {
        error(mockError);
      });

    await expect(getLocation()).rejects.toThrow("User denied Geolocation");
  });
});
