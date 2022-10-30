/*
 * @Author: sfy
 * @Date: 2022-10-30 13:44:34
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-30 13:49:07
 * @FilePath: /vulture/src/designer/layout/components/HeadDash/index.tsx
 * @Description: update here
 */
/*
 * @Author: sfy
 * @Date: 2022-10-22 21:34:52
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-30 13:36:08
 * @FilePath: /vulture/src/designer/layout/index.tsx
 * @Description: update here
 */
import { defineComponent, ref } from "vue";
import vulLogo from "@/components/vulLogo";
import { createUseStyles } from "vue-jss";

const useStyles = createUseStyles({
  hedBox: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center"
  },
  logo: {}
});

export default defineComponent({
  components: { vulLogo },
  setup() {
    const classesRef = useStyles();
    return () => (
      <div class={classesRef.value.hedBox}>
        <vulLogo class={classesRef.value.logo} />
      </div>
    );
  }
});
