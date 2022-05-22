<template>
  <div>
    <div
      class="RISE"
      v-if="this.coinInfo[2] == 'RISE' || this.coinInfo[2] == 'EVEN'"
      v-bind:class="{ up: this.coinInfo[2] == 'RISE' }"
    >
      <div class="coinTitle">
        <Strong class="mainTitle">{{ this.coinInfo[3] }}</Strong>
        <span class="small">{{ coinInfo[1] }}</span>
      </div>

      <div id="coinInfo">
        <div class="nowPrice">
          <span class="coinPrice"
            ><strong>{{ this.coinInfo[4] }}</strong></span
          ><span class="kind">krw</span> <br />
          <span class="white black-text">전일 대비</span>
          <span>+{{ this.coinInfo[0] }}%</span>
          <span v-if="coinInfo[5].length < 3">▲{{ this.coinInfo[5] }}.00</span>
          <span v-if="coinInfo[5].length >= 3">▲{{ this.coinInfo[5] }}</span>
        </div>

        <div class="startPrice">
          <div class="startDetailPrice upLine">
            <div class="normal priceName">고가</div>
            <div class="priceKind up">{{ StartPrice[2] }}</div>
          </div>
          <div class="startDetailPrice upLine">
            <div class="normal priceName">시작</div>
            <div class="priceKind up">{{ StartPrice[1] }}</div>
          </div>
          <div class="startDetailPrice downLine">
            <div class="normal priceName">저가</div>
            <div class="priceKind down">{{ StartPrice[3] }}</div>
          </div>
          <div class="startDetailPrice downLine">
            <div class="normal priceName">종가</div>
            <div class="priceKind down">{{ StartPrice[4] }}</div>
          </div>
        </div>
      </div>
    </div>

    <div
      class="FALL"
      v-if="this.coinInfo[2] == 'FALL'"
      v-bind:class="{ down: this.coinInfo[2] == 'FALL' }"
    >
      <div class="coinTitle">
        <strong>{{ this.coinInfo[3] }}</strong>
        <span class="small">{{ coinInfo[1] }}</span>
      </div>

      <div id="coinInfo">
        <div class="nowPrice">
          <span class="coinPrice"
            ><strong>{{ this.coinInfo[4] }}</strong></span
          ><span class="kind">krw</span> <br />
          <span class="black">전일 대비</span>
          <span>-{{ this.coinInfo[0] }}%</span>
          <span v-if="coinInfo[5].length < 3">▼{{ this.coinInfo[5] }}.00</span>
          <span v-if="coinInfo[5].length >= 3">▼{{ this.coinInfo[5] }}</span>
        </div>

        <div class="startPrice">
          <div class="startDetailPrice upLine">
            <div class="normal priceName">고가</div>
            <div class="priceKind up">{{ StartPrice[2] }}</div>
          </div>
          <div class="startDetailPrice upLine">
            <div class="normal priceName">시작</div>
            <div class="priceKind up">{{ StartPrice[1] }}</div>
          </div>
          <div class="startDetailPrice downLine">
            <div class="normal priceName">저가</div>
            <div class="priceKind down">{{ StartPrice[3] }}</div>
          </div>
          <div class="startDetailPrice downLine">
            <div class="normal priceName">종가</div>
            <div class="priceKind down">{{ StartPrice[4] }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="chart">
      <apexchart
        type="candlestick"
        height="400"
        :options="chartOptions"
        :series="series"
      ></apexchart>
    </div>
  </div>
</template>

<script>
import VueApexCharts from "vue-apexcharts";
export default {
  name: "Chart",
  props: {
    total: {
      type: Array,
    },
    coinInfo: {
      type: Array,
    },
  },
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      StartPrice: this.total[0],
      // now: parseFloat(this.nowPrice[4].replace(",","")),
      // open: this.total[0][1],
      // change : (parseFloat(this.nowPrice[4].replace(",",""))-this.total[0][1]).toFixed(2),
      series: [
        {
          data: this.total,
        },
      ],

      chartOptions: {
        chart: {
          type: "candlestick",
          height: 350,
        },
        // title: {
        //   text: this.coinName,
        //   align: 'left'
        // },
        xaxis: {
          type: "datetime",
        },
        yaxis: {
          tooltip: {
            enabled: false,
          },
        },

        plotOptions: {
          candlestick: {
            colors: {
              upward: "#F63107", // 상향 캔들 색상
              downward: "#0587FA", // 하향 캔들 색상
            },
            wick: {
              useFillColor: true, // fasle == 검정색 테두리
            },
          },
        }, // plotOptions 끝
      }, // chartOptions 끝
    };
  },
};
</script>

<style scoped>
@import "../../assets/css/bitcoinChart.css";
</style>
