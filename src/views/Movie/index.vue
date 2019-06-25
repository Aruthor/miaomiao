<template>
  <div id="main">
    <movieHead title="奇趣电影"/>
    <nowPlaying/>
    <movieTabBar/>
  </div>
</template>

<script>
import movieHead from '@/components/Header';
import movieTabBar from '@/components/TabBar';
import nowPlaying from '@/components/NowPlaying';

export default {
  name: 'Movie',
  components:{
    movieHead,
    movieTabBar,
    nowPlaying
  },
  data() { 
    return {

    }
  }
 }
</script>

<style lang="" scoped>
 
</style>
