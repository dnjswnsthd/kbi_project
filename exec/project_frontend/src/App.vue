<template>
  <v-app>
    <router-view name="header"></router-view>
    <v-divider class="divider"></v-divider>
    <div id="main">
      <div class="">
        <loadingPage v-if="loaded == false"></loadingPage>
      </div>
      <div class="">
        <start v-if="linkCheck == false && loaded == true"></start>
      </div>
      <transition v-if="linkCheck == true" name="component-fade" mode="out-in">
        <router-view></router-view>
      </transition>
    </div>
  </v-app>
</template>

<script>
import start from "./views/Start.vue";
import loadingPage from "./views/bitcoin/BitcoinLoading.vue";
import { createNamespacedHelpers } from "vuex";
const bitcoinData = createNamespacedHelpers("bitcoin");

export default {
  name: "App",
  components: {
    // eslint-disable-next-line vue/no-unused-components
    start: start,
    loadingPage: loadingPage,
  },
  data() {
    return {
      loadingIcon: require("@/assets/images/loading.gif"),
      loadingDialog: false,
      token: "",
      linkCheck: false,
    };
  },
  computed: {
    ...bitcoinData.mapState([
      "allCoinEnglishName",
      "allCoinKoreaName",
      "coinCheck",
      "coinPrice",
      "coinChange",
      "loaded",
      "tradeAllcoin",
    ]),
  },
  methods: {
    ...bitcoinData.mapActions(["allData"]),
  },
  mounted() {
    this.allData();
  },
};
</script>
<style>
@import "./assets/css/reset.css";

.component-fade-enter-active,
.component-fade-leave-active {
  transition: opacity 0.3s ease;
}
.component-fade-enter, .component-fade-leave-to
/* .component-fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
