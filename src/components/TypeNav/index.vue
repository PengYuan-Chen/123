<template>
<div class="type-nav">
    <!--滑鼠進入時展示列表，移出時不展示-->
    <div class="container" @mouseleave="changeShowFalse()">
        <h2 class="all" @mouseenter="changeShowTrue()" >全部商品分类</h2>
        <nav class="nav">
            <a href="###">服装城</a>
            <a href="###">美妆馆</a>
            <a href="###">尚品汇超市</a>
            <a href="###">全球购</a>
            <a href="###">闪购</a>
            <a href="###">团购</a>
            <a href="###">有趣</a>
            <a href="###">秒杀</a>
        </nav>
        <!--加一個動畫效果-->
        <transition name="sort">
        <div class="sort" @mouseleave="noMouse()" v-show="isShow">
            <div class="all-sort-list2" @click="goSearch">    <!--點擊後帶著參數跳到search頁面-->
             <!--根據123級分類去跑for loop-->
                <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId" :class="{cur:currentIndex==index}">     <!-- 1級分類-->
                    <!--判斷滑鼠碰到變色-->
                    <h3 @mouseenter="getMouse(index)" >
                        <!--加上自訂屬性(前面加上data-表示可以用某函數取得此自訂屬性)-->
                        <a :data-categoryName="c1.categoryName"    
                            :data-category1Id="c1.categoryId" >{{c1.categoryName}}</a>  
                    </h3>
                    <!--是否顯示詳細的用display block or none-->
                    <div class="item-list clearfix" :style="{'display':currentIndex==index?'block':'none'}">
                        <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">  <!--2級分類-->
                            <dl class="fore">
                                <dt>
                                    <a :data-categoryName="c2.categoryName"
                                       :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                                </dt>
                                <dd>
                                    <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">  <!--3級分類-->
                                        <a :data-categoryName="c3.categoryName"
                                           :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                                    </em>

                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>            
            </div>
        </div>
        </transition>
        
    </div>
</div>  
</template>

<script>
import {mapState} from 'vuex'
import _ from 'lodash'    //引入lodash 預設就在node_modules裡直接匯入(是物件)
export default {
    name:'TypeNav',
    data(){
        return{
            currentIndex:-1,
            isShow:true
        }
    },
    //一掛載完畢立即通知vuex發請求，數據存於state中
    mounted(){
        
        if(this.$route.path!='/home'){
            this.isShow=false;
        }
    },
    computed:{  
        ...mapState({categoryList:(bigstate)=>{
            return bigstate.home.categoryList
        }})
    },
    methods:{
        getMouse: _.throttle(function(index){    //用戶出發函數，隨即執行throttle
            this.currentIndex=index;
        },50),    //幾秒才執行一次
       
        noMouse(){
            this.currentIndex=-1;
        },
        goSearch(event){
            let element=event.target
            let cate=element.dataset;        //取的標籤中的所有自訂屬性

            let location={name:'search'}    //進行編程式路由
            let query={categoryName:cate.categoryname}
            if(cate.category1id){
                query.category1Id=cate.category1id      
            }else if(cate.category2id){
                query.category2Id=cate.category2id
            }else if(cate.category3id){
                query.category3Id=cate.category3id
            }
            location.query=query
            if(this.$route.params){     //兩種參數都要傳過去:query跟搜尋的params
                location.params=this.$route.params
            }
            this.$router.push(location)    //開始路由
        },
        changeShowTrue(){
            if(this.$route.path!='/home'){
                this.isShow=true;
            }         
        },
        changeShowFalse(){
            if(this.$route.path!='/home'){
                this.isShow=false;
            } 
        }
    }
}
</script>

<style scoped lang="less">
.type-nav {
    border-bottom: 2px solid #e1251b;

    .container {
        width: 1200px;
        margin: 0 auto;
        display: flex;
        position: relative;

        .all {
            width: 210px;
            height: 45px;
            background-color: #e1251b;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {
                    h3 {
                        line-height: 30px;
                        font-size: 14px;
                        font-weight: 400;
                        overflow: hidden;
                        padding: 0 20px;
                        margin: 0;

                        a {
                            color: #333;
                        }
                    }

                    .item-list {
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                &.fore {
                                    border-top: 0;
                                }

                                dt {
                                    float: left;
                                    width: 54px;
                                    line-height: 22px;
                                    text-align: right;
                                    padding: 3px 6px 0 0;
                                    font-weight: 700;
                                }

                                dd {
                                    float: left;
                                    width: 415px;
                                    padding: 3px 0 0;
                                    overflow: hidden;

                                    em {
                                        float: left;
                                        height: 14px;
                                        line-height: 14px;
                                        padding: 0 8px;
                                        margin-top: 5px;
                                        border-left: 1px solid #ccc;
                                    }
                                }
                            }
                        }
                    }
                }
            }
            .cur{
                        background-color: skyblue;
            }
            
        }
        .sort-enter,.sort-leave-to{
            height:0;
        }
        .sort-enter-active,.sort-leave-active{
            transition: .3s linear;            
        }
        .sort-enter-to,.sort-leave{
            height:461px;
        }
    }
}
</style>