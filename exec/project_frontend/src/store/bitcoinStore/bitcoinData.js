var axios = require("axios");

const state = {
  allCoin: "",
  allCoinEnglishName: [],
  allCoinKoreaName: [],
  coinCheck: [],
  coinPrice: [],
  coinChange: [],
  coinChangePrice: [],
  loaded: false,

  tradeAllcoin: [],
};
// vue의 computed와 비슷하다.
const getters = {};
// state를 변경시키는 역할을 한다.
// 동기처리를 하며 commit('함수명', '전달인자')로 실행 시킬 수 있다.
const mutations = {};
// 비동기를 사용할 때, 또는 여러 mutations를 연달아 송출할 때
const actions = {
  allData({ state }) {
    // 코인 영어, 한글이름 배열에 담기
    if (state.allCoinEnglishName !== []) {
      state.allCoinEnglishName = [];
      state.allCoinKoreaName = [];
    }
    axios.get("https://api.upbit.com/v1/market/all").then((res) => {
      state.allCoin = res.data.length;
      for (var i = 0; i < res.data.length - 1; i++) {
        if (res.data[i].market[0] === "K") {
          // 한국 코인만 가져오기
          state.allCoinEnglishName.push(res.data[i].market);
          state.allCoinKoreaName.push(res.data[i].korean_name);
        }
      }

      var moneyForm = /\B(?=(\d{3})+(?!\d))/g;

      const countPrice = (i) => {
        if (i < state.allCoinEnglishName.length) {
          setTimeout(function () {
            axios
              .get(
                "https://api.upbit.com/v1/ticker?markets=" +
                  state.allCoinEnglishName[i]
              )
              .then((res2) => {
                state.tradeAllcoin.push([
                  (res2.data[0].change_rate * 100).toFixed(2),
                  state.allCoinEnglishName[i - 1],
                  res2.data[0].change,
                  state.allCoinKoreaName[i - 1],
                  res2.data[0].trade_price.toString().replace(moneyForm, ","),
                  res2.data[0].change_price.toString().replace(moneyForm, ","),
                ]);
              });
            i++;
            countPrice(i);
          }, 100);
        } else {
          state.loaded = true;
        }
      };
      countPrice(0);
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
