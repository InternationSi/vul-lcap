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
import Operation from '../../../../components/Operation';
export default defineComponent({
  props:{
    config: {
      type: Object as any,
      require: true
    },
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
    const { config,itemIndex } = props
    
    const renderComponents = () => {       
      if(config.type === 'container') {
        return <TabContainer />
      }else {
        return <Spacing />
      }
    }
    const deleteItem = (value:number)=>{
      props.handleDelete(value)
    }
    const editItem = (value:any)=>{
      props.handleEdit(value)
    }

    return () => (
      <>
        {
          renderComponents()
          
        }
        <Operation  itemIndex = {itemIndex} handleDelete = {deleteItem} handleEdit={editItem}/>
      </>
    );
  }
});