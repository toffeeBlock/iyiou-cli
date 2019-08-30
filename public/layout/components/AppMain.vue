<template>
  <div class="main-container">
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return {
    }
  }
};
</script>
<style lang="less" scoped>
.main-container {
  min-height: calc(100vh - 300px);
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  padding: 100px 0;
}
</style>