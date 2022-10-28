/*
 * @Author: sfy
 * @Date: 2022-10-28 23:19:11
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-28 23:29:58
 * @FilePath: /vulture/src/designer/layout/components/leftDash/components/Editor.tsx
 * @Description: update here
 */
import { defineComponent, ref, watch, onUnmounted } from "vue";
import * as monaco from "monaco-editor";
import "./index.less";
export default defineComponent({
  setup() {
    onUnmounted(() => {
      monaco.editor.create(
        document!.getElementById("EDITOR_CONTINOR") as HTMLElement,
        {
          value: ["function x() {", '\tconsole.log("Hello world!");', "}"].join(
            "\n"
          ),
          language: "javascript"
        }
      );
    });

    return () => <div class="EDITOR_CONTINOR"></div>;
  }
});
