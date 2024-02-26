const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

const updateUI = (data) => {
  //   const cityDets = data.cityDets;
  //   const weather = data.weather;

  //destructuring
  const { cityDets, weather } = data;

  //update details template
  details.innerHTML = `
<h5>${cityDets.EnglishName}</h5>
            <div>${weather.WeatherText}</div>
            <div class="temp">
              <span>${weather.Temperature.Metric.Value}</span>
              <span>&deg;C</span>
            </div>
`;

  //render the card
  card.style.display = "block";

  ///update night and day and icon images
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  let timeSrc = null;
  if (weather.IsDayTime) {
    timeSrc = "img/day.svg";
  } else {
    timeSrc = "img/night.svg";
  }
  time.setAttribute("src", timeSrc);
};

const updateCity = async (city) => {
  const cityDets = await getCity(city);
  const weather = await getWeather(cityDets.Key);

  return {
    cityDets,
    weather,
  };
};

cityForm.addEventListener("submit", (e) => {
  //prevent default action
  e.preventDefault();

  //get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();
  //update the city
  updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
});
