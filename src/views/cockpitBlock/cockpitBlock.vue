<script lang="ts">
import { defineComponent } from "vue";
import { onMounted, ref } from "vue";
import { Graph } from "@antv/x6";

export default defineComponent({
  setup() {
    onMounted(() => {
      graphFn;
    });
    const graphFn = () => {
      new Graph({
        container: document.getElementById("container") as
          | HTMLElement
          | undefined,
        width: 800,
        height: 600,
        background: {
          color: "#fffff"
        },
        autoResize: true
      });
    };

    return { graphFn };
  }
});
</script>
<template>
  <div style="width=100%; height=100%">
    <div id="container"></div>
  </div>
</template>
<style></style>
