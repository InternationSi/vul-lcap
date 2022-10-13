<!--
 * @Author: sfy
 * @Date: 2022-10-13 15:00:27
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-13 15:00:27
 * @FilePath: /vulture/packages/vul-admin/src/views/grid/grid.vue
 * @Description: update here
-->
<!--
 * @Author: sfy
 * @Date: 2022-10-13 13:51:18
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-13 14:47:42
 * @FilePath: /vulture/packages/vul-admin/src/views/grid/grid.vue
 * @Description: update here
-->
<template>
  <div>
    <grid-layout
      :layout="layout"
      :col-num="12"
      :row-height="30"
      :is-draggable="draggable"
      :is-resizable="resizable"
      :vertical-compact="true"
      :use-css-transforms="true"
    >
      <grid-item
        v-for="(item, index) in layout"
        :key="index"
        :static="item.static"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
      >
        <span class="text">{{ itemTitle(item) }}</span>
      </grid-item>
    </grid-layout>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    return {};
  },
  data() {
    return {
      layout: [
        { x: 0, y: 0, w: 2, h: 2, i: "0", static: false },
        { x: 2, y: 0, w: 2, h: 4, i: "1", static: true },
        { x: 4, y: 0, w: 2, h: 5, i: "2", static: false },
        { x: 6, y: 0, w: 2, h: 3, i: "3", static: false },
        { x: 8, y: 0, w: 2, h: 3, i: "4", static: false },
        { x: 10, y: 0, w: 2, h: 3, i: "5", static: false },
        { x: 0, y: 5, w: 2, h: 5, i: "6", static: false },
        { x: 2, y: 5, w: 2, h: 5, i: "7", static: false },
        { x: 4, y: 5, w: 2, h: 5, i: "8", static: false },
        { x: 6, y: 3, w: 2, h: 4, i: "9", static: true },
        { x: 8, y: 4, w: 2, h: 4, i: "10", static: false },
        { x: 10, y: 4, w: 2, h: 4, i: "11", static: false },
        { x: 0, y: 10, w: 2, h: 5, i: "12", static: false },
        { x: 2, y: 10, w: 2, h: 5, i: "13", static: false },
        { x: 4, y: 8, w: 2, h: 4, i: "14", static: false },
        { x: 6, y: 8, w: 2, h: 4, i: "15", static: false },
        { x: 8, y: 10, w: 2, h: 5, i: "16", static: false },
        { x: 10, y: 4, w: 2, h: 2, i: "17", static: false },
        { x: 0, y: 9, w: 2, h: 3, i: "18", static: false },
        { x: 2, y: 6, w: 2, h: 2, i: "19", static: false },
      ],
      draggable: true,
      resizable: true,
      index: 0,
    };
  },
  methods: {
    itemTitle(item: any) {
      let result = item.i;
      if (item.static) {
        result += " - Static";
      }
      return result;
    },
  },
});
</script>
