/*
 * @Author: sfy
 * @Date: 2022-10-22 21:34:52
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-22 22:51:22
 * @FilePath: /vulture/src/designer/layout/index.tsx
 * @Description: update here
 */
import { defineComponent, ref } from "vue";
import Grid from "../grid";
import leftDash from "./components/leftDash";
import "./index.less";

export default defineComponent({
  components: { Grid, Notification, leftDash },
  setup() {
    return () => (
      <div class="common-layout">
        <el-container>
          <el-header class="main-head"></el-header>
          <el-container class="main-layout">
            <el-aside width="70px">
              <leftDash />
            </el-aside>
            <el-main>
              <Grid />
            </el-main>
          </el-container>
        </el-container>
      </div>
    );
  }
});
