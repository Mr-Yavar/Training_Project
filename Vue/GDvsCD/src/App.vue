<template>
  {{ option?.R ?? "="}}
  <VChart class="chart" :option="option.opt" />

  <input
    style="display: block; width: 100%"
    
    type="range"
    v-model="R"
    max="0.00000001"
    step="0.000000001"
    min="0.00000000001"
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
import { ref, provide, computed, watch } from "vue";
import debounce from 'lodash.debounce'


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

const R = ref(0.0000000001);

watch(R, debounce(async () => {
  const req = await fetch("http://localhost:5000/Calc/Get?eta=" + Number(R.value)+"&numIter=500", {
    method: "GET",
  });

  const data = await req.text();


  const res = JSON.parse(data);
  

  option.value.R = R.value;
  option.value.opt= {
 
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
        data: res.gd.costHistory.map((x, i) => [i, x]),
      },
      // {
      //   name: "CD",
      //   type: "line",
      //   lineStyle: {
      //     width: 1,
      //   },
      //   symbolSize: 0.1,
      //   data: res.cd.costHistory.map((x, i) => [i, x]),
      // },
    ],
  };

  return {};
}, 500))


</script>

<style scoped>
.chart {
  height: 400px;
}
</style>
