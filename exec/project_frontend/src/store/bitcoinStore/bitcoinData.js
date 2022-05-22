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
// vue의 computed와 비슷
const getters = {};
// state를 수정할 때 사용
const mutations = {};
// 비동기를 사용할 때, 또는 여러 mutations를 연달아 송출할 때
const actions = {
  allData({ state }) {
    // 코인 영어, 한글이름 배열에 담기
    if (state.allCoinEnglishName !== []) {
      state.allCoinEnglishName = [];
      state.allCoinKoreaName = [];
      state.coinPrice = [];
      state.coinChange = [];
      state.coinCheck = [];
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

      // 2번째 axios요청에서 this.allCoinEnglishName[i]를 할수 없어서 임시로 배열 만듬
      var eng = state.allCoinEnglishName;

      // 2번째 axios요청에서 .push를 인식 못해서 문자열로 더해서 만든후 .split(",")로 배열로 바꿔서 변수에 넣음
      var price = "";
      var change = "";
      var check = "";
      var changePrice = "";

      const countPrice = (i) => {
        if (i < eng.length) {
          setTimeout(function () {
            axios
              .get("https://api.upbit.com/v1/ticker?markets=" + eng[i])
              .then((res2) => {
                console.log(res2);
                price += res2.data[0].trade_price + ",";
                change += res2.data[0].change_rate + ",";
                check += res2.data[0].change + ",";
                changePrice += res2.data[0].change_price + ",";
              });

            i++;
            countPrice(i);
          }, 150); // setTimeout 함수 종료
        } else {
          console.log("실행??");
          state.loaded = true;
          state.coinPrice.push(price.split(","));
          state.coinChange.push(change.split(","));
          state.coinCheck.push(check.split(","));
          state.coinChangePrice.push(changePrice.split(","));

          var tranlate = /\B(?=(\d{3})+(?!\d))/g; // 1000원마다 , 찍어주는식
          for (var j = 0; j < state.allCoinEnglishName.length; j++) {
            state.tradeAllcoin.push([
              (state.coinChange[0][j] * 100).toFixed(2),
              state.allCoinEnglishName[j],
              state.coinCheck[0][j],
              state.allCoinKoreaName[j],
              state.coinPrice[0][j].toString().replace(tranlate, ","),
              state.coinChangePrice[0][j].toString().replace(tranlate, ","),
            ]);
          }
        }
      };
      countPrice(0); // 0번째 코인부터 마지막 코인까지 꺼내기 위해 0부터 시작
    }); // 맨처음 axios 함수 괄호
  }, // allData 함수 끝
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
