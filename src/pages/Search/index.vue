<template>
  <div>
    <typeNav />
    <div class="main">
      <div class="py-container">
        <!--bread麵包屑-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <li class="with-x" v-if="searchParams.categoryName">{{searchParams.categoryName}}<i @click="removeName">×</i></li>
            <li class="with-x" v-if="searchParams.keyword">{{searchParams.keyword}}<i @click="removeParams">×</i></li>
            <li class="with-x" v-if="searchParams.trademark">{{searchParams.trademark.split(':')[1]}}<i @click="removeTrade">×</i></li>
            <li class="with-x" v-for="(props,i) in searchParams.props" :key="i">{{props.split(':')[1]}}<i @click="removeProps(i)">×</i></li>
          </ul>
        </div>

        <!--selector中間那一塊-->
        <SearchSelector @getTrad="getTrade" @getAtr="getAttr"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!--中間列表-->
              <ul class="sui-nav">
                <li :class="{active:isOne}" @click="changeOrder(1)">
                  <a href="#">综合<span v-show="isOne">{{isUp}}</span></a>
                </li>            
               
                <li :class="{active:isTwo}" @click="changeOrder(2)">
                  <a href="#">价格<span v-show="isTwo">{{isUp}}</span></a>
                </li>
              </ul>
            </div>
          </div>
          <!--下面產品-->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(good,index) in goodsList" :key="index">
                <div class="list-wrap">
                  <div class="p-img">
                    <!--路由跳轉帶參數-->
                     <router-link :to="`/detail/${good.id}`">
                      <!--圖片懶加載使用直接把img:改成v-lazy-->
                        <img v-lazy="good.defaultImg" /> 
                     </router-link>
                      
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{good.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">
                      {{good.title}}
                    </a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <router-link class="sui-btn btn-bordered btn-danger" :to="`/detail/${good.id}`">
                     加入购物车 
                     </router-link>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>         
            </ul>
          </div>
          <!--換頁-->
          <pagination :pageNo="searchParams.pageNo"  :pageSize="searchParams.pageSize" :total="total" :continues="5" @getPageNo="getPage"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters,mapState} from 'vuex';
import SearchSelector from './SearchSelector/SearchSelector'
export default {
    name: 'Search',
    data(){
        return{
          //帶給server的參數,展示不同物品
          searchParams:{
            category1Id: "",
            category2Id: "",
            category3Id: "",
            categoryName: "",
            keyword: "",    //搜尋
            order: "1:desc",    //排序，示例: "1:desc"
            pageNo: 1,    //頁碼
            pageSize: 4,    //每頁展示的數量
            props: [],    //平台售賣屬性
            trademark: ""    //品牌
          }
        }
    },
    components: {
      SearchSelector
    },
    //在發請求前先拿到參數
    beforeMount(){
    //Object.assign自動把後面兩個對象合併到第一項(找key相同的合併)
      Object.assign(this.searchParams,this.$route.query,this.$route.params)
      //this.searchParams.category1Id=this.$route.query.category1Id   不好的寫法太麻煩
    },
    //拿到參數後才能請求服務器
    mounted(){
      //一上來先請求一次
      this.getData()
    },    
    computed:{
        //getters取得方式是陣列，不分home跟search
        ...mapGetters(['goodsList']),
        //order有1的情況
        isOne(){
          return this.searchParams.order.indexOf('1')!=-1
        },
        //order有2的情況
        isTwo(){
          return this.searchParams.order.indexOf('2')!=-1
        },
        isUp(){
          if(this.searchParams.order.indexOf('desc')!=-1){
            return '⬇'
          }else{
            return '⬆'
          }          
        }, 
        ...mapState({total:s=>s.search.searchList.total})
        
    },
    methods:{
        //把請求放在函數才可以使用多次，參數是data裡面的那些
        getData(){
            this.$store.dispatch('getSearchList',this.searchParams)
        },
        //點叉叉移除麵包屑typenav的
        removeName(){
            this.searchParams.categoryName=undefined; //參數可有可無 undefined就不會帶給服務器，效能較好  
            this.searchParams.category1Id=undefined;
            this.searchParams.category2Id=undefined;
            this.searchParams.category3Id=undefined;
            //this.getData();    //好像可有可無
            //移除後網址要改變，需要這樣改(params參數要保留不能不見)         
            this.$router.push({name:'search',params:this.$route.params});
        },
        removeParams(){
            this.searchParams.keyword=undefined;
            this.getData();      //返回的是全空的資料，呈現預設頁面，但網址上還有query參數
            //有query的情況下執行重新請求一次才會再呈現有query的頁面 
            if(this.$route.query){   
                this.$router.push({
                  name:'search',
                  query:this.$route.query
                })
            }     
        },
        getTrade(trade){
          //searchParams.trademark是字串
          this.searchParams.trademark=`${trade.tmId}:${trade.tmName}`;
          this.getData()
        },
        removeTrade(){
          this.searchParams.trademark=undefined;
          this.getData(); 
        },
        getAttr(attr,atrval){
          //先整理參數 ["属性ID:属性值:属性名"]
          let props=`${attr.attrId}:${atrval}:${attr.attrName}`; 
          if(this.searchParams.props.indexOf(props)==-1){
              this.searchParams.props.push(props); 
              this.getData(); 
          }            
        },
        removeProps(i){
          this.searchParams.props.splice(i,1)    //移除陣列元素
          this.getData(); 
        },
        //判斷排序方式 flag是區分點擊了哪一個
        changeOrder(flag){
          let order=this.searchParams.order
          if(flag==order.split(':')[0]){   //點同一個
              order=`${flag}:${order.split(':')[1]=='aesc'?'desc':'aesc'}`;
              this.searchParams.order=order
              this.getData(); 
          }else if(flag!=order.split(':')[0]){    //點不同個
              order=`${flag}:${order.split(':')[1]}`;
              this.searchParams.order=order
              this.getData(); 
          }
        },
        getPage(pageNo){
          this.searchParams.pageNo=pageNo;
          this.getData()
        }
    },
    watch:{
      //路徑有改就會執行，變化再發請求
      //不用深度監聽
      $route:{    
        handler(nval,oval){
          Object.assign(this.searchParams,this.$route.query,this.$route.params)
          this.getData();
          //每次發請求都把它清空
          this.searchParams.category1Id='';
          this.searchParams.category2Id='';
          this.searchParams.category3Id='';
           
        }    
      }
    }
  }
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        .page {
          width: 733px;
          height: 66px;
          overflow: hidden;
          float: right;

          .sui-pagination {
            margin: 18px 0;

            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 490px;
              float: left;

              li {
                line-height: 18px;
                display: inline-block;

                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }

                &.active {
                  a {
                    background-color: #fff;
                    color: #e1251b;
                    border-color: #fff;
                    cursor: default;
                  }
                }

                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }

                &.disabled {
                  a {
                    color: #999;
                    cursor: default;
                  }
                }

                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }

                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }

            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
      }
    }
  }
</style>