import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import router from '@/router'
import store from './store' 
//全局組件引入
import TypeNav from '@/components/TypeNav'  
import Carousel from '@/components/Carousel'  
import Pagination from '@/components/Pagination' 


Vue.component('TypeNav',TypeNav)    //引入三級分類
Vue.component('Carousel',Carousel)   //引入倫波圖
Vue.component('Pagination',Pagination)   //引入分頁
Vue.use(VueRouter)
Vue.config.devtools=true;
//引入mock
import '@/mock/mockServe' 
//引入swiper樣式(多個組件會用到所以在這邊引入)
import 'swiper/css/swiper.css'
//統一引入  api裡面所有的函數(引一次就夠了不用一直引)
import * as API from '@/api'
//圖片懶加載功能引入
import VueLazyload from 'vue-lazyload'
import loaddd from '@/assets/loaddd.png'
Vue.use(VueLazyload,{
    loading:loaddd  
})
//引入表單驗證插件
import '@/plugins/validate'

new Vue({ 
  el:'#app',
  render:h=>h(App),
  router:router,
  store,    //引入vuex自動有store配置項
  beforeCreate(){
    Vue.prototype.$bus=this
    //利用全局事件總線概念
    Vue.prototype.$api=API
  }
  
}) 
 