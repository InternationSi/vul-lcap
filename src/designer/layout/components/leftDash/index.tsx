/*
 * @Author: sfy
 * @Date: 2022-10-22 22:24:41
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-23 15:33:49
 * @FilePath: /vulture/src/designer/layout/components/leftDash/index.tsx
 * @Description: update here
 */
import { defineComponent, ref, getCurrentInstance } from "vue";
import Drawer from "../drawer";
import useDrawVisi from "./effect/useDrawVisi";
import MaterialPanel from "../MaterialPanel";
export default defineComponent({
  components: { Drawer, MaterialPanel },
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
        <Drawer
          class="GSAP_DRAWBOX"
          v-show={drawerShow.value}
          closeDrawer={closeDrawer}
        >
          <MaterialPanel />
        </Drawer>
      </>
    );
  }
});
