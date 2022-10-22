/*
 * @Author: sfy
 * @Date: 2022-10-22 22:59:55
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-22 23:05:13
 * @FilePath: /vulture/src/designer/layout/components/leftDash/effect/useDrawVisi.ts
 * @Description: update here
 */
import { defineComponent, ref } from "vue";

const useDrawVisi = () => {
  const drawerShow = ref(false);
  const openDrawer = () => {
    drawerShow.value = !drawerShow.value;
  };
  const closeDrawer = () => {
    drawerShow.value = false;
  };

  return {
    drawerShow,
    openDrawer,
    closeDrawer
  };
};

export default useDrawVisi;
