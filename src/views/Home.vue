<template>
  <div class="home">
      <van-button type="primary"><span class="title">increase</span></van-button>
      <van-button type="warning">increase</van-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Home'
});
</script>
<style lang="scss" scoped>
  .title {
    font-size:16px;
  }
</style>