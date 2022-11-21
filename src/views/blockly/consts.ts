/*
 * @Author: sfy
 * @Date: 2022-11-21 23:21:08
 * @LastEditors: sfy
 * @LastEditTime: 2022-11-21 23:23:02
 * @FilePath: /vulture/src/views/blockly/consts.ts
 * @Description: update here
 */

const Luffy = {
  // type 为自定义块的类型名称
  "type": "Luffy",
  // message0 为该块显示的文字，%1 为第一个参数，如果有第二个参数为 %2，以此类推
  "message0": "人物：%1",
  // args0 参数，支持多个
  "args0": [
    {
      // 字段类型，field_image 为图片
      "type": "field_image",
      // 图片地址
      "src": "static/luffy.jpeg",
      // 图片宽、高、alt
      "width": 16,
      "height": 16,
      "alt": "luffy"
    }
  ],
  // 块颜色
  "colour": "#bb2241",
  // 块是否支持后续连接，null 表示任何类型都可以连接，也可指定连接类型
  "nextStatement": null,
  // 块 tips 提示
  "tooltip": "Luffy tips"
}

const Location = {
  "type": "Location",
  "message0": "地点：%1",
  "args0": [
    {
      // 字段类型，field_dropdown 为下拉菜单
      "type": "field_dropdown",
      // 字段名
      "name": "location",
      // 下拉选项，item[0] 为显示内容，item[1] 为对于 value 值
      "options": [
        ["司法岛", "EniesLobby.png"],
        ["水之都", "WaterSeven.jpeg"]
      ]
    },
  ],
  "colour": "#9fff58",
  "nextStatement": null,
  // 块是否支持前置连接，null 表示任何类型都可以连接，也可指定连接类型
  "previousStatement": null,
  "tooltip": "Location tips"
}

const Speak = {
  "type": "Speak",
  "message0": "说话：%1",
  "args0": [
    {
      // 字段类型，field_input 为文本输入
      "type": "field_input",
      // 字段名
      "name": "content",
      // 默认内容
      "text": "",
    },
  ],
  "colour": "#de991a",
  "nextStatement": null,
  "previousStatement": null,
  "tooltip": "Speak tips"
}

export const  demoList = [Luffy,Location,Speak]