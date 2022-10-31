/*
 * @Author: sfy
 * @Date: 2022-10-30 13:44:34
 * @LastEditors: sfy
 * @LastEditTime: 2022-10-31 22:36:10
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
import { useRouter } from "vue-router";

const useStyles = createUseStyles({
  hedBox: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  }
});

export default defineComponent({
  components: { vulLogo },
  setup() {
    const router = useRouter();
    const classesRef = useStyles();

    const setRender = () => {
      router.push("/render");
    };

    return () => (
      <div class={classesRef.value.hedBox}>
        <vulLogo />
        <div>
          <el-icon size={30}>
            <video-play onClick={setRender} />
          </el-icon>
        </div>
      </div>
    );
  }
});
