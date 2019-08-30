<template>
  <div class="header-wrap">
    <h2>Welcome to Your Vue.js App</h2>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
    };
  }
};
</script>
<style lang="less" scope>
.header-wrap {
  height: 180px;
  line-height: 180px;
  text-align: center;
  h2 {
    font-size: 40px;
    color: #fff;
    background: #1d9ed1;
  }
}
</style>
