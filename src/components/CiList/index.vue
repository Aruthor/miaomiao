<template>
  <div class="cinema_body">
    <Loading v-if="isLoading"/>
    <Scroller v-else>
      <ul >
        <li v-for="item in cinemasList" :key="item.id">
          <div>
            <span>{{item.nm}}</span>
            <span class="q">
              <span class="price">{{item.sellPrice}}</span> 元起
            </span>
          </div>
          <div class="address">
            <span>{{item.addr}}</span>
            <span>{{item.distance}}</span>
          </div>
          <div class="card">
            <div v-for="(num,key) in item.tag" :key="key" v-if="num===1" :class=" key | classCard">
              {{ key | formatCard}}
            </div>
          </div>
        </li>
      </ul>
    </Scroller>
    
  </div>
</template>

<script>
export default {
  name: "ciList",
  data() {
    return {
      cinemasList: [],
      isLoading:true,
      prevCityId:-1
    };
  },
  mounted() {
    this.isLoading = true;
    //这个生命周在keep-alive下才会执行，这里需要将其进行判断，如果在当前位置就不发起请求，否则就会
    let cityId = this.$store.state.city.id;
    if(this.prevCityId === cityId){return}
    
    this.$ajax.get("/api/cinemaList?cityId="+cityId).then(res => {
      this.cinemasList = res.data.data.cinemas;
      this.isLoading = false;
      this.prevCityId = cityId
    });
  },
  computed: {
    //v-if跟v-for替代，todo
    // qt(){
    //   Object.keys(this.cinemasList.filter((i)=>{
    //     for(var k in i.tag){
    //       if(i.tag[k]===1){
    //         return k
    //       }
    //       console.log(k)
    //     }
    //   }))
    // }
  },
  filters: {
    //修改内容显示
    formatCard(key) {
      var card = [
        { key: "allowRefund", value: "改签" },
        { key: "endorse", value: "退" },
        { key: "sell", value: "折扣卡" },
        { key: "snack", value: "小吃" }
      ];
      for (var i = 0; i < card.length; i++) {
        if (card[i].key === key) {
          return card[i].value;
        }
      }
      return "";
    },
    classCard(key) {
      var card = [
        { key: "allowRefund", value: "bl" },
        { key: "endorse", value: "bl" },
        { key: "sell", value: "or" },
        { key: "snack", value: "or" }
      ];
      for (var i = 0; i < card.length; i++) {
        if (card[i].key === key) {
          return card[i].value;
        }
      }
      return "";
    }
  }
};
</script>

<style scoped>
.cinema_body{ flex:1; overflow:auto;}
.cinema_body ul{ padding:20px;}
.cinema_body li{  border-bottom:1px solid #e6e6e6; margin-bottom: 20px;}
.cinema_body div{ margin-bottom: 10px;}
.cinema_body .q{ font-size: 11px; color:#f03d37;}
.cinema_body .price{ font-size: 18px;}
.cinema_body .address{ font-size: 13px; color:#666;}
.cinema_body .address span:nth-of-type(2){ float:right; }
.cinema_body .card{ display: flex;}
.cinema_body .card div{ padding: 0 3px; height: 15px; line-height: 15px; border-radius: 2px; color: #f90; border: 1px solid #f90; font-size: 13px; margin-right: 5px;}
.cinema_body .card div.or{ color: #f90; border: 1px solid #f90;}
.cinema_body .card div.bl{ color: #589daf; border: 1px solid #589daf;}
</style>
