/*
 * @Author: sfy
 * @Date: 2022-11-20 22:31:14
 * @LastEditors: sfy
 * @LastEditTime: 2022-11-27 22:51:29
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
  defineExpose,
  resolveComponent
} from "vue";
import { baseSetterMeta } from "./consts";
import { createUseStyles } from "vue-jss";
import GridItemList from "../grid/components/GridItemList";
import {metaComponentsSetter} from '../material'
import  {
  NumberSetter,
  StringSetter
} from './components'
const useStyles = createUseStyles({
  setterBox: {
    width: "100%",
    minHeight: "40vh",
    display: "flex",
  },
  viewBox: {
    width: "40%"
  },
  tabBox: {
    width: "100%",
    flex: '1'
  }
});

export default defineComponent({
  name: "setter",
  components: {
    NumberSetter,
    StringSetter
  },
  props:{
    value:{
      type: Object as any,
      required: true
    }
  },
  setup(props, {expose}) {
    console.log(props.value, 'ppp');
    console.log(metaComponentsSetter[(props.value.type)]);
    
    const {value} = props

    const classesRef = useStyles();
    const setterValue = ref<any>({});
    expose({
      setterValue
    })

    baseSetterMeta.forEach((info) => {
      setterValue.value[info.name] = value[info.name]
    });
    return () => {
      
      const classes = classesRef.value;
      return (
        <div class={classes.setterBox}>
          <div class={classes.viewBox}>
            <GridItemList config={props.value} isDesign={false}/>
          </div>
          <el-tabs class={classes.tabBox} type="border-card">
            <el-tab-pane label="通用">
              {baseSetterMeta.map((baseInfo) => {
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
            <el-tab-pane label="个性化">{
              metaComponentsSetter[(props.value.type)]?.map((baseInfo:any) => {
                return h(resolveComponent(baseInfo.type), {
                  label: baseInfo.label,
                  value: setterValue.value[baseInfo.name],
                  onChange: (val: any) => {
                    setterValue.value[baseInfo.name] = val;
                    console.log(setterValue.value);
                  }
                });
              })
            }</el-tab-pane>
            <el-tab-pane label="数据源">数据源</el-tab-pane>
            <el-tab-pane label="事件">事件</el-tab-pane>
          </el-tabs>
        </div>
      );
    };
  }
});
