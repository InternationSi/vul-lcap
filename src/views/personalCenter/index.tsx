import { defineComponent, ref, PropType } from 'vue';
import Style from "./index.module.less";
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
