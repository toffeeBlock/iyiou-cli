<template>
  <div class="home-page">
    <img class="logo" src="../../assets/images/logo/logo.png" alt="">
    <h2>iyiou-cli</h2>
    <router-link to="/user">user-router</router-link>
  </div>
</template>
<script>
export default {
  data() {
    return {
      message: 'Iyiou-Cli'
    }
  },
  mounted() {
  }
};
</script>
<style lang="less">
.home-page {
  text-align: center;
  .logo {
    width: 600px;
    margin-bottom: 100px;
  }
  h2 {
    font-size: 30px;
    line-height: 60px;
    color: #555;
    margin-bottom: 40px;
  }
  a {
    color: #f68c22;
    font-size: 24px;
  }
}
</style>