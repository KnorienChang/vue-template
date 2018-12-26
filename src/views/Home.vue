<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <div>{{ $store.state.count }}</div>
    <el-row>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </el-row>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  mounted() {
    this.$get('/mock')
      /* eslint-disable no-console */
      .then(console.log)
      .catch(console.error);
  }
};
</script>

<style lang="scss" scoped>
img {
  width: 100px;
}
// /deep/为添加 .home为css生效作用域
.home /deep/ {
  .el-button--success {
    color: bisque;
  }
}
</style>
