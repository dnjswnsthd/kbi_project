<template>
  <div id="ALL">
    <div class="mainBackground">
      <div class="mainBackgroundContent">
        <h1>가장 신뢰받는 글로벌 표준 디지털 자산 거래소</h1>
        <p class="">
          안전하고 투명한 시스템으로 빠르고 편리한 거래 환경을 제공합니다.
        </p>

        <div class="coinNumber">
          <div class="coin">
            <span class="blue">{{ allCoinEnglishName.length }}</span
            ><br />
            <span class="gray left">Coins</span>
          </div>
          <div class="market">
            <span class="blue">{{ allCoin }}</span
            ><br />
            <span class="gray right">Markets</span>
          </div>
        </div>
      </div>

      <img src="../assets/mainBackground.png" />
    </div>

    <div class="warning">
      <img src="../assets/mainWarning.png" />
    </div>

    <div class="total">
      <div class="korea">
        <div class="coinName">
          <span>KOSPI</span>
          <p class="coinDetail">trade Kospi Index</p>
        </div>

        <div class="coinInfo">
          <span class="up" v-if="koreaCheck === '상승'">
            <span class="coinPrice">{{ koreaPrice }}</span> <br />
            <span class="coinPercent">
              ▲ {{ koreaChange }} +({{ koreaPercent }}%)
            </span>
          </span>

          <span class="down" v-else-if="koreaCheck === '하락'">
            <span class="coinPrice">{{ koreaPrice }}</span> <br />
            <span class="coinPercent">
              ▼ {{ koreaChange }} -({{ koreaPercent }}%)
            </span>
          </span>
        </div>
      </div>

      <div class="america">
        <div class="coinName">
          <span>NASDAQ</span>
          <p class="coinDetail">trade Nasdaq Index</p>
        </div>

        <span class="up" v-if="americaCheck === '상승'">
          <span class="coinPrice">{{ americaPrice }}</span> <br />
          <span class="coinPercent">
            ▲ {{ americaChange }} +({{ americaPercent }}%)
          </span>
        </span>

        <span class="down" v-else-if="americaCheck === '하락'">
          <span class="coinPrice">{{ americaPrice }}</span> <br />
          <span class="coinPercent">
            ▼ {{ americaChange }} -({{ americaPercent }}%)
          </span>
        </span>
      </div>

      <div class="bit">
        <div class="coinName">
          <span>BITCOIN</span>
          <p class="coinDetail">trade Bitcoin Index</p>
        </div>

        <div class="coinInfo">
          <span class="up" v-if="bitCheck === 'RISE'">
            <span class="coinPrice">{{ bitPrice }}</span> <br />
            <span class="coinPercent">
              ▲ {{ bitChange }} +({{ bitPercent }}%)
            </span>
          </span>

          <span class="down" v-else-if="bitCheck === 'FALL'">
            <span class="coinPrice">{{ bitPrice }}</span> <br />
            <span class="coinPercent">
              ▼ {{ bitChange }} -({{ bitPercent }}%)
            </span>
          </span>
        </div>
      </div>
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
      signup: require("@/assets/images/header/sign-up.png"),
      login: require("@/assets/images/header/login.png"),
    };
  },
  computed: {
    ...tradeData.mapState([
      "tradeLoaded",
      "koreaPrice",
      "koreaChange",
      "koreaCheck",
      "koreaPercent",

      "americaPrice",
      "americaChange",
      "americaCheck",
      "americaPercent",

      "bitPrice",
      "bitChange",
      "bitCheck",
      "bitPercent",
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
    ...tradeData.mapActions(["koreaData", "americaData", "bitCoin"]),
  },

  mounted() {
    this.koreaData();
    this.americaData();
    this.bitCoin();
  },
};
</script>

<style scoped>
@import "./../assets/css/start.css";
</style>
