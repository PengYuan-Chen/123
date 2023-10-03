<template>
<!--swiper的標準html結構-->
<div class="swiper-container" id="floor1Swiper">
    <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="carousel in list" :key="carousel.id">
            <img :src="carousel.imgUrl" />
        </div>                                  
    </div>
    <!-- 如果需要分頁器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要導航按鈕 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
</div>  
</template>

<script>
import Swiper from 'swiper'; //在需要使用swiper的地方引入swiper
export default {
    props:['list'],    //父傳子接收home抓到的圖片資料用mock模擬照片
    watch:{    //watch是原本寫法才需要，後面寫法不需要   
        list:{
            immediate:true,    //一上來先執行一次
            loop:true,    //循環
            handler(nes,old){
                this.$nextTick(()=>{    //抓圖片的時候可能還沒抓到
                    var mySwiper = new Swiper ('.swiper-container', {       
                    // 如果需要分頁器
                    pagination: {
                        el: '.swiper-pagination',
                        clickable:true,    //圓點可以點擊
                    },                   
                    // 如果需要按鈕
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },                  
                    // 如果需要滾動
                    scrollbar: {
                        el: '.swiper-scrollbar',
                    },
                    //自動播放
                    autoplay: {                   
                        delay:3000, //自動播放的間隔
                    }
                    })
                })           
            }
        }
    } 
}
</script>

