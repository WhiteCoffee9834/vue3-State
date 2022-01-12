// 持久化方案
import { watch, toRaw, readonly } from "vue";

export function createPersistStorage<T>(state: any, key = "default"): T {
  const STORAGE_KEY = "--APP-STORAGE--"; // 在本地存储中的名字
  // 进入页面时就尝试再本地存储中获取共享状态
  if (localStorage.getItem(STORAGE_KEY)) {
    Object.entries(getItem(key)).forEach(([key, value]) => {
      state[key] = value;
    });
  } else {
    // 如果本次存储没有这个键,则创建这个键,值为default:state
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        [key]: state,
      })
    );
  }
  // 再本地存储中获取数据
  function getItem(key?: string) {
    const stateStr = localStorage.getItem(STORAGE_KEY)!;
    const stateRow = JSON.parse(stateStr);
    return key ? stateRow[key] : stateRow;
  }
  // 写入本地存储
  function setItem(state: any) {
    const stateRow = getItem(); // 获取数据
    stateRow[key] = state; // 覆盖旧数据
    const stateStr = JSON.stringify(stateRow);
    localStorage.setItem(STORAGE_KEY, stateStr); // 写入数据
  }
  // state发生改变时的监听函数
  watch(state, () => {
    const stateRow = toRaw(state); // 取消响应式
    setItem(stateRow); // 触发写入
  });

  return readonly(state);
}
