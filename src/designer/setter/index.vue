<!--
 * @Author: sfy
 * @Date: 2022-11-30 23:03:28
 * @LastEditors: sfy
 * @LastEditTime: 2022-11-30 23:16:33
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
    <el-row> </el-row>
  </div>
</template>

<script lang="ts" setup>
import {
  NumberSetter,
  StringSetter,
  BoolSetter,
  JsonSetter
} from "./components";
</script>
