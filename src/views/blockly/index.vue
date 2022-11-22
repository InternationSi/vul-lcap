<!--
 * @Author: sfy
 * @Date: 2022-11-21 22:42:36
 * @LastEditors: sfy
 * @LastEditTime: 2022-11-22 22:11:56
 * @FilePath: /vulture/src/views/blockly/index.vue
 * @Description: update here
-->

<template>
  <el-row style="height: 100%">
    <el-col :span="18">
      <div id="blockly-div"></div>
    </el-col>
    <el-col :span="6">
      <div id="code-box">
        <el-button type="primary" @click="getSchemaJson">获取json</el-button>
        <code>
          {{ codeValue }}
        </code>
        <div></div>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { javascriptGenerator } from "blockly/javascript";
import Blockly from "blockly";
import { demoList } from "./consts";

const workspace = ref<any>();
const codeValue = ref<any>();

const toolbox = {
  // kind，分类，categoryToolbox 为分类工具箱
  kind: "categoryToolbox",
  contents: [
    {
      // kind，分类，category 为某个分类
      kind: "category",
      // 该分类的名字
      name: "逻辑判断",
      // 该分类的颜色
      colour: "red",
      contents: [
        {
          kind: "block",
          type: "controls_if"
        }
      ]
    },
    {
      kind: "category",
      name: "循环",
      colour: "green",
      contents: [
        {
          kind: "block",
          type: "controls_whileUntil"
        }
      ]
    },
    {
      kind: "category",
      name: "人物",
      colour: "#bb2241",
      contents: [
        // 工具箱引入，type 为自定义块对象的类型名称，比如 Luffy、Location 等
        {
          kind: "block",
          type: "Luffy"
        },
        {
          kind: "block",
          type: "Location"
        },
        {
          kind: "block",
          type: "Speak"
        }
      ]
    }
  ]
};
const updateCode = () => {
  codeValue.value = javascriptGenerator.workspaceToCode(workspace.value);
  console.log(codeValue.value);
};
const getSchemaJson = () => {
  // const xml = Blockly.serialization.workspaces.save(workspace.value);
  console.log(codeValue.value, "codeValue");
  const loadJs = new Function("context", codeValue.value);
  const result = loadJs({});
  console.log(result, "resultresult");
};

onMounted(() => {
  // 注入到 blockly-div 中
  workspace.value = Blockly.inject("blockly-div", {
    toolbox: toolbox
  });

  // 为工作区添加修改事件，触发调用 updateCode 函数
  workspace.value.addChangeListener(updateCode);
  Blockly.defineBlocksWithJsonArray(demoList);

  // 以 Location 块为例
  javascriptGenerator["Luffy"] = function (block: any) {
    return `const list = [];`;
  };
  javascriptGenerator["Location"] = function (block: any) {
    let argument0 = block.getFieldValue("location");
    return `list.push('${argument0}');`;
  };
  javascriptGenerator["Speak"] = function (block: any) {
    return `console.log(list);return list;`;
  };
});
</script>

<style scoped>
#blockly-div {
  width: 100%;
  height: 100%;
}

#code-box {
  height: 100%;
  border: 1px solid #c6c6c6;
}
</style>
