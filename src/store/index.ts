import { readonly } from "vue";
import { createAction } from "./action";
import { createPersistStorage } from "./persist";
import { createState,isState } from "./state";

const state = createState();
const action = createAction(state);

const useStore = () => {
  return {
    state: createPersistStorage<isState>(state), // 使用持久化方案
    action: readonly(action),
  };
};

export{
  useStore
}