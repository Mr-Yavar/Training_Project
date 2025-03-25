<template>
  <VChart class="chart" :option="option" />
  
  <input style="display: block;width: 100%" type="range" v-model="R" :max="Math.random()*1000" min="0"  />

  {{ R }}
</template>

<script setup>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, provide, computed } from "vue";
import { gradientDescentLinearRegression } from "./utils/Regression";

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent
]);

provide(THEME_KEY, "light");
console.log(gradientDescentLinearRegression([[1]],[1],0.0001,100));
const option = computed(()=>({
  title: {
    text: "Traffic Sources",
    left: "center"
  },
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c} ({d}%)"
  },
  legend: {
    orient: "vertical",
    left: "left",
    data: ["Direct", "Email", "Ad Networks", "Video Ads", "Search Engines"]
  },
  series: [
    {
      name: "Traffic Sources",
      type: "pie",
      radius: "55%",
      center: ["50%", "60%"],
      data: [
        { value: 335, name: "Direct" },
        { value: 310, name: "Email" },
        { value: 234, name: "Ad Networks" },
        { value: 135, name: "Video Ads" },
        { value: R.value, name: "Search Engines" }
      ],
     
    }
  ]
}));


const R = ref(0.0001);
</script>

<style scoped>
.chart {
  height: 400px;
}
</style>