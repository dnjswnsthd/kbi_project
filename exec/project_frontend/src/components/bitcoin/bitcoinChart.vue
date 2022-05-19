<template>
  <div>
    <div
      class="RISE"
      v-if="this.coinInfo[2] == 'RISE' || this.coinInfo[2] == 'EVEN'"
      v-bind:class="{ up: this.coinInfo[2] == 'RISE' }"
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
.coinTitle {
  font-size: 18px;
  padding: 1.3%;
  color: black;
  border-bottom: 1px solid #d4d6dc;
}

#coinInfo {
  display: flex;
  margin-left: 1%;
}

.nowPrice {
  padding: 1%;
  width: 40%;
}

.startPrice {
  width: 60%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 2%;
  font-size: 14px;
}

.startDetailPrice {
  width: 40%;
  text-align: right;
  margin-left: 7%;
  display: flex;
}

.upLine {
  border-bottom: 1px solid #d5d6dc;
}

.downLine {
  padding-top: 1%;
}

.priceName {
  width: 50%;
  text-align: left;
}

.priceKind {
  width: 50%;
  text-align: right;
}

.black {
  color: black;
  font-size: 12px;
}

.small {
  font-size: 13px;
  color: #999;
}

.up {
  color: #d60000;
  font-weight: bold;
}

.down {
  color: #0051c7;
  font-weight: bold;
}

.normal {
  color: black;
}

.coinPrice {
  font-size: 30px;
}
.kind {
  font-size: 18px;
  margin-left: 0.5%;
}

.chart {
  margin-top: 5%;
}
</style>
