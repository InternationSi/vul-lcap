<!--
 * @Author: sfy
 * @Date: 2022-12-18 22:13:37
 * @LastEditors: sfy
 * @LastEditTime: 2022-12-18 22:17:16
 * @FilePath: /vulture/src/views/PageView/PageView.vue
 * @Description: update here
-->
<template>
  <Render v-bind:model-value="layoutValue" />
</template>

<script setup lang="ts">
import { defineComponent } from "vue";
import Render from "@/designer/render";
const shcema = localStorage.getItem("pageSchema");
console.log(shcema, "shcema");
const layoutValue = JSON.parse(shcema || "");
</script>
