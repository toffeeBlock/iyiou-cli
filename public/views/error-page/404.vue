<template>
  <div class="error-wrap">
    <img src="../../assets/images/error/404.png" alt />
    <p>该页面不存在或没有权限访问</p>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less">
.error-wrap {
  width: 100%;
  min-height: calc(100vh);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  img {
    width: 50%;
  }
  p {
    margin-top: 40px;
    font-size: 30px;
    color: #f68c22;
  }
}
</style>