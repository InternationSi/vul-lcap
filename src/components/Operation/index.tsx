import { defineComponent, ref, watch, onUnmounted, PropType } from 'vue';
import Style from './index.module.less';

export default defineComponent({
  props: {
    itemIndex: {
      type: Number as any,
      require: true,
    },
    handleDelete: {
      type: Function as any,
      required: true,
    },
    handleEdit: {
      type: Function as any,
      required: true,
    },
  },
  setup(props) {
    const deleteConfirm = ref(true);
    const { itemIndex } = props;
    const deleteClick = () => {
      deleteConfirm.value = !deleteConfirm.value;
    };
    return () => (
      <div class={Style.box}>
        <el-icon
          onClick={()=>{props.handleEdit(true)}}
        >
          <edit />
        </el-icon>
        {deleteConfirm.value ? (
          <el-icon onClick={deleteClick}>
            <delete />
          </el-icon>
        ) : (
          <div class={Style.boxConfirm}>
            <span
            class={!deleteConfirm.value?Style.active:''}
              onClick={() => {
                props.handleDelete(itemIndex),
                  (deleteConfirm.value = !deleteConfirm.value);
              }}
            >
              √
            </span>
            <span onClick={deleteClick}>X</span>
          </div>
        )}
       
      </div>
    );
  },
});
