<template>
  <div class="app-wrapper">
    <Header/>
    <app-main />
    <footer-menu />
  </div>
</template>

<script>
import { AppMain, FooterMenu, Header } from './components'

export default {
  name: 'Layout',
  components: {
    AppMain,
    FooterMenu,
    Header
  }
}
</script>
<style lang="less" scoped>
.app-wrapper {
  min-height: calc(100vh);
  overflow: hidden;
}
</style>