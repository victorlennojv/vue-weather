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
          placeholder="Enter a city name..."
          v-model="query"
          @keypress="fetchWeatherAxios"
        />
      </div>
      <loading :active="isLoading" :is-full-page="fullPage" />
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
    </main>
  </div>
</template>

<script>
import dateBuilder from "@/helper/util";
import { getWeather } from "@/service/weather";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  name: "App",

  components: {
    Loading,
  },

  data: () => ({
    query: "",
    weather: {},
    isLoading: false,
    fullPage: true,
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
    async fetchWeatherAxios(e) {
      if (e.key !== "Enter") return;

      this.isLoading = true;
      try {
        const { data } = await getWeather(this.query);
        this.weather = data;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
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
  background-color: #e4e4e4;
}

#app {
  background-image: url("./assets/cold-bg.png");
  background-size: auto;
  background-position: bottom;
  transition: 0.4s;
  width: 500px;
  height: 800px;
  border-radius: 20px;
  box-shadow: rgba(255, 255, 255, 0.25) 0px 54px 55px,
    rgba(255, 255, 255, 0.12) 0px -12px 30px,
    rgba(255, 255, 255, 0.12) 0px 4px 6px,
    rgba(255, 255, 255, 0.17) 0px 12px 13px,
    rgba(255, 255, 255, 0.09) 0px -3px 5px;
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

  box-shadow: 5px 5px 16px rgba(0, 0, 0, 0.25);
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 18px;
  transition: 0.4s;
}

.search-box .search-bar:focus {
  box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
    rgba(0, 0, 0, 0.22) 0px 10px 10px;
  background-color: rgba(255, 255, 255, 1);
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

  box-shadow: rgba(255, 255, 255, 0.25) 0px 13px 27px -5px,
    rgba(255, 255, 255, 0.3) 0px 8px 16px -8px;
}

.weather-box .weather {
  color: #fff;
  font-size: 32px;
  font-weight: 100;
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

/* Media Queries */
@media (max-width: 600px) {
  body {
    padding: 2px;
  }
}
</style>
