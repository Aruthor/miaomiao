<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroller",
  props:{
    heanleToScroll : {
      type :Function,
      default:function(){}
    },
    handleTouchEnd : {
      type :Function,
      default:function(){}
    }
  },
  data() {
    return {
      scroll:''
    };
  },
  mounted() {
    //调用betterScroll需要注意：1.必须页面渲染完成，2.内容必须大于外层边框显示层
    this.$nextTick(() => {
      let scroll = new BScroll(this.$refs.wrapper, {
        scrollY: true,
        tap: true,
        probeType: 1
      });
      this.scroll = scroll;
      scroll.on("scroll", pos => {
        this.heanleToScroll(pos)
      });
      scroll.on("touchEnd", pos => {
        this.handleTouchEnd(pos)
      });
    });
  },
  methods:{
    toScrollTop(y){
      this.scroll.scrollTo(0,y,500);
    }
  }
};
</script>

<style scoped>
.wrapper {
  height: 100%;
}
</style>
