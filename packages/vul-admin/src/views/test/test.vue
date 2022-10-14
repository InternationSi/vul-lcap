<!--
 * @Author: sfy
 * @Date: 2022-10-13 21:26:04
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-13 21:28:30
 * @FilePath: /vulture/packages/vul-admin/src/views/test/test.vue
 * @Description: update here
-->
<template>
  <div>
    <VulTable />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import VulTable from "@/components/vulTable/index";
export default defineComponent({
  components: { VulTable },
  setup() {
    return {};
  },
});
</script>
