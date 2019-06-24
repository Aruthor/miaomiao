<template>
  <div id="main">
    <movieHead title="我的设置"/>
    <movieTabBar/>
  </div>
</template>

<script>
import movieHead from '@/components/Header';
import movieTabBar from '@/components/TabBar';

export default {
  name: 'Movie',
  components:{
    movieHead,
    movieTabBar
  },
  data() { 
    return {

    }
  }
 }
</script>

<style lang="" scoped>
  
</style>
