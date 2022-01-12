<template>
  <h1>共享状态持久化</h1>
  <p>Number:{{ state.user.Number }}</p>
  <button @click="addUserNumber">number+</button>
</template>
<script lang="ts">
import { ref } from "vue";
import { useStore } from "../store";
</script>
<script setup lang="ts">
const { state, action } = useStore();
// n为自增时的中转变量,因为不允许直接操作state内的值
const n = ref();
if (state.user.Number !== null) {
  n.value = state.user.Number;
} else {
  n.value = 0;
}
// 初始化共享状态
action.updateUser({
  Number: n.value,
});

function addUserNumber() {
  n.value++;
  action.updateUser({
    Number: n.value,
  });
}
</script>
