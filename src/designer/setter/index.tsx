/*
 * @Author: sfy
 * @Date: 2022-11-20 22:31:14
 * @LastEditors: sfy
 * @LastEditTime: 2022-11-22 23:15:15
 * @FilePath: /vulture/src/designer/setter/index.tsx
 * @Description: update here
 */
import {
  defineComponent,
  ref,
  watch,
  onUnmounted,
  PropType,
  reactive,
  h,
  resolveComponent
} from "vue";
import { baseSetterMeta } from "./consts";
import { createUseStyles } from "vue-jss";
import NumberSetter from "./components/Number";
const useStyles = createUseStyles({
  setterBox: {
    width: "100%",
    minHeight: "40vh",
    display: "flex"
  },
  viewBox: {
    width: "40%"
  },
  tabBox: {
    width: "100%"
  }
});

export default defineComponent({
  name: "setter",
  components: {
    NumberSetter
  },
  setup(props) {
    const classesRef = useStyles();
    const setterValue = ref<any>({});

    baseSetterMeta.forEach((info) => {
      setterValue.value[info.name] = info.initValue;
    });

    return () => {
      const classes = classesRef.value;
      return (
        <div class={classes.setterBox}>
          <div class={classes.viewBox}></div>
          <el-tabs class={classes.tabBox} type="border-card">
            <el-tab-pane label="通用">
              {baseSetterMeta.map((baseInfo) => {
                console.log(baseInfo.type);
                return h(resolveComponent(baseInfo.type), {
                  label: baseInfo.label,
                  value: setterValue.value[baseInfo.name],
                  onChange: (val: any) => {
                    setterValue.value[baseInfo.name] = val;
                    console.log(setterValue.value);
                  }
                });
              })}
            </el-tab-pane>
            <el-tab-pane label="solo">solo</el-tab-pane>
            <el-tab-pane label="事件">事件</el-tab-pane>
          </el-tabs>
        </div>
      );
    };
  }
});
