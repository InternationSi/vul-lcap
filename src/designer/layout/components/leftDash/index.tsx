/*
 * @Author: sfy
 * @Date: 2022-10-22 22:24:41
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-30 23:13:10
 * @FilePath: /vulture/src/designer/layout/components/leftDash/index.tsx
 * @Description: update here
 */
import { defineComponent, ref, getCurrentInstance, Ref } from "vue";
import { createUseStyles } from "vue-jss";
import Drawer from "../drawer";
import useDrawVisi from "./effect/useDrawVisi";
import MaterialPanel from "../MaterialPanel";
import useEditorVisi from "./effect/useEditorVisi";
import Editor from "./components/Editor";
import { useSchemaStore } from "@/store/gridSchema";

const toJson = (params: any) => {
  return JSON.stringify(params, null, 2); // 保留格式的json转换
};

const schema = {
  // schema规则
  type: "string"
};

const useStyles = createUseStyles({
  // 写样式
  editor: {
    height: "100%"
  }
});

export default defineComponent({
  components: { Drawer, MaterialPanel },
  setup() {
    const schemaStore = useSchemaStore();

    const { drawerShow, openDrawer, closeDrawer } = useDrawVisi();
    const { editDrawerShow, openEditDrawer, closeEditDrawer } = useEditorVisi();

    const schemaRef: Ref<any> = ref(schema); // 取得响应式的schema
    const handleCodeChange = (code: string) => {
      // 当在页面修改了code后会触发
      let schema: any;
      try {
        schema = eval(code); // 转换回来
        // eslint-disable-next-line no-empty
      } catch (e) {}
      schemaRef.value = schema; // 转换回来
    };

    schemaStore.$subscribe(
      (mutation, state) => {
        schemaRef.value = state.schema;
      },
      { detached: true }
    );
    const classesRef = useStyles(); // 初始化

    return () => {
      const classes = classesRef.value;
      const code = toJson(schemaRef.value);

      return (
        <>
          <el-menu default-active="0" collapse={true}>
            <el-menu-item index="1" onClick={openDrawer}>
              <el-icon>
                <notification />
              </el-icon>
            </el-menu-item>
            <el-menu-item index="2">
              <el-icon>
                <setting />
              </el-icon>
            </el-menu-item>
            <el-menu-item index="3" onClick={openEditDrawer}>
              <el-icon>
                <more-filled />
              </el-icon>
            </el-menu-item>
          </el-menu>
          <Drawer
            class="GSAP_DRAWBOX"
            v-show={drawerShow.value}
            closeDrawer={closeDrawer}
          >
            <MaterialPanel />
          </Drawer>
          <el-drawer
            v-model={editDrawerShow.value}
            title="scheme"
            direction="rtl"
            size="60%"
          >
            <Editor
              code={code}
              onChange={handleCodeChange}
              title=""
              class={classes.editor}
            />
          </el-drawer>
        </>
      );
    };
  }
});
