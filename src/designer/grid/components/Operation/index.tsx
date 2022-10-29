import { defineComponent, ref, watch, onUnmounted } from 'vue';
import Style from './index.module.less';

export default defineComponent({
  setup() {
    const deleteConfirm = ref(true);
    const deleteClick = () => {
      deleteConfirm.value = !deleteConfirm.value;
    };
    return () => (
      <div class={Style.box}>
        <el-icon>
          <edit />
        </el-icon>
        {deleteConfirm.value ? (
          <el-icon onClick={deleteClick}>
            <delete />
          </el-icon>
        ) : (
          <div class={Style.boxConfirm}>
            <span>√</span>
            <span onClick={deleteClick}>X</span>
          </div>
        )}
      </div>
    );
  },
});
