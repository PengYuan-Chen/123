<template>
<div class="list-container">
    <div class="sortList clearfix">
        <div class="center">
            <!--banner轮播-->
            <carousel :list="list" />
        </div>
        <div class="right">
            <div class="news">
                <h4>
                    <em class="fl">尚品汇快报</em>
                    <span class="fr tip">更多 ></span>
                </h4>
                <div class="clearix"></div>
                <ul class="news-list unstyled">
                    <li>
                        <span class="bold">[特惠]</span>备战开学季 全民半价购数码
                    </li>
                    <li>
                        <span class="bold">[公告]</span>备战开学季 全民半价购数码
                    </li>
                    <li>
                        <span class="bold">[特惠]</span>备战开学季 全民半价购数码
                    </li>
                    <li>
                        <span class="bold">[公告]</span>备战开学季 全民半价购数码
                    </li>
                    <li>
                        <span class="bold">[特惠]</span>备战开学季 全民半价购数码
                    </li>
                </ul>
            </div>
            <ul class="lifeservices">
                <li class=" life-item ">
                    <i class="list-item"></i>
                    <span class="service-intro">话费</span>
                </li>
                <li class=" life-item ">
                    <i class="list-item"></i>
                    <span class="service-intro">机票</span>
                </li>
                <li class=" life-item ">
                    <i class="list-item"></i>
                    <span class="service-intro">电影票</span>
                </li>
                <li class=" life-item ">
                    <i class="list-item"></i>
                    <span class="service-intro">游戏</span>
                </li>
                <li class=" life-item">
                    <i class="list-item"></i>
                    <span class="service-intro">彩票</span>
                </li>
                <li class=" life-item">
                    <i class="list-item"></i>
                    <span class="service-intro">加油站</span>
                </li>
                <li class=" life-item">
                    <i class="list-item"></i>
                    <span class="service-intro">酒店</span>
                </li>
                <li class=" life-item">
                    <i class="list-item"></i>
                    <span class="service-intro">火车票</span>
                </li>
                <li class=" life-item ">
                    <i class="list-item"></i>
                    <span class="service-intro">众筹</span>
                </li>
                <li class=" life-item">
                    <i class="list-item"></i>
                    <span class="service-intro">理财</span>
                </li>
                <li class=" life-item">
                    <i class="list-item"></i>
                    <span class="service-intro">礼品卡</span>
                </li>
                <li class=" life-item">
                    <i class="list-item"></i>
                    <span class="service-intro">白条</span>
                </li>
            </ul>
            <div class="ads">
                <img src="./images/ad1.png" />
            </div>
        </div>
    </div>
</div>  
</template>

<script>
export default {
    name:'ListContainer',
    props:['list']
    //發請求取的mock資料
    /*
    問題:swiper該放哪裡?
    1.放mounted的話結構還不完整，雖然掛載完畢但請求的資料還沒回來，因此沒法跑
    2.updated(){     //可行但常常會重新更新，不需要一直重新更新
        //放在外面，先等dom載入完再初始化
        var mySwiper = new Swiper ('.swiper-container', {
            loop: true, // 循环模式选项 
            // 如果需要分页器
            pagination: {
            el: '.swiper-pagination',
            clickable:true,
            },
            
            // 如果需要前进后退按钮
            navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
            },
            
            // 如果需要滚动条
            scrollbar: {
            el: '.swiper-scrollbar',
            },
        })    
            },
        3.定時器也可以，設定1秒後再執行
    */
    /*swiper最好的解法，watch+$nextTick:等資料變動，確定頁面更新完後再執行swiper功能 常用的功能
    watch:{    //bannerList數據變化時調用
        bannerList:{
            handler(newVal,oldVal){
                this.$nextTick(()=>{var mySwiper = new Swiper ('.swiper-container', {
                    loop: true, // 循环模式选项 
                    // 如果需要分页器
                    pagination: {
                        el: '.swiper-pagination',
                        clickable:true,
                    },
                    
                    // 如果需要前进后退按钮
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',
                    },
                    
                    // 如果需要滚动条
                    scrollbar: {
                        el: '.swiper-scrollbar',
                    },
                    })  
                })
            }
        }
    }
    */
}

</script>

<style scoped lang="less">
.list-container {
    width: 1200px;
    margin: 0 auto;

    .sortList {
        height: 464px;
        padding-left: 210px;

        .center {
            box-sizing: border-box;
            width: 740px;
            height: 100%;
            padding: 5px;
            float: left;
        }

        .right {
            float: left;
            width: 250px;

            .news {
                border: 1px solid #e4e4e4;
                margin-top: 5px;

                h4 {
                    border-bottom: 1px solid #e4e4e4;
                    padding: 5px 10px;
                    margin: 5px 5px 0;
                    line-height: 22px;
                    overflow: hidden;
                    font-size: 14px;

                    .fl {
                        float: left;
                    }

                    .fr {
                        float: right;
                        font-size: 12px;
                        font-weight: 400;
                    }
                }

                .news-list {
                    padding: 5px 15px;
                    line-height: 26px;

                    .bold {
                        font-weight: 700;
                    }
                }
            }

            .lifeservices {
                border-right: 1px solid #e4e4e4;
                overflow: hidden;
                display: flex;
                flex-wrap: wrap;

                .life-item {
                    border-left: 1px solid #e4e4e4;
                    border-bottom: 1px solid #e4e4e4;
                    margin-right: -1px;
                    height: 64px;
                    text-align: center;
                    position: relative;
                    cursor: pointer;
                    width: 25%;

                    .list-item {
                        background-image: url(./images/icons.png);
                        width: 61px;
                        height: 40px;
                        display: block;
                    }

                    .service-intro {
                        line-height: 22px;
                        width: 60px;
                        display: block;
                    }

                    &:nth-child(1) {
                        .list-item {
                            background-position: 0px -5px;
                        }
                    }

                    &:nth-child(2) {
                        .list-item {
                            background-position: -62px -5px;
                        }
                    }

                    &:nth-child(3) {
                        .list-item {
                            background-position: -126px -5px;
                        }
                    }

                    &:nth-child(4) {
                        .list-item {
                            background-position: -190px -5px;
                        }
                    }

                    &:nth-child(5) {
                        .list-item {
                            background-position: 0px -76px;
                        }
                    }

                    &:nth-child(6) {
                        .list-item {
                            background-position: -62px -76px;
                        }
                    }

                    &:nth-child(7) {
                        .list-item {
                            background-position: -126px -76px;
                        }
                    }

                    &:nth-child(8) {
                        .list-item {
                            background-position: -190px -76px;
                        }
                    }

                    &:nth-child(9) {
                        .list-item {
                            background-position: 0px -146px;
                        }
                    }

                    &:nth-child(10) {
                        .list-item {
                            background-position: -62px -146px;
                        }
                    }

                    &:nth-child(11) {
                        .list-item {
                            background-position: -126px -146px;
                        }
                    }

                    &:nth-child(12) {
                        .list-item {
                            background-position: -190px -146px;
                        }
                    }
                }
            }

            .ads {
                margin-top: 5px;

                img {
                    opacity: 0.8;
                    transition: all 400ms;

                    &:hover {
                        opacity: 1;
                    }
                }
            }
        }
    }
}
</style>