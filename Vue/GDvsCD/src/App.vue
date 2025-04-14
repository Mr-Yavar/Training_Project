<template>
  <VChart class="chart" :option="option.opt" />
  <div style="text-align: center">
    {{
      "learning rate: " +
      option.R +
      "  || Time execution GD:" +
      option.gdTiming +
      "  CD:" +
      option.cdTiming
    }}
  </div>
  <input
    style="display: block; width: 100%"
    type="range"
    v-model="R"
    :max="max"
    step="0.000000000001"
    :min="min"
  />
  {{  R }}

  <div style="display: flex; justify-content: space-between;">
    <input type="number" v-model="min"/>
    <input type="number" v-model="step"/>

    <input type="number" v-model="max"/>

  </div>
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
import debounce from "lodash.debounce";

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
const option = ref({ opt: {} });

const R = ref(0.0000000001);
const min = ref(0);
const max = ref(0.5);
const step = ref(0.0000001);


watch(
  R,
  debounce(async () => {
    const req = await fetch(
      "https://localhost:7256/Calc/Get?eta=" + Number(R.value) + "&numIter=500",
      {
        method: "GET",
      }
    );

    const data = await req.text();

    const res = JSON.parse(data);

    option.value.R = R.value;
    option.value.gdTiming = res.gd.timing + "ms";
    option.value.cdTiming = res.cd.timing + "ms";

    option.value.opt = {
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
            width: 4,
            color: "red",
          },
          symbolSize: 0.1,
          data: res.gd.costHistory.map((x, i) => [i, x]),
        },
        {
          name: "CD",
          type: "line",
          lineStyle: {
            width: 4,
            color: "black",
          },
          symbolSize: 0.1,
          data: res.cd.costHistory.map((x, i) => [i, x]),
        },
      ],
    };

    return {};
  }, 500)
);
</script>

<style scoped>
.chart {
  height: 400px;
}
</style>
