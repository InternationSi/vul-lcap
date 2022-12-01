/*
 * @Author: sfy
 * @Date: 2022-10-31 23:43:41
 * @LastEditors: sfy
 * @LastEditTime: 2022-12-01 22:25:17
 * @FilePath: /vulture/src/components/Operation/index.tsx
 * @Description: update here
 */
import { defineComponent, ref, watch, onUnmounted, PropType } from "vue";
import Style from "./index.module.scss";

export default defineComponent({
  props: {
    itemIndex: {
      type: Number as PropType<number>,
      require: true
    },
    handleDelete: {
      type: Function as PropType<(index: number) => void>,
      required: true
    },
    handleEdit: {
      type: Function as PropType<(value: boolean) => void>,
      required: true
    }
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
          onClick={() => {
            props.handleEdit(true);
          }}
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
              class={!deleteConfirm.value ? Style.active : ""}
              onClick={() => {
                if (!itemIndex) return;
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
  }
});
