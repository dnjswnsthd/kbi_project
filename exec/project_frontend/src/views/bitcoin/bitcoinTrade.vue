<template>
  <div id="ALL2">
    <div class="chart">
      <bitcoin-chart
        v-bind:coinInfo="coinInfo"
        v-bind:total="total"
        v-if="find === true"
      ></bitcoin-chart>
      <img class="advertisement" src="../../assets/advertisement.png" />
    </div>

    <div class="coinType">
      <div id="coinTypeChoice">
        <a href="#" class="choice yes first" v-on:click="noNeedLogin">원화</a>
        <a
          href="#"
          class="choice no"
          v-on:click="needLogin(index, button)"
          v-for="(button, index) in typeButton"
          v-bind:key="index"
          >{{ button }}</a
        >
      </div>

      <div class="allCoin">
        <table class="coinTalble">
          <thead>
            <tr class="standard">
              <th>즐겨찾기</th>
              <th>한글명</th>
              <th>현재가</th>
              <th>전일대비</th>
            </tr>
          </thead>
          <tbody v-if="loginCheck === false">
            <tr
              class="coinInfo"
              v-for="(coin, index) in tradeAllcoin"
              v-bind:key="index"
              v-on:click="drawChart(coin[1], coin)"
            >
              <td class="tdStar">
                <img
                  class="star"
                  src="../../assets/images/star.png"
                  style="width: 20%"
                />
              </td>
              <td class="coinName" style="width: 40%">
                <a class="coinKoreaName" href="#"
                  >{{ coin[3] }} | {{ coin[1] }}</a
                >
              </td>

              <td class="coinPrice" v-bind:class="{ blue2: coin[2] == 'FALL' }">
                {{ coin[4] }}
              </td>

              <td
                class="coinChange"
                v-if="coin[2] == 'RISE' || coin[2] == 'EVEN'"
              >
                +{{ coin[0] }}%
                <p class="changePrice" v-if="coin[5].length < 3">
                  {{ coin[5] }}.00
                </p>
                <p class="changePrice" v-if="coin[5].length >= 3">
                  {{ coin[5] }}
                </p>
              </td>
              <td class="coinFall" v-if="coin[2] == 'FALL'">
                -{{ coin[0] }}%
                <p class="changePrice" v-if="coin[5].length < 3">
                  {{ coin[5] }}.00
                </p>
                <p class="changePrice" v-if="coin[5].length >= 3">
                  {{ coin[5] }}
                </p>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="noLogin" v-if="loginCheck === true">
          로그인하면 내 관심코인을 확인할 수 있습니다.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import bitcoinChart from "../../components/bitcoin/bitcoinChart";

var axios = require("axios");
//var cheerio = require("cheerio");

import { createNamespacedHelpers } from "vuex";
const bitcoinData = createNamespacedHelpers("bitcoin");

export default {
  components: {
    bitcoinChart: bitcoinChart,
  },
  data() {
    return {
      loginCheck: false,
      typeButton: ["BTC", "USDT", "보유", "관심"],
      // 차트에 데이터 보내는 변수
      find: false,
      total: [],
      coinInfo: [],
    };
  },
  computed: {
    ...bitcoinData.mapState(["tradeAllcoin"]),
  },
  mounted() {
    this.drawChart(this.tradeAllcoin[0][1], this.tradeAllcoin[0]);
  },
  // 0:"0.09" // 퍼센트
  // 1:"KRW-BTC" // 영어이름
  // 2:"RISE" // 상승 하락 체크
  // 3:"비트코인" // 한국어 이름
  // 4:"11,530,000" // 코인 가격
  // 5:"10,000" //
  methods: {
    drawChart(eng, coinInfo) {
      if (this.total != []) {
        this.total = [];
        this.find = false;
      }
      axios
        .get(
          "https://api.upbit.com/v1/candles/days?market=" + eng + "&count=70"
        )
        .then((res) => {
          this.find = true;
          this.coinInfo = coinInfo;
          for (var i = 0; i < res.data.length; i++) {
            this.total.push([
              res.data[i].candle_date_time_kst,
              res.data[i].opening_price,
              res.data[i].high_price,
              res.data[i].low_price,
              res.data[i].trade_price,
            ]);
          }
          // console.log(this.total)
          console.log(eng);
          console.log(coinInfo);
        });
    }, // drawChart 함수 끝
    noNeedLogin() {
      this.loginCheck = false;
      var element = document.getElementsByClassName("yes");
      element[0].classList.add("first");
      var element2 = document.getElementsByClassName("no");
      for (var i = 0; i < element2.length; i++) {
        element2[i].classList.remove("first");
      }
    },
    needLogin(index) {
      this.loginCheck = true;
      var firstElement = document.getElementsByClassName("yes");
      console.log(firstElement);
      firstElement[0].classList.remove("first");
      var element = document.getElementsByClassName("no");
      for (var i = 0; i < element.length; i++) {
        element[i].classList.remove("first");
      }
      element[index].classList.add("first");
    },
  }, // methods 함수 끝
};
</script>

<style scoped>
@import "../../assets/css/bitcointrade.css";
</style>
