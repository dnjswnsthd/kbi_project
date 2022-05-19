<template>
  <div id="ALL">
    <div class="mainBackground">
      <div class="mainBackgroundContent">
        <div class="coinNumber">
          <!-- <div class="coin">
            <span class="blue">{{ allCoinEnglishName.length }}</span
            ><br />
            <span class="gray left">Coins</span>
          </div>
          <div class="market">
            <span class="blue">{{ allCoin }}</span
            ><br />
            <span class="gray right">Markets</span>
          </div> -->
        </div>
      </div>

      <img src="../assets/mainBackground.png" />
    </div>
    <div class="total">
      <div class="bit">
        <v-card class="mx-auto" max-width="600" style="border-radius: 2rem">
          <v-img
            src="../assets/images/coinLogo/bitcoin.png"
            class="coinLogoImg"
          ></v-img>
          <v-divider></v-divider>
          <v-card-title
            style="
              font-size: 4em;
              margin-top: 4%;
              margin-left: 5%;
              margin-bottom: 1%;
            "
          >
            Bitcoin
          </v-card-title>
          <v-card-subtitle style="font-size: 2em; margin-left: 5%"
            >비트코인(BTC/KRW)</v-card-subtitle
          >
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
          <v-spacer></v-spacer>
        </v-card>
      </div>
      <div class="bit">
        <v-card class="mx-auto" max-width="600" style="border-radius: 2rem">
          <v-img
            src="../assets/images/coinLogo/ethereum.png"
            class="coinLogoImg"
          ></v-img>
          <v-divider></v-divider>
          <v-card-title
            style="
              font-size: 4em;
              margin-top: 4%;
              margin-left: 5%;
              margin-bottom: 1%;
            "
          >
            Ethereum
          </v-card-title>
          <v-card-subtitle style="font-size: 2em; margin-left: 5%"
            >이더리움(ETH/KRW)</v-card-subtitle
          >
          <div class="coinInfo">
            <span class="up" v-if="ethCheck === 'RISE'">
              <span class="coinPrice">{{ ethPrice }}</span> <br />
              <span class="coinPercent">
                ▲ {{ ethChange }} +({{ ethPercent }}%)
              </span>
            </span>

            <span class="down" v-else-if="ethCheck === 'FALL'">
              <span class="coinPrice">{{ ethPrice }}</span> <br />
              <span class="coinPercent">
                ▼ {{ ethChange }} -({{ ethPercent }}%)
              </span>
            </span>
          </div>
          <v-spacer></v-spacer>
        </v-card>
      </div>
      <div class="bit">
        <v-card class="mx-auto" max-width="600" style="border-radius: 2rem">
          <v-img
            src="../assets/images/coinLogo/ripple.png"
            class="coinLogoImg"
          ></v-img>
          <v-divider></v-divider>
          <v-card-title
            style="
              font-size: 4em;
              margin-top: 4%;
              margin-left: 5%;
              margin-bottom: 2%;
            "
          >
            Ripple
          </v-card-title>
          <v-card-subtitle style="font-size: 2em; margin-left: 5%"
            >리플(XRP/KRW)</v-card-subtitle
          >
          <div class="coinInfo">
            <span class="up" v-if="xrpCheck === 'RISE'">
              <span class="coinPrice">{{ xrpPrice }}</span> <br />
              <span class="coinPercent">
                ▲ {{ xrpChange }} +({{ xrpPercent }}%)
              </span>
            </span>

            <span class="down" v-else-if="xrpCheck === 'FALL'">
              <span class="coinPrice">{{ xrpPrice }}</span> <br />
              <span class="coinPercent">
                ▼ {{ xrpChange }} -({{ xrpPercent }}%)
              </span>
            </span>
          </div>
          <v-spacer></v-spacer>
        </v-card>
      </div>
      <div class="bit">
        <v-card class="mx-auto" max-width="600" style="border-radius: 2rem">
          <v-img
            src="../assets/images/coinLogo/ada.png"
            class="coinLogoImg"
          ></v-img>
          <v-divider></v-divider>
          <v-card-title
            style="
              font-size: 4em;
              margin-top: 4%;
              margin-left: 5%;
              margin-bottom: 1%;
            "
          >
            Ada
          </v-card-title>
          <v-card-subtitle style="font-size: 2em; margin-left: 5%"
            >에이다(ADA/KRW)</v-card-subtitle
          >
          <div class="coinInfo">
            <span class="up" v-if="adaCheck === 'RISE'">
              <span class="coinPrice">{{ adaPrice }}</span> <br />
              <span class="coinPercent">
                ▲ {{ adaChange }} +({{ adaPercent }}%)
              </span>
            </span>

            <span class="down" v-else-if="adaCheck === 'FALL'">
              <span class="coinPrice">{{ adaPrice }}</span> <br />
              <span class="coinPercent">
                ▼ {{ adaChange }} -({{ adaPercent }}%)
              </span>
            </span>
          </div>
          <v-spacer></v-spacer>
        </v-card>
      </div>
      <div class="bit">
        <v-card class="mx-auto" max-width="600" style="border-radius: 2rem">
          <v-img
            src="../assets/images/coinLogo/solana.png"
            class="coinLogoImg"
          ></v-img>
          <v-divider></v-divider>
          <v-card-title
            style="
              font-size: 4em;
              margin-top: 4%;
              margin-left: 5%;
              margin-bottom: 1%;
            "
          >
            Solana
          </v-card-title>
          <v-card-subtitle style="font-size: 2em; margin-left: 5%"
            >솔라나(SOL/KRW)</v-card-subtitle
          >
          <div class="coinInfo">
            <span class="up" v-if="solCheck === 'RISE'">
              <span class="coinPrice">{{ solPrice }}</span> <br />
              <span class="coinPercent">
                ▲ {{ solChange }} +({{ solPercent }}%)
              </span>
            </span>

            <span class="down" v-else-if="solCheck === 'FALL'">
              <span class="coinPrice">{{ solPrice }}</span> <br />
              <span class="coinPercent">
                ▼ {{ solChange }} -({{ solPercent }}%)
              </span>
            </span>
          </div>
          <v-spacer></v-spacer>
        </v-card>
      </div>
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
