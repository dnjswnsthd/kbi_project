var axios = require("axios");
var cheerio = require("cheerio");

const state = {
  tradeLoaded: false,
  koreaPrice: "",
  koreaChange: [],
  koreaCheck: "",
  koreaPercent: "",

  americaPrice: "",
  americaChange: [],
  americaCheck: "",
  americaPercent: "",

  bitPrice: "",
  bitChange: "",
  bitCheck: "",
  bitPercent: "",
};
// vue의 computed와 비슷
const getters = {};
// state를 수정할 때 사용
const mutations = {
  // SET_TEMPERATURE(state, data) {
  //   state.nowTemperature = data
  // },
  // SET_WEATHERCHECK(state, data) {
  //   state.nowWeatherCheck = data
  // },
};
// 비동기를 사용할 때, 또는 여러 mutations를 연달아 송출할 때
const actions = {
  // getData({state, commit}, data) {
  //   axios.get('https://search.naver.com/search.naver?sm=top_hty&fbm=1&ie=utf8&query=%EB%82%A0%EC%94%A8')
  //   .then(res => {
  //     var $ = cheerio.load(res.data)
  //     commit('SET_TEMPERATURE', $('#main_pack > div.sc.cs_weather._weather > div:nth-child(2) > div.weather_box > div.weather_area._mainArea > div.today_area._mainTabContent > div.main_info > div > p > span.todaytemp').text())
  //     commit('SET_WEATHERCHECK', $('#main_pack > div.sc.cs_weather._weather > div:nth-child(2) > div.weather_box > div.weather_area._mainArea > div.today_area._mainTabContent > div.main_info > div > ul > li:nth-child(1) > p').text())
  //     commit('SET_TODAYMIN', $('#main_pack > div.sc.cs_weather._weather > div:nth-child(2) > div.weather_box > div.weather_area._mainArea > div.today_area._mainTabContent > div.main_info > div > ul > li:nth-child(2) > span.merge > span.min').text())
  //     commit('SET_TODAYMAX', $('#main_pack > div.sc.cs_weather._weather > div:nth-child(2) > div.weather_box > div.weather_area._mainArea > div.today_area._mainTabContent > div.main_info > div > ul > li:nth-child(2) > span.merge > span.max').text())
  //     commit('SET_TODAYDUST', $('#main_pack > div.sc.cs_weather._weather > div:nth-child(2) > div.weather_box > div.weather_area._mainArea > div.today_area._mainTabContent > div.sub_info > div > dl > dd:nth-child(2)').text())
  //     commit('SET_TODAYDDUST', $('#main_pack > div.sc.cs_weather._weather > div:nth-child(2) > div.weather_box > div.weather_area._mainArea > div.today_area._mainTabContent > div.sub_info > div > dl > dd:nth-child(4)').text())
  //   })
  // },

  // eslint-disable-next-line no-unused-vars
  koreaData({ state }) {
    axios
      .get("https://finance.naver.com/sise/sise_index.nhn?code=KOSPI")
      .then((res) => {
        var $ = cheerio.load(res.data);
        state.tradeLoaded = true;
        // 코스피 현재 가격
        state.koreaPrice = $("#now_value").text().split(",");
        state.koreaPrice = parseFloat(
          state.koreaPrice[0] + state.koreaPrice[1]
        );

        // 코스피 수치 증감
        var beforeFilter = $("#change_value_and_rate > span").text();
        state.koreaChange = parseFloat(
          beforeFilter.substring(0, beforeFilter.length - 2)
        );

        // 코스피 상승, 하락 구분
        state.koreaCheck = beforeFilter.substring(
          beforeFilter.length - 2,
          beforeFilter.length
        );

        // 코스피 전날 대비 증감% - ((현재가-전일종가)/전일종가 * 100).
        // this.koreaPercent = parseFloat(this.koreaChange)/parseFloat(this.koreaPrice)
        if (state.koreaCheck === "하락") {
          state.koreaPercent = (
            ((state.koreaPrice - (state.koreaPrice + state.koreaChange)) /
              (state.koreaPrice + state.koreaChange)) *
            100
          ).toFixed(2);
        } else if (state.koreaCheck === "상승") {
          state.koreaPercent = (
            ((state.koreaPrice - (state.koreaPrice - state.koreaChange)) /
              (state.koreaPrice - state.koreaChange)) *
            100
          ).toFixed(2);
        }
      });
  }, // 코스피 함수 끝

  americaData({ state }) {
    axios
      .get("https://finance.naver.com/world/sise.nhn?symbol=NAS@IXIC")
      .then((res) => {
        var $ = cheerio.load(res.data);
        state.tradeLoaded = true;
        // 나스닥 현재 가격
        state.americaPrice = $(
          "#content > div.rate_info > div.today > p.no_today > em"
        )
          .text()
          .split(",");
        state.americaPrice = parseFloat(
          state.americaPrice[0] + state.americaPrice[1]
        );

        // 나스닥 수치 증감
        state.americaChange = $(
          "#content > div.rate_info > div.today > p.no_exday > em:nth-child(2)"
        ).text();
        state.americaChange = parseFloat(state.americaChange);
        // 나스닥 상승, 하락 구분
        var beforeCheck = $(
          "#content > div.rate_info > div.today > p.no_exday > em:nth-child(3) > span:nth-child(2)"
        ).text();
        if (beforeCheck === "+") {
          state.americaCheck = "상승";
        } else if (beforeCheck === "-") {
          state.americaCheck = "하락";
        }

        // 코스피 전날 대비 증감% - ((현재가-전일종가)/전일종가 * 100).
        // this.koreaPercent = parseFloat(this.koreaChange)/parseFloat(this.koreaPrice)
        if (state.americaCheck === "하락") {
          state.americaPercent = (
            ((state.americaPrice - (state.americaPrice + state.americaChange)) /
              (state.americaPrice + state.americaChange)) *
            100
          ).toFixed(2);
        } else if (state.americaCheck === "상승") {
          state.americaPercent = (
            ((state.americaPrice - (state.americaPrice - state.americaChange)) /
              (state.americaPrice - state.americaChange)) *
            100
          ).toFixed(2);
        }
      });
  }, // 나스닥 함수 끝

  bitCoin({ state }) {
    axios.get("https://api.upbit.com/v1/ticker?markets=KRW-BTC").then((res) => {
      state.tradeLoaded = true;
      var bit = res.data[0];
      // console.log(bit)
      var tranlate = /\B(?=(\d{3})+(?!\d))/g; // 1000원마다 , 찍어주는식
      state.bitPrice = bit.trade_price.toString().replace(tranlate, ",");
      state.bitChange = bit.change_price;
      state.bitCheck = bit.change;
      state.bitPercent = (bit.change_rate * 100).toFixed(2);
    });
  }, // bitCoin함수 끝
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
