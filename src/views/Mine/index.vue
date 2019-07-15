<template>
  <div id="main">
    <movieHead title="奇趣登录"/>
    <loginList/>
    <movieTabBar/>
  </div>
</template>

<script>
import movieHead from '@/components/Header';
import movieTabBar from '@/components/TabBar';
import loginList from '@/components/Login';

export default {
  name: 'Movie',
  components:{
    movieHead,
    movieTabBar,
    loginList
  },
  data() { 
    return {

    }
  }
 }
</script>

<style scoped>
  
</style>
