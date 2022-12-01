<!--
 * @Author: sfy
 * @Date: 2022-11-30 23:03:28
 * @LastEditors: sfy
 * @LastEditTime: 2022-12-01 22:30:59
 * @FilePath: /vulture/src/designer/setter/index.vue
 * @Description: update here
-->
<template>
  <div>
    <el-row>
      <NumberSetter label="数字选择器" :value="0" />
    </el-row>
    <el-row>
      <StringSetter label="字符串选择器" value="" />
    </el-row>
    <el-row>
      <BoolSetter label="布尔值选择器" :value="true" />
    </el-row>
    <el-row>
      <JsonSetter label="Json选择器" :value="{}" />
    </el-row>
    <el-row>
      <DataMeta label="数据源" :value="[]" />
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import {
  NumberSetter,
  StringSetter,
  BoolSetter,
  JsonSetter,
  DataMeta
} from "./components";
</script>
