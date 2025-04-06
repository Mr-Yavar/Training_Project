<template>
  <VChart class="chart" :option="option.opt" />

  <input
    style="display: block; width: 100%"
    type="range"
    v-model="R"
    max="1"
    step="0.0001"
    min="0"
  />

  {{ R }}
{{ t }}
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
const option = ref({opt:{}});
const t = computed(async () => {
  const req = await fetch("http://localhost:3000/api/calculate/" + R.value, {
    method: "GET",
  });

  const data = await req.text();


  const res = JSON.parse(data);
  


  option.value.opt= {
    title: {
      left: "center",
    },
    legend: {
      show: true,
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
        data: res.GD.map((x, i) => [i, x]),
      },
      {
        name: "CD",
        type: "line",
        lineStyle: {
          width: 1,
        },
        symbolSize: 0.1,
        data: res.CD.map((x, i) => [i, x]),
      },
    ],
  };

  return {};
});

const R = ref(0.0001);
</script>

<style scoped>
.chart {
  height: 400px;
}
</style>
