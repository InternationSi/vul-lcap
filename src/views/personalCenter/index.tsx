/*
 * @Author: sfy
 * @Date: 2022-11-16 21:46:12
 * @LastEditors: sfy
 * @LastEditTime: 2022-12-01 22:26:36
 * @FilePath: /vulture/src/views/personalCenter/index.tsx
 * @Description: update here
 */
import { defineComponent, ref, PropType } from 'vue';
import Style from "./index.module.scss";
export default defineComponent({
  props: {},
  
  setup(props) {
    return () =>
    <><div class={Style.box}>
      打击老子积极性
    </div>;
    <div class={Style.box}>
      静待有缘人
    </div>
    </>
    
  },
});
