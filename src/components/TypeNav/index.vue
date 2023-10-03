<template>
<!--處理三級分類-->
<div class="type-nav">
    <!--滑鼠進入時展示列表，移出時不展示-->
    <div class="container" @mouseleave="changeShowFalse()">
        <h2 class="all" @mouseenter="changeShowTrue()" >全部商品分類</h2>
        <nav class="nav">
            <a href="###">服裝城</a>
            <a href="###">美妝館</a>
            <a href="###">超市</a>
            <a href="###">全球購</a>
            <a href="###">閃購</a>
            <a href="###">團購</a>
            <a href="###">有趣</a>
            <a href="###">秒殺</a>
        </nav>
        <!--加一個動畫效果-->
        <transition name="sort">
        <!--整個三級列表的部分-->
        <div class="sort" @mouseleave="noMouse()" v-show="isShow">
            <div class="all-sort-list2" @click="goSearch">    <!--點擊後帶著參數跳到search頁面-->
             <!--根據123級分類去跑for loop-->
                <!-- 1級分類，判斷滑鼠碰到變色:cur-->
                <div class="item" v-for="(c1,index) in categoryList" 
                    :key="c1.categoryId" 
                    :class="{cur:currentIndex==index}"    
                    @mouseenter="getMouse(index)">    
                    <h3>
                        <!--加上自訂屬性(前面加上data-表示可以用dataset取得此自訂屬性)-->
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
            currentIndex:-1,    //點第幾個
            isShow:true  //決定三級列表是否要展示，預設為true:展示
        }
    },
    mounted(){       
        if(this.$route.path!='/home'){
            this.isShow=false;    //除了在home以外都預設不展示，所以isshow會是false
        }else{
            this.isShow=true;
        }
    },
    computed:{  
        //把倉庫的categoryList(三級列表的數據)抓過來用
        ...mapState({categoryList:(state)=>{
            return state.home.categoryList
        }})
    },
    methods:{
        //當你鼠碰到時觸發，傳入當前index
        getMouse: _.throttle(function(index){    //用戶出發函數，隨即執行throttle節流
            this.currentIndex=index;    //index是當前位置
        },50),    //幾豪秒才執行一次
       
        noMouse(){
            this.currentIndex=-1;
        },
        //點下去時
        goSearch(event){
            let element=event.target    //觸發的目標元素
            let cate=element.dataset;        //取的標籤中的所有自訂屬性

            let location={name:'search'}    //進行編程式路由到search
            let query={categoryName:cate.categoryname}    //參數要帶上id跟name是用query
            if(cate.category1id){    //判斷是123級路由
                query.category1Id=cate.category1id      
            }else if(cate.category2id){
                query.category2Id=cate.category2id
            }else if(cate.category3id){
                query.category3Id=cate.category3id
            }
            location.query=query    //帶上query
            if(this.$route.params){     //兩種參數都要傳過去:query跟搜尋的params
                location.params=this.$route.params    //帶上params
            }
            this.$router.push(location)    //開始路由
        },
        //滑鼠進來時顯示三級分類
        changeShowTrue(){
            this.isShow=true;
        },
        //鼠標離開時
        changeShowFalse(){
            if(this.$route.path!='/home'){
                this.isShow=false;    //除了在home以外都預設不展示，所以isshow會是false
            }else{
                this.isShow=true;
            }
        }
    }
}
</script>

<style scoped lang="less">
//都在type-nav跟container裡面
.type-nav {
    border-bottom: 2px solid blue;

    .container {
        width: 1200px;
        margin: 0 auto;    //水平置中
        display: flex;
        position: relative;


        .all {    //全部商品分類    
            width: 210px;
            height: 45px;
            background-color: blue;
            line-height: 45px;
            text-align: center;
            color: #fff;
            font-size: 14px;
            font-weight: bold;
        }

        .nav {    //橫向列表
            a {
                height: 45px;
                margin: 0 22px;
                line-height: 45px;
                font-size: 16px;
                color: #333;
            }
        }

        .sort {    //整個三級分類
            position: absolute;
            left: 0;
            top: 45px;
            width: 210px;
            height: 461px;
            position: absolute;
            background: #fafafa;
            z-index: 999;

            .all-sort-list2 {
                .item {    //一級
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

                    .item-list {    //二級
                        display: none;
                        position: absolute;
                        width: 734px;
                        min-height: 460px;
                        background: #f7f7f7;
                        left: 210px;
                        border: 1px solid #ddd;
                        top: 0;
                        z-index: 9999 !important;

                        .subitem {    //三級
                            float: left;
                            width: 650px;
                            padding: 0 4px 0 8px;

                            dl {
                                border-top: 1px solid #eee;
                                padding: 6px 0;
                                overflow: hidden;
                                zoom: 1;

                                .fore {   
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
            .cur{    //高量的顏色
                background-color: skyblue;
            }
            
        }
        
        .sort-enter,.sort-leave-to{    //動畫
            height:0;
        }
        .sort-enter-active,.sort-leave-active{    //中間動畫
            transition: .3s linear;            
        }
        .sort-enter-to,.sort-leave{    
            height:461px;
        }
    }
}
</style>