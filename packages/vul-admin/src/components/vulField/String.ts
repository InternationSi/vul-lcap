/*
 * @Author: sfy
 * @Date: 2022-10-13 23:17:13
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-16 14:08:58
 * @FilePath: /vulture/packages/vul-admin/src/components/vulField/String.tsx
 * @Description: update here
 */
import { h, resolveComponent, defineComponent } from "vue";

export default defineComponent({
  props: ["modelValue"],
  emits: ["update:modelValue"],
  render() {
    return h(resolveComponent("VxeInput"), {
      modelValue: this.modelValue,
      "onUpdate:modelValue": (value: any) =>
        this.$emit("update:modelValue", value),
    });
  },
});
