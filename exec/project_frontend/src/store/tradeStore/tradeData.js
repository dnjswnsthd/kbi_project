var axios = require("axios");
//var cheerio = require("cheerio");

const state = {
  tradeLoaded: false,
  // koreaPrice: "",
  // koreaChange: [],
  // koreaCheck: "",
  // koreaPercent: "",

  // americaPrice: "",
  // americaChange: [],
  // americaCheck: "",
  // americaPercent: "",

  bitPrice: "",
  bitChange: "",
  bitCheck: "",
  bitPercent: "",

  ethPrice: "",
  ethChange: "",
  ethCheck: "",
  ethPercent: "",

  xrpPrice: "",
  xrpChange: "",
  xrpCheck: "",
  xrpPercent: "",

  adaPrice: "",
  adaChange: "",
  adaCheck: "",
  adaPercent: "",

  solPrice: "",
  solChange: "",
  solCheck: "",
  solPercent: "",
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
  bitCoin({ state }) {
    axios.get("https://api.upbit.com/v1/ticker?markets=KRW-BTC").then((res) => {
      state.tradeLoaded = true;
      var bit = res.data[0];
      // console.log(bit)
      var tranlate = /\B(?=(\d{3})+(?!\d))/g; // 1000원마다 , 찍어주는식
      state.bitPrice = bit.trade_price.toString().replace(tranlate, ",");
      state.bitChange = bit.change_price.toString().replace(tranlate, ",");
      state.bitCheck = bit.change;
      state.bitPercent = (bit.change_rate * 100).toFixed(2);
    });
  }, // bitCoin함수 끝

  ethereum({ state }) {
    axios.get("https://api.upbit.com/v1/ticker?markets=KRW-ETH").then((res) => {
      state.tradeLoaded = true;
      var bit = res.data[0];
      // console.log(bit)
      var tranlate = /\B(?=(\d{3})+(?!\d))/g; // 1000원마다 , 찍어주는식
      state.ethPrice = bit.trade_price.toString().replace(tranlate, ",");
      state.ethChange = bit.change_price.toString().replace(tranlate, ",");
      state.ethCheck = bit.change;
      state.ethPercent = (bit.change_rate * 100).toFixed(2);
    });
  },

  ripple({ state }) {
    axios.get("https://api.upbit.com/v1/ticker?markets=KRW-XRP").then((res) => {
      state.tradeLoaded = true;
      var bit = res.data[0];
      // console.log(bit)
      var tranlate = /\B(?=(\d{3})+(?!\d))/g; // 1000원마다 , 찍어주는식
      state.xrpPrice = bit.trade_price.toString().replace(tranlate, ",");
      state.xrpChange = bit.change_price.toString().replace(tranlate, ",");
      state.xrpCheck = bit.change;
      state.xrpPercent = (bit.change_rate * 100).toFixed(2);
    });
  },

  ada({ state }) {
    axios.get("https://api.upbit.com/v1/ticker?markets=KRW-ADA").then((res) => {
      state.tradeLoaded = true;
      var bit = res.data[0];
      // console.log(bit)
      var tranlate = /\B(?=(\d{3})+(?!\d))/g; // 1000원마다 , 찍어주는식
      state.adaPrice = bit.trade_price.toString().replace(tranlate, ",");
      state.adaChange = bit.change_price.toString().replace(tranlate, ",");
      state.adaCheck = bit.change;
      state.adaPercent = (bit.change_rate * 100).toFixed(2);
    });
  },

  solana({ state }) {
    axios.get("https://api.upbit.com/v1/ticker?markets=KRW-SOL").then((res) => {
      state.tradeLoaded = true;
      var bit = res.data[0];
      // console.log(bit)
      var tranlate = /\B(?=(\d{3})+(?!\d))/g; // 1000원마다 , 찍어주는식
      state.solPrice = bit.trade_price.toString().replace(tranlate, ",");
      state.solChange = bit.change_price.toString().replace(tranlate, ",");
      state.solCheck = bit.change;
      state.solPercent = (bit.change_rate * 100).toFixed(2);
    });
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
