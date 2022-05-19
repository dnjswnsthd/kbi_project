<template>
  <div id="ALL">
    <div class="chart">
      <bitcoin-chart
        v-bind:coinInfo="coinInfo"
        v-bind:total="total"
        v-if="find === true"
      ></bitcoin-chart>
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
              <td class="coinName" style="width: 40%">
                <img
                  class="star"
                  src="../../assets/images/star.png"
                  style="width: 5%"
                />
                <a class="coinKoreaName" href="#">{{ coin[3] }}</a>
                <p class="coinEnglishName">{{ coin[1] }}</p>
              </td>

              <td class="coinPrice" v-bind:class="{ blue: coin[2] == 'FALL' }">
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
  // 0:"0.09" // 퍼센트
  // 1:"KRW-BTC" // 영어이름
  // 2:"RISE" // 상승 하락 체크
  // 3:"비트코인" // 한국어 이름
  // 4:"11,530,000" // 코인 가격
  // 5:"10,000" // 코인 변동폭
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
#ALL {
  display: flex;
  width: 100%;
  background-color: #e9ecf1;
}

.chart {
  background-color: white;
  width: 60%;
  min-height: 700px;
  margin-left: 5%;
  margin-top: 1%;
}

.coinType {
  background-color: white;
  width: 30%;
  max-height: 700px;
  margin-left: 1%;
  margin-top: 1%;
  overflow-x: hidden;
  overflow-y: scroll;
}

#coinTypeChoice {
  width: 100%;
  display: flex;
  border-top: 1px solid #d5d6dc;
  border-bottom: 1px solid #d5d6dc;
}

.choice {
  width: 20%;
  height: 40px;
  text-align: center;
  margin-top: 3%;
  color: #2b2b2b;
  text-decoration: none;
  font-weight: bold;
}

.first {
  border-bottom: 3px solid #115dcb;
  color: #115dcb;
}

.allCoin {
  width: 100%;
}

.coinTalble {
  width: 100%;
}

.standard {
  width: 100%;
  height: 30px;
  background-color: #f9fafc;
  color: #666;
  font-size: 11px;
}

.coinName {
  border-top: 1px solid #d5d6dc;
}

.coinKoreaName {
  text-decoration: none;
  color: black;
  font-weight: bold;
  font-size: 13px;
  text-align: center;
  margin-left: 10%;
}

.coinEnglishName {
  color: #666;
  font-size: 11px;
  text-align: left;
  margin-left: 25%;
}
.star {
  margin-left: 8%;
  margin-top: 5%;
}
.coinPrice {
  border-top: 1px solid #d5d6dc;
  width: 30%;
  text-align: center;
  font-size: 13px;
  font-weight: 600;
  color: #d60000;
}
.coinChange {
  border-top: 1px solid #d5d6dc;
  letter-spacing: 1px;
  padding-top: 3%;
  width: 15%;
  text-align: center;
  font-size: 12px;
  font-weight: 550;
  color: #d60000;
}
.coinFall {
  border-top: 1px solid #d5d6dc;
  letter-spacing: 0.7px;
  padding-top: 3%;
  width: 15%;
  color: #0051c7;
  text-align: center;
  font-size: 12px;
  font-weight: 550;
}
.changePrice {
  text-align: right;
  margin-right: 15%;
}

.blue {
  color: #0051c7;
}

.noLogin {
  margin-top: 30%;
  text-align: center;
  font-size: 12px;
  color: #999;
}

p {
  margin: 0px 0px 0px 0px;
  line-height: 120%;
}
table {
  border-spacing: 0px 0px 0px 0px;
}
</style>
