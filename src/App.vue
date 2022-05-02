<template>
  <div
    id="app"
    :class="
      typeof weather.main != 'undefined' && weather.main.temp > 16 ? 'warm' : ''
    "
  >
    <main>
      <div class="search-box">
        <input
          type="text"
          class="search-bar"
          placeholder="Enter a location..."
          v-model="query"
          @keypress="fetchWeather"
        />
        <!-- <font-awesome-icon class="search-icon" icon="fa-solid fa-search" /> -->
      </div>

      <div v-if="weather.main">
        <div class="location-box">
          <div class="location">
            {{ weather.name }}, {{ weather.sys.country }}
          </div>
          <div class="date">{{ currentDate }}</div>
        </div>

        <div class="weather-box">
          <div class="temp">{{ weatherTemp }}ºc</div>
          <div class="weather">{{ weather.weather[0].main }}</div>
        </div>
      </div>
      <div v-else class="main-text">No city informed...</div>
    </main>
  </div>
</template>

<script>
import dateBuilder from "@/helper/util";

export default {
  name: "App",

  data: () => ({
    api_key: "3d84546881654ccd7964d20dc7e4a847",
    url_base: "https://api.openweathermap.org/data/2.5/",
    query: "",
    weather: {},
  }),

  computed: {
    weatherTemp() {
      return Math.round(this.weather.main.temp);
    },

    currentDate() {
      return dateBuilder;
    },
  },

  methods: {
    fetchWeather(e) {
      if (e.key === "Enter") {
        fetch(
          `${this.url_base}weather?q=${this.query}&units=metric&APPID=${this.api_key}`
        )
          .then((res) => {
            return res.json();
          })
          .then(this.setResults);
      }
    },

    setResults(results) {
      this.weather = results;
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: "montserrat", sans-serif;
  display: flex;
  justify-content: center;
  padding: 70px;
}
#app {
  background-image: url("./assets/cold-bg.jpg");
  background-size: cover;
  background-position: bottom;
  transition: 0.4s;
  width: 500px;
  height: 800px;
  border-radius: 20px;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
    rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
}

#app.warm {
  background-image: url("./assets/warm-bg.jpg");
}

main {
  min-height: 100%;
  padding: 25px;
  border-radius: 20px;

  background-image: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.25),
    rgba(0, 0, 0, 0.75)
  );
}

.search-box {
  width: 100%;
  margin-bottom: 30px;
}

.search-box .search-bar {
  display: block;
  width: 100%;
  padding: 13px;

  color: #313131;
  font-size: 18px;

  appearance: none;
  border: none;
  outline: none;
  background: none;

  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 12px 12px 10px 10px;
  transition: 0.4s;
}

.search-box .search-bar:focus {
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.75);
  border-radius: 12px 12px 12px 12px;
}

.location-box .location {
  color: #fff;
  font-size: 32px;
  font-weight: 500;
  text-align: center;
  text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
}

.location-box .date {
  color: #fff;
  font-size: 20px;
  font-weight: 300;
  font-style: italic;
  text-align: center;
}
.weather-box {
  text-align: center;
}

.weather-box .temp {
  display: inline-block;
  padding: 10px 25px;
  color: #fff;
  font-size: 102px;
  font-weight: 900;

  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.25);
  border-radius: 16px;
  margin: 30px 0px;

  box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
}

.weather-box .weather {
  color: #fff;
  font-size: 32px;
  font-weight: 700;
  text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
}

.main-text {
  color: #fff;
  font-size: 22px;
  font-weight: 400;
  text-shadow: 3px 2px 10px rgba(0, 0, 0, 0.25);
  text-align: center;
}

.search-icon {
  display: inline-block;
  position: relative;
}
</style>
