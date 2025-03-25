<template>
  <VChart class="chart" :option="option" v-memo="[R]" />

  <input
    style="display: block; width: 100%"
    type="range"
    v-model="R"
   max="1"
   step="0.0001"
    min="0"
  />

  {{ R }}
</template>

<script setup>
import { use } from "echarts/core";
import { CanvasRenderer, SVGRenderer } from "echarts/renderers";
import { LineChart, PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, provide, computed } from "vue";
import { gradientDescentLinearRegression, sequentialGradientDescentLinearRegression } from "./utils/Regression";

use([
  SVGRenderer,
  PieChart,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
]);

provide(THEME_KEY, "light");

const option = computed(() => ({
  title: {
    left: "center",
  },
  legend:{
show:true,
  },

  xAxis: {
    type: "value",
  },
  yAxis: {
    type: "value",
  },
  series: [
    {
      name: "GD",
      type: "line",
      lineStyle: {
        width: 1,
      },
      symbolSize: 0.1,
      data: gradientDescentLinearRegression(
        [[1,2], [2,3]],
        [1, 2],
        R.value,
        1000
      ).mseHistory.map((x, i) => [i, x]),
    },
    {
      name: "CD",
      type: "line",
      lineStyle: {
        width: 1,
       
      },
      symbolSize: 0.1,
      data: sequentialGradientDescentLinearRegression(
        [[1,2], [2,3]],
        [1, 2],
        R.value,
        1000
      ).mseHistory.map((x, i) => [i, x]),
    },
  ],
}));

const R = ref(0.0001);
</script>

<style scoped>
.chart {
  height: 400px;
}
</style>
