<template>
  <div id="ALL">
    <div class="mainBackground">
      <img src="../assets/mainBackground.png" />
    </div>
    <div>
      <v-carousel cycle height="4vh" hide-delimiters show-arrows>
        <v-carousel-item v-for="(slide, i) in slides" :key="i">
          <v-sheet color="#2b2b2b" height="100%">
            <v-row class="fill-height" align="center" justify="center">
              <div class="slideText">{{ slide }}</div>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </div>
    <div class="total">
      <v-card class="card" style="border-radius: 2rem">
        <v-img
          src="../assets/images/coinLogo/bitcoin.png"
          class="coinLogoImg"
        ></v-img>
        <v-divider></v-divider>
        <v-card-title
          style="
            font-size: 1.5vmax;
            font-family: twayair;
            margin-top: 1%;
            margin-left: 5%;
            margin-bottom: 1%;
          "
        >
          Bitcoin
        </v-card-title>
        <v-card-subtitle
          style="font-size: 0.8vmax; margin-left: 5%; font-family: twayair"
          >비트코인(BTC/KRW)</v-card-subtitle
        >
        <div class="coinInfo">
          <span class="upPrice" v-if="bitCheck === 'RISE'">
            <span class="cPrice">{{ bitPrice }} 원</span>
            <br />
            <span class="coinPercent">
              ▲ {{ bitChange }} +({{ bitPercent }}%)
            </span>
          </span>

          <span class="downPrice" v-else-if="bitCheck === 'FALL'">
            <span class="cPrice">{{ bitPrice }}</span> <br />
            <span class="coinPercent">
              ▼ {{ bitChange }} -({{ bitPercent }}%)
            </span>
          </span>
        </div>
      </v-card>
      <v-card class="card" style="border-radius: 2rem">
        <v-img
          src="../assets/images/coinLogo/ethereum.png"
          class="coinLogoImg"
        ></v-img>
        <v-divider></v-divider>
        <v-card-title
          style="
            font-size: 1.5vmax;
            font-family: twayair;
            margin-top: 1%;
            margin-left: 5%;
            margin-bottom: 1%;
          "
        >
          Ethereum
        </v-card-title>
        <v-card-subtitle
          style="font-size: 0.8vmax; margin-left: 5%; font-family: twayair"
          >이더리움(ETH/KRW)</v-card-subtitle
        >
        <div class="coinInfo">
          <span class="upPrice" v-if="ethCheck === 'RISE'">
            <span class="cPrice">{{ ethPrice }} 원</span> <br />
            <span class="coinPercent">
              ▲ {{ ethChange }} +({{ ethPercent }}%)
            </span>
          </span>

          <span class="downPrice" v-else-if="ethCheck === 'FALL'">
            <span class="cPrice">{{ ethPrice }} 원</span> <br />
            <span class="coinPercent">
              ▼ {{ ethChange }} -({{ ethPercent }}%)
            </span>
          </span>
        </div>
      </v-card>
      <v-card class="card" style="border-radius: 2rem">
        <v-img
          src="../assets/images/coinLogo/ripple.png"
          class="coinLogoImg"
        ></v-img>
        <v-divider></v-divider>
        <v-card-title
          style="
            font-size: 1.5vmax;
            font-family: twayair;
            margin-top: 1%;
            margin-left: 5%;
            margin-bottom: 1%;
          "
        >
          Ripple
        </v-card-title>
        <v-card-subtitle
          style="font-size: 0.8vmax; margin-left: 5%; font-family: twayair"
          >리플(XRP/KRW)</v-card-subtitle
        >
        <div class="coinInfo">
          <span class="upPrice" v-if="xrpCheck === 'RISE'">
            <span class="cPrice">{{ xrpPrice }} 원</span> <br />
            <span class="coinPercent">
              ▲ {{ xrpChange }} +({{ xrpPercent }}%)
            </span>
          </span>

          <span class="downPrice" v-else-if="xrpCheck === 'FALL'">
            <span class="cPrice">{{ xrpPrice }} 원</span> <br />
            <span class="coinPercent">
              ▼ {{ xrpChange }} -({{ xrpPercent }}%)
            </span>
          </span>
        </div>
      </v-card>

      <v-card class="card" style="border-radius: 2rem">
        <v-img
          src="../assets/images/coinLogo/ada.png"
          class="coinLogoImg"
        ></v-img>
        <v-divider></v-divider>
        <v-card-title
          style="
            font-size: 1.5vmax;
            font-family: twayair;
            margin-top: 1%;
            margin-left: 5%;
            margin-bottom: 1%;
          "
        >
          Ada
        </v-card-title>
        <v-card-subtitle
          style="font-size: 0.8vmax; margin-left: 5%; font-family: twayair"
          >에이다(ADA/KRW)</v-card-subtitle
        >
        <div class="coinInfo">
          <span class="upPrice" v-if="adaCheck === 'RISE'">
            <span class="cPrice">{{ adaPrice }} 원</span> <br />
            <span class="coinPercent">
              ▲ {{ adaChange }} +({{ adaPercent }}%)
            </span>
          </span>

          <span class="downPrice" v-else-if="adaCheck === 'FALL'">
            <span class="cPrice">{{ adaPrice }} 원</span> <br />
            <span class="coinPercent">
              ▼ {{ adaChange }} -({{ adaPercent }}%)
            </span>
          </span>
        </div>
      </v-card>

      <v-card class="card" style="border-radius: 2rem">
        <v-img
          src="../assets/images/coinLogo/solana.png"
          class="coinLogoImg"
        ></v-img>
        <v-divider></v-divider>
        <v-card-title
          style="
            font-size: 1.5vmax;
            font-family: twayair;
            margin-top: 1%;
            margin-left: 5%;
            margin-bottom: 1%;
          "
        >
          Solana
        </v-card-title>
        <v-card-subtitle
          style="font-size: 0.8vmax; margin-left: 5%; font-family: twayair"
          >솔라나(SOL/KRW)</v-card-subtitle
        >
        <div class="coinInfo">
          <span class="upPrice" v-if="solCheck === 'RISE'">
            <span class="cPrice">{{ solPrice }} 원</span> <br />
            <span class="coinPercent">
              ▲ {{ solChange }} +({{ solPercent }}%)
            </span>
          </span>

          <span class="downPrice" v-else-if="solCheck === 'FALL'">
            <span class="cPrice">{{ solPrice }} 원</span> <br />
            <span class="coinPercent">
              ▼ {{ solChange }} -({{ solPercent }}%)
            </span>
          </span>
        </div>
      </v-card>
    </div>
    <div class="warning">
      <img src="../assets/mainWarning.png" />
    </div>
  </div>
</template>
<script>
import { moveLogin, moveSignUp } from "../api/move.js";
import { createNamespacedHelpers } from "vuex";
const tradeData = createNamespacedHelpers("trade");
const bitcoinData = createNamespacedHelpers("bitcoin");

export default {
  name: "Main",
  data() {
    return {
      show: false,
      signup: require("@/assets/images/header/sign-up.png"),
      login: require("@/assets/images/header/login.png"),
      slides: [
        "'유행을 타지 말 것, 투자는 패션이 아니다' \u00a0-\u00a0 벤자민 그레이엄(Benjamin Graham)",
        " '위험은 자신이 무엇을 하는지 모르는 데서 온다' \u00a0-\u00a0 워렌버핏(Warren Buffett) ",
        " '오늘의 투자자는 어제의 성장으로 수익을 내지 않는다' \u00a0-\u00a0 워렌버핏(Warren Buffett)",
        " '절대 시장을 이길려고 하지 말라. 이길려고 하면 할수록 큰 대가를 지불할 것이다.' \u00a0-\u00a0 제시 리버모어(Jesse Livermore)",
        " '10월은 주식투자에 특히 위험한 달 중 하나이다. 다른 위험한 달로는 7월, 1월, 9월, 4월, 11월, 5월, 3월, 6월, 12월, 8월, 그리고 2월이 있다. \u00a0-\u00a0 마크 트웨인(1835~1910)",
      ],
    };
  },
  computed: {
    ...tradeData.mapState([
      "tradeLoaded",

      "bitPrice",
      "bitChange",
      "bitCheck",
      "bitPercent",

      "ethPrice",
      "ethChange",
      "ethCheck",
      "ethPercent",

      "xrpPrice",
      "xrpChange",
      "xrpCheck",
      "xrpPercent",

      "adaPrice",
      "adaChange",
      "adaCheck",
      "adaPercent",

      "solPrice",
      "solChange",
      "solCheck",
      "solPercent",
    ]),
    ...bitcoinData.mapState(["allCoinEnglishName", "allCoin"]),
  },

  methods: {
    moveLogin() {
      moveLogin();
    },
    moveSignUp() {
      moveSignUp();
    },
    ...tradeData.mapActions(["bitCoin", "ethereum", "ripple", "ada", "solana"]),
  },

  mounted() {
    this.bitCoin();
    this.ethereum();
    this.ripple();
    this.ada();
    this.solana();
  },
};
</script>

<style scoped>
@import "./../assets/css/start.css";
</style>
