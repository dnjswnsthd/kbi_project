<template>
  <div>
    <div
      class="RISE"
      v-if="this.coinInfo[2] == 'RISE' || this.coinInfo[2] == 'EVEN'"
      v-bind:class="{ up: this.coinInfo[2] == 'RISE' }"
    >
      <div class="coinTitle">
        <span class="mainTitle">{{ this.coinInfo[3] }}</span>
        <span class="small">{{ coinInfo[1] }}</span>
      </div>

      <div id="coinInfo">
        <div class="nowPrice">
          <span class="coinInfoPrice">{{ this.coinInfo[4] }}</span>
          <span class="kind">krw</span> <br />
          <span class="better">전일 대비</span>
          <span class="calc">+{{ this.coinInfo[0] }}%</span>
          <span class="point" v-if="coinInfo[5].length < 3"
            >▲{{ this.coinInfo[5] }}.00</span
          >
          <span class="point" v-if="coinInfo[5].length >= 3"
            >▲{{ this.coinInfo[5] }}</span
          >
        </div>

        <div class="startPrice">
          <div class="startDetailPrice upLine">
            <div class="normal priceName">고가</div>
            <div class="priceKind up">
              {{
                StartPrice[2].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }}
            </div>
          </div>
          <div class="startDetailPrice upLine">
            <div class="normal priceName">시작</div>
            <div class="priceKind normal">
              {{
                StartPrice[1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }}
            </div>
          </div>
          <div class="startDetailPrice downLine">
            <div class="normal priceName">저가</div>
            <div class="priceKind down">
              {{
                StartPrice[3].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }}
            </div>
          </div>
          <div class="startDetailPrice downLine">
            <div class="normal priceName">종가</div>
            <div class="priceKind normal">
              {{
                StartPrice[4].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }}
            </div>
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
        <span class="mainTitle">{{ this.coinInfo[3] }}</span>
        <span class="small">{{ coinInfo[1] }}</span>
      </div>

      <div id="coinInfo">
        <div class="nowPrice">
          <span class="coinInfoPrice">{{ this.coinInfo[4] }}</span
          ><span class="kind">krw</span> <br />
          <span class="better">전일 대비</span>
          <span class="calc">-{{ this.coinInfo[0] }}%</span>
          <span class="point" v-if="coinInfo[5].length < 3"
            >▼{{ this.coinInfo[5] }}.00</span
          >
          <span class="point" v-if="coinInfo[5].length >= 3"
            >▼{{ this.coinInfo[5] }}</span
          >
        </div>

        <div class="startPrice">
          <div class="startDetailPrice upLine">
            <div class="normal priceName">고가</div>
            <div class="priceKind up">
              {{
                StartPrice[2].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }}
            </div>
          </div>
          <div class="startDetailPrice upLine">
            <div class="normal priceName">시작</div>
            <div class="priceKind normal">
              {{
                StartPrice[1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }}
            </div>
          </div>
          <div class="startDetailPrice downLine">
            <div class="normal priceName">저가</div>
            <div class="priceKind down">
              {{
                StartPrice[3].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }}
            </div>
          </div>
          <div class="startDetailPrice downLine">
            <div class="normal priceName">종가</div>
            <div class="priceKind normal">
              {{
                StartPrice[4].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="chart">
      <apexchart
        type="candlestick"
        width="150%"
        height="80%"
        border-radius="1px solid black"
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
        xaxis: {
          type: "datetime",
          labels: {
            style: {
              fontSize: "1vh",
            },
          },
        },
        yaxis: {
          tooltip: {
            enabled: false,
          },
          labels: {
            style: {
              fontSize: "1vh",
              fontWeight: "600",
            },
            formatter: function (val) {
              return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            },
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
