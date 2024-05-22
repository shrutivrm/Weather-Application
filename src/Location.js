export const getLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"));
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          reject(error);
        }
      );
    }
  });
};

export const getCoorFromCity = async (city, key) => {
  const data = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${key}`
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log("data2", data);
      return data;
    });
  return [data[0].lat, data[0].lon];
};
