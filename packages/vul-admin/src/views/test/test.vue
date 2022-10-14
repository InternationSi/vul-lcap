<!--
 * @Author: sfy
 * @Date: 2022-10-13 21:26:04
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-14 23:17:35
 * @FilePath: /vulture/packages/vul-admin/src/views/test/test.vue
 * @Description: update here
-->
<template>
  <div>
    <VulTable />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import VulTable from "@/components/vulTable/index";
import { moduleFind } from "@/request";
export default defineComponent({
  components: { VulTable },
  setup() {
    onMounted(async () => {
      const res = await moduleFind("111", "sam66");
      console.log(res, "----");
    });
    return {};
  },
});
</script>
