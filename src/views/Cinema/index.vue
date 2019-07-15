<template>
  <div id="main">
    <movieHead title="奇趣影院" />
    <div id="content">
      <div class="cinema_menu">
        <div class="city_switch">
          全城
          <i class="iconfont icon-lower-triangle"></i>
        </div>
        <div class="brand_swtich">
          品牌
          <i class="iconfont icon-lower-triangle"></i>
        </div>
        <div class="feature_switch">
          特色
          <i class="iconfont icon-lower-triangle"></i>
        </div>
      </div>
    </div>
    <ciList />
    <movieTabBar />
  </div>
</template>

<script>
import movieHead from "@/components/Header";
import movieTabBar from "@/components/TabBar";
import ciList from "@/components/ciList";

export default {
  name: "Movie",
  components: {
    movieHead,
    movieTabBar,
    ciList
  },
  data() {
    return {};
  }
};
</script>

<style scoped>
#content .cinema_menu{ width: 100%; height: 45px; border-bottom:1px solid #e6e6e6; display: flex; justify-content:space-around; align-items:center; background:white;}
</style>
