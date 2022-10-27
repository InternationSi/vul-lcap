/*
 * @Author: sfy
 * @Date: 2022-10-25 22:32:47
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-27 22:24:32
 * @FilePath: /vulture/src/designer/grid/components/GridItemList/index.tsx
 * @Description: update here
 */
import { defineComponent, ref, watch, onUnmounted } from "vue";
import Spacing from "../Spacing";
import TabContainer from "../TabContainer";
export default defineComponent({
  props:{
    config: {
      type: Object as any,
      require: true
    }
  },
  setup(props) {
    const renderComponents = () => {
      const { config } = props

      console.log(config, '----');
       
      if(config.type === 'container') {
        return <TabContainer />
      }else {
        return <Spacing />
      }
    }

    return () => (
      <>
        {
          renderComponents()
        }
      </>
    );
  }
});