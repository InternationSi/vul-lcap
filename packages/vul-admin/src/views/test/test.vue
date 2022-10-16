<!--
 * @Author: sfy
 * @Date: 2022-10-13 21:26:04
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-15 23:52:41
 * @FilePath: /vulture/packages/vul-admin/src/views/test/test.vue
 * @Description: update here
-->
<template>
  <div>
    <VulTable />
    <VulForm />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import VulTable from "@/components/vulTable/index";
import VulForm from "@/components/vulForm";
import { moduleFind } from "@/request";
export default defineComponent({
  components: { VulTable, VulForm },
});
</script>
