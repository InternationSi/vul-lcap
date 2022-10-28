/*
 * @Author: sfy
 * @Date: 2022-10-28 23:14:02
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-28 23:16:30
 * @FilePath: /vulture/src/designer/layout/components/leftDash/effect/useEditorVisi.ts
 * @Description: update here
 */
import { defineComponent, ref } from "vue";

const useEditorVisi = () => {
  const editDrawerShow = ref(false);
  const openEditDrawer = () => {
    editDrawerShow.value = !editDrawerShow.value;
  };
  const closeEditDrawer = () => {
    editDrawerShow.value = false;
  };

  return {
    editDrawerShow,
    openEditDrawer,
    closeEditDrawer
  };
};

export default useEditorVisi;
