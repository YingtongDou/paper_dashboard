<script>
  import { onDestroy, onMount } from "svelte";
  import * as echarts from "echarts";

  export let option;
  export let height = "320px";

  let el;
  let chart;
  let resizeObserver;

  function render() {
    if (!el) return;
    if (!chart) {
      chart = echarts.init(el, null, { renderer: "canvas" });
    }
    if (option) {
      chart.setOption(option, true);
    }
  }

  onMount(() => {
    render();
    resizeObserver = new ResizeObserver(() => {
      chart?.resize();
    });
    resizeObserver.observe(el);
  });

  $: if (chart && option) {
    chart.setOption(option, true);
  }

  onDestroy(() => {
    resizeObserver?.disconnect();
    chart?.dispose();
  });
</script>

<div bind:this={el} style={`width:100%;height:${height};`}></div>
