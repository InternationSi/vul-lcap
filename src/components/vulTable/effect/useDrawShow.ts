/*
 * @Author: sfy
 * @Date: 2022-10-16 21:44:00
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-16 21:46:45
 * @FilePath: /vulture/packages/vul-admin/src/components/vulTable/effect/useDrawShow.ts
 * @Description: update here
 */
import { ref } from "vue";
const useDrawShow = () => {
  const visible = ref<boolean>(false);

  const showDrawer = () => {
    visible.value = true;
  };

  const closeDrawer = () => {
    visible.value = false;
  };
  return {
    visible,
    showDrawer,
    closeDrawer,
  };
};
export default useDrawShow;
