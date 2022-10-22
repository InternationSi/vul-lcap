/*
 * @Author: sfy
 * @Date: 2022-10-22 22:24:41
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-22 23:05:31
 * @FilePath: /vulture/src/designer/layout/components/leftDash/index.tsx
 * @Description: update here
 */
import { defineComponent, ref } from "vue";
import Drawer from "../drawer";
import useDrawVisi from "./effect/useDrawVisi";

export default defineComponent({
  components: { Drawer },
  setup() {
    const { drawerShow, openDrawer, closeDrawer } = useDrawVisi();

    return () => (
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
        </el-menu>
        <Drawer v-show={drawerShow.value} closeDrawer={closeDrawer} />
      </>
    );
  }
});
