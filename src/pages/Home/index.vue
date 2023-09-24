<template>
  <div>
    <typeNav></typeNav>
    <ListContainer :list="bannerList" /> 
    <TodayRecommend></TodayRecommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor"/>
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from './ListContainer'
import TodayRecommend from './TodayRecommend'
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'
import { mapState } from 'vuex';

export default {
    name:'Home',
    components:{ListContainer,TodayRecommend,Rank,Like,Floor,Brand},
    mounted(){
      this.$store.dispatch('getFloorList')
      this.$store.dispatch('getBannerList') 
      //當前問題:只有在home會發請求獲取name，當跳到另一個組件重新整理後就沒了
      //解法1:每個組件都請求一次(不好，太麻煩)
      //this.$store.dispatch('getUserInfo')
      //解法2:在路由守衛中設定(好方法)
    },    
    computed:{
         ...mapState({floorList:(s)=>{return s.home.floorList}}),
         ...mapState({bannerList:(s)=>{return s.home.bannerList}})
    } 
}
</script>

<style>

</style>