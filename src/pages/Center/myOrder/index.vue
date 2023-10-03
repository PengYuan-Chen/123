<template>
 <div class="order-right">
          <div class="order-content">
            <div class="title">
              <h3>我的訂單</h3>
            </div>
            <div class="chosetype">
              <table>
                <thead>
                  <tr>
                    <th width="29%">商品</th>
                    <th width="31%">訂單詳情</th>
                    <th width="13%">收貨人</th>
                    <th>金額</th>
                    <th>狀態</th>
                    <th>操作</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div class="orders">

              <table class="order-item" >
                <thead>
                  <tr>
                    <th colspan="5">
                      <span class="ordertitle">2017-02-11 11:59　訂單編號：7867473872181848 <span
                          class="pull-right delete"><img src="../images/delete.png"></span></span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td width="60%">
                      <div class="typographic">
                        <img src="../images/goods.png">
                        <a href="#" class="block-text">包郵 正品瑪姬兒壓縮面膜無紡布紙膜100粒 送泡瓶面膜刷噴瓶 新款</a>
                        <span>x1</span>
                        <a href="#" class="service">售後申請</a>
                      </div>
                    </td>
                    <td rowspan="2" width="8%" class="center">小麗</td>
                    <td rowspan="2" width="13%" class="center">
                      <ul class="unstyled">
                        <li>總金額¥138.00</li>
                        <li>在線支付</li>

                      </ul>
                    </td>
                    <td rowspan="2" width="8%" class="center">
                      <a href="#" class="btn">已完成 </a>
                    </td>
                    <td rowspan="2" width="13%" class="center">
                      <ul class="unstyled">
                        <li>
                          <a href="mycomment.html" target="_blank">評價|曬單</a>
                        </li>

                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td width="50%">
                      <div class="typographic">
                        <img src="../images/goods.png">
                        <a href="#" class="block-text">包郵 正品瑪姬兒壓縮面膜無紡布紙膜100粒 送泡瓶面膜刷噴瓶 新款</a>
                        <span>x1</span>
                        <a href="#" class="service">售後申請</a>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>

              <table class="order-item" v-for="(order) in orderList.records" :key="order.id">
                <thead>
                  <tr>
                    <th colspan="5">
                      <span class="ordertitle">{{order.createTime}}　訂單編號：{{order.tradeNo}} <span
                          class="pull-right delete"><img src="../images/delete.png"></span></span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td width="60%">
                      <div class="typographic">
                        <img src="../images/goods.png">
                        <a href="#" class="block-text">包郵 正品瑪姬兒壓縮面膜無紡布紙膜100粒 送泡瓶面膜刷噴瓶 新款</a>
                        <span>x1</span>
                        <a href="#" class="service">售後申請</a>
                      </div>
                    </td>
                    <td rowspan="2" width="8%" class="center">小麗</td>
                    <td rowspan="2" width="13%" class="center">
                      <ul class="unstyled">
                        <li>總金額¥138.00</li>
                        <li>在線支付</li>

                      </ul>
                    </td>
                    <td rowspan="2" width="8%" class="center">
                      <a href="#" class="btn">已完成 </a>
                    </td>
                    <td rowspan="2" width="13%" class="center">
                      <ul class="unstyled">
                        <li>
                          <a href="mycomment.html" target="_blank">評價|曬單</a>
                        </li>

                      </ul>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>
            <div class="choose-order">
              <div class="pagination">
                <ul>
                  <li class="prev disabled">
                    <a href="javascript:">«上一頁</a>
                  </li>
                  <li class="page actived">
                    <a href="javascript:">1</a>
                  </li>
                  <li class="page">
                    <a href="javascript:">2</a>
                  </li>
                  <li class="page">
                    <a href="javascript:">3</a>
                  </li>
                  <li class="page">
                    <a href="javascript:">4</a>
                  </li>

                  <li class="next disabled">
                    <a href="javascript:">下一頁»</a>
                  </li>
                </ul>
                <div>
                  <span>&nbsp;&nbsp;&nbsp;&nbsp;共2頁&nbsp;</span>
                </div>
              </div>
            </div>
          </div>
          <!--猜你喜歡-->
          <div class="like">
            <h4 class="kt">猜你喜歡</h4>
            <ul class="like-list">
              <li class="likeItem">
                <div class="p-img">
                  <img src="../images/itemlike01.png" />
                </div>
                <div class="attr">
                  <em>DELL戴爾Ins 15MR-7528SS 15英寸 銀色 筆記本</em>
                </div>
                <div class="price">
                  <em>¥</em>
                  <i>3699.00</i>
                </div>
                <div class="commit">已有6人評價
                </div>
              </li>
              <li class="likeItem">
                <div class="p-img">
                  <img src="../images/itemlike02.png" />
                </div>
                <div class="attr">
                  Apple蘋果iPhone 6s/6s Plus 16G 64G 128G
                </div>
                <div class="price">
                  <em>¥</em>
                  <i>4388.00</i>
                </div>
                <div class="commit">已有700人評價
                </div>
              </li>
              <li class="likeItem">
                <div class="p-img">
                  <img src="../images/itemlike03.png" />
                </div>
                <div class="attr">DELL戴爾Ins 15MR-7528SS 15英寸 銀色 筆記本
                </div>
                <div class="price">
                  <em>¥</em>
                  <i>4088.00</i>
                </div>
                <div class="commit">已有700人評價
                </div>
              </li>
              <li class="likeItem">
                <div class="p-img">
                  <img src="../images/itemlike04.png" />
                </div>
                <div class="attr">DELL戴爾Ins 15MR-7528SS 15英寸 銀色 筆記本
                </div>
                <div class="price">
                  <em>¥</em>
                  <i>4088.00</i>
                </div>
                <div class="commit">已有700人評價
                </div>
              </li>
            </ul>
          </div>
        </div>  
</template>

<script>
export default {
    name:'myOrder',
    data(){
      return{
        page:1,
        limit:3,
        orderList:{}
      }
    },
    mounted(){
      this.getData();
    },
    methods:{
      getData(){
        const {page,limit}=this
        this.$api.reqMyOrderList(page,limit).then((res)=>{
          if(res.code==200){
            this.orderList=res.data
          }
        }) 
      }
    }
}
</script>

<style>

</style>