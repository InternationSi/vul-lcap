/*
 * @Author: sfy
 * @Date: 2022-10-22 21:34:52
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-22 21:38:44
 * @FilePath: /vulture/src/designer/layout/index.tsx
 * @Description: update here
 */
import { defineComponent, ref } from "vue";

export default defineComponent({
  setup() {
    return () => (
      <div class="common-layout">
        <el-container>
          <el-header>Header</el-header>
          <el-container>
            <el-aside width="200px">Aside</el-aside>
            <el-main>Main</el-main>
          </el-container>
        </el-container>
      </div>
    );
  }
});
