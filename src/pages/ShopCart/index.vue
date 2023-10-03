<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">單價（元）</div>
        <div class="cart-th4">數量</div>
        <div class="cart-th5">小計（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in cartInfoList" :key="cart.id">
          <li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked==1" @change="updateCheck(cart,$event)" >
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl">
            <div class="item-msg">{{cart.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{cart.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="handler('minus',0,cart)">-</a>
            <input autocomplete="off" type="text"  minnum="1" class="itxt" :value="cart.skuNum" @change="handler('change',$event.target.value*1,cart)" />
            <a href="javascript:void(0)" class="plus" @click="handler('add',0,cart)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cart.skuNum*cart.skuPrice}}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCartList(cart.skuId)">刪除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked='isAllChecked && cartInfoList.length!=0' @change="updateAllCartChecked($event)">
        <span>全選</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteAllChecked">刪除選中的商品</a>
        <a href="#none">移到我的關注</a>
        <a href="#none">清除下櫃商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已選擇
          <span>0</span>件商品</div>
        <div class="sumprice">
          <em>總價（不含運費） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" target="_blank" @click="$router.push('/trade')">結算</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import _ from 'lodash'
  export default {
    name: 'ShopCart',
    mounted(){
      this.getData()
    },
    methods:{
      getData(){
          this.$store.dispatch('getCartList') 
      },
      //修改產品個數，發請求修改state的值(用到節流避免點太快)
      handler:_.throttle(function(type,disNum,cart){
      //type表示區分三個元素
      //disNum是:+ 變化量正(1) ||  - 變化量負(-1) || input總個數
      //cart表當前產品
        switch(type){
          case "add":
            disNum=1;
            break;
          case "minus":
            disNum=cart.skuNum>1?-1:0;
            break;   
          case "change":
            if(!isNaN(disNum) && disNum>0){
              disNum=parseInt(disNum)
              disNum=disNum-cart.skuNum;
            }else{
              disNum=0
            }           
            break;
        }
        //請求服務器修改數量
        this.$store.dispatch('reqAddOrder',{skuId:cart.skuId,skuNum:disNum}).then((res)=>{
          if(res==1){
            //獲取最新數量
            this.getData();
          }
        })
      },500),
      //刪除產品
      deleteCartList(skuId){
        this.$store.dispatch('deleteCartById',skuId).then((res)=>{
          if(res==1){
            this.getData();
          }else{
            alert('請求錯誤')
          }
        })
      },
      //產品勾選狀態
      updateCheck(cart,$event){
        let isChecked=$event.target.checked?'1':'0'
        this.$store.dispatch('updateCartById',{skuId:cart.skuId,isChecked}).then((res)=>{
          if(res==1){
            this.getData();
          }else{
            console.log('錯誤')
          }
        })           
      },
      //刪除全部選中產品
      deleteAllChecked(){
        /*
        第一種方法
        this.cartInfoList.forEach((cart)=>{
            if(cart.isChecked==1){
              this.deleteCartList(cart.skuId)
            }
        })*/
        try{
          this.$store.dispatch('deleteAllChecked') 
          this.getData();
        }catch(err){    //可能會有報錯的情況如沒有勾的確要刪除
          alert(err)
        }       
      },
      updateAllCartChecked($event){
          let isCheck=$event.target.checked?'1':'0'
          try{
              this.$store.dispatch('updateAllCartChecked',isCheck) 
              this.getData();
          }catch(err){
              alert(err)
          }
          
       
      }
    },
    computed:{
        ...mapGetters(['cartList']),
        cartInfoList(){
          return this.cartList.cartInfoList||[]
        },
        //計算產品總價
        totalPrice(){
          let sum=0;
          this.cartInfoList.forEach(cart=>{
              sum+=cart.skuNum*cart.skuPrice
          });
          return sum
        },
        //全選才打勾
        isAllChecked(){
          return this.cartInfoList.every(cart=>cart.isChecked==1)
        }
    }
  }
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }


            .item-txt {
              text-align: center;
            }
           

          .cart-list-con4 {
            width:10%;

          }
        
          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13%;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>