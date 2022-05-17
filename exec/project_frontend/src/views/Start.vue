<template>
  <v-container>
    <div class="total">
      <div class="tradeTitle">
        <div class="bit">
          <div>비트코인</div>
          <strong>{{ bitPrice }}</strong>
          <span class="up" v-if="bitCheck === 'RISE'">
            ▲ {{ bitChange }} + ({{ bitPercent }}%)
          </span>
          <span class="down" v-else-if="bitCheck === 'FALL'">
            ▼ {{ bitChange }} - ({{ bitPercent }}%)
          </span>
        </div>
      </div>
    </div>
    <div class="btnBox">
      <v-row>
        <v-spacer></v-spacer>
        <img :src="signup" alt="" class="startIcon" @click="moveSignUp()" />
        <v-spacer></v-spacer>
        <img
          :src="login"
          alt="로그인  "
          class="startIcon"
          @click="moveLogin()"
        />
        <v-spacer></v-spacer>
      </v-row>
    </div>
  </v-container>
</template>
<script>
import { moveLogin, moveSignUp } from "../api/move.js";
import axios from "axios";

export default {
  name: "Main",
  data() {
    return {
      loaded: false,

      bitPrice: "",
      bitChange: "",
      bitCheck: "",
      bitPercent: "",

      allCoin: [],
      allCoinChange: [],
      allCoinEnglishName: [],
      allCoinKoreaName: [],
      coinPrice: [],
      coinChange: [],

      signup: require("@/assets/images/header/sign-up.png"),
      login: require("@/assets/images/header/login.png"),
    };
  },
  methods: {
    moveLogin() {
      moveLogin();
    },
    moveSignUp() {
      moveSignUp();
    },
    bitCoin() {
      axios
        .get("https://api.upbit.com/v1/ticker?markets=KRW-BTC")
        .then((res) => {
          this.loaded = true;
          var bit = res.data[0];
          console.log(bit);
          var tranlate = /\B(?=(\d{3})+(?!\d))/g; // 1000원마다 , 찍어주는식
          this.bitPrice = bit.trade_price.toString().replace(tranlate, ",");
          this.bitChange = bit.change_price;
          this.bitCheck = bit.change;
          this.bitPercent = (bit.change_rate * 100).toFixed(2);
        });
    },
    allData: function () {
      // 코인 영어, 한글이름 배열에 담기
      axios.get("https://api.upbit.com/v1/market/all").then((res) => {
        for (var i = 0; i < res.data.length - 1; i++) {
          if (res.data[i].market[0] === "K") {
            // 한국 코인만 가져오기
            this.allCoinEnglishName.push(res.data[i].market);
            this.allCoinKoreaName.push(res.data[i].korean_name);
          }
        }

        // 2번째 axios요청에서 this.allCoinEnglishName[i]를 할수 없어서 임시로 배열 만듬
        let eng = this.allCoinEnglishName;

        // 2번째 axios요청에서 .push를 인식 못해서 문자열로 더해서 만든후 .split(",")로 배열로 바꿔서 변수에 넣음
        let price = "";
        let change = "";

        const countPrice = (i) => {
          if (i < eng.length) {
            setTimeout(function () {
              axios
                .get("https://api.upbit.com/v1/ticker?markets=" + eng[i])
                .then((res2) => {
                  price += res2.data[0].trade_price + ",";
                  change += res2.data[0].change_rate + ",";
                });

              i++;
              countPrice(i);
            }, 150); // setTimeout 함수 종료
          } else {
            this.coinPrice.push(price.split(","));
            this.coinChange.push(change.split(","));
          }
        };
        countPrice(0); // 0번째 코인부터 마지막 코인까지 꺼내기 위해 0부터 시작
      });
    },
  },
  mounted() {
    this.bitCoin();
    this.allData();
  },
};
</script>

<style scoped>
@import "./../assets/css/start.css";
</style>
