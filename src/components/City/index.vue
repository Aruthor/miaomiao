<template>
  <div class="city_body">
    <div class="city_list">
      <Loading v-if="isLoading"/>
      <Scroller v-else ref="city_list">
        <div>
          <div class="city_hot">
            <h2>热门城市</h2>
            <ul class="clearfix">
              <li v-for="item in hostList" :key="item.id" @tap="handleToCity(item.nm ,item.id)">{{ item.nm }}</li>
            </ul>
          </div>
          <div class="city_sort" ref="city_sort">
            <div v-for="item in cityList" :key="item.index">
              <h2>{{item.index}}</h2>
              <ul>
                <li v-for="itemList in item.list" :key="item.list.id" @tap="handleToCity(itemList.nm ,itemList.id)">{{itemList.name}}</li>
              </ul>
            </div>
          </div> 
        </div>
      </Scroller>
    </div>
    <div class="city_index">
      <ul>
        <li v-for="(item,index) in cityList" :key="item.index" @touchstart="handleToIndex(index)">{{item.index}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "City",
  data() {
    return {
      cityList:[],
      hostList:[],
      isLoading: true
    };
  },
  mounted(){
    let cityList = window.localStorage.getItem('cityList')
    let hostList = window.localStorage.getItem('hostList')

    if(cityList && hostList){
      this.cityList = JSON.parse(cityList);
      this.hostList = JSON.parse(hostList);
      this.isLoading = false;
    }else{
      this.$ajax.get('/api/cityList').then((res)=>{
        var cities = res.data.data.cities;
        //[{index:'A',list:[{ name:'',id:123 }] }]
        var {cityList , hostList} = this.formatCityList(cities);
        this.cityList = cityList;
        this.hostList = hostList;
        this.isLoading = false;
        window.localStorage.setItem('cityList',JSON.stringify(this.cityList));
        window.localStorage.setItem('hostList',JSON.stringify(this.hostList));
      }) 
    }
    
  },
  methods:{
    //类型区分，将数据根据首字母进行区分,再从小到大排序
    formatCityList(cities){ 
      let cityList = [];
      let hostList = [];
      for(var i=0;i<cities.length;i++){
        var fristLetter = cities[i].py.substring(0,1).toUpperCase();
        if(toCom(fristLetter)){ //新添加index
          cityList.push({index:fristLetter , list:[{name:cities[i].nm , id:cities[i].id}]})
        }else{//累加到已有的index中
          for(var j = 0;j<cityList.length;j++){
            if(cityList[j].index === fristLetter){
              cityList[j].list.push({name:cities[i].nm , id:cities[i].id})
            }
          }
        }
      }
      cityList.sort((n1,n2)=>{
        if(n1.index > n2.index){
          return 1;
        }else{
          return -1;
        }
      })

      for(var i=0;i<cities.length;i++){
        if(cities[i].isHot === 1){
          hostList.push(cities[i])
        }
      }

      function toCom(fristLetter){
        for(var i=0;i<cityList.length;i++){
          if(cityList[i].index === fristLetter){
            return false;
          }
        }
        return true;
      }
      return {cityList, hostList}
    },

    handleToIndex(index){
      var h2 = this.$refs.city_sort.getElementsByTagName('h2')
      // this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop;
      this.$refs.city_list.toScrollTop(-h2[index].offsetTop)
    },
    handleToCity(nm,id){
      //修改城市
      this.$store.commit('city/CITY_INFO', { nm , id });
      window.localStorage.setItem('nowNm',nm);
      window.localStorage.setItem('nowId',id);
      this.$router.push('/movie/nowPlaying');
    }
  
  }
};
</script>

<style scoped>
#content .city_body{ margin-top: 45px; display: flex; width:100%; position: absolute; top: 0; bottom: 0;}
.city_body .city_list{ flex:1; overflow: auto; background: #FFF5F0;}
.city_body .city_list::-webkit-scrollbar{
  background-color:transparent;
  width:0;
}
.city_body .city_hot{ margin-top: 20px;}
.city_body .city_hot h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_hot ul li{ float: left; background: #fff; width: 29%; height: 33px; margin-top: 15px; margin-left: 3%; padding: 0 4px; border: 1px solid #e6e6e6; border-radius: 3px; line-height: 33px; text-align: center; box-sizing: border-box;}
.city_body .city_sort div{ margin-top: 20px;}
.city_body .city_sort h2{ padding-left: 15px; line-height: 30px; font-size: 14px; background:#F0F0F0; font-weight: normal;}
.city_body .city_sort ul{ padding-left: 10px; margin-top: 10px;}
.city_body .city_sort ul li{ line-height: 30px; line-height: 30px;}
.city_body .city_index{ width:20px; display: flex; flex-direction:column; justify-content:center; text-align: center; border-left:1px #e6e6e6 solid;}
</style>
