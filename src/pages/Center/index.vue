<template>
  <div class="order-main">
    <div class="container">
      <div class="order-body">
        <!--左側列表-->
        <div class="order-left">
          <dl>
            <dt><i>·</i> 訂單中心</dt>
            <dd>
              <router-link to="/center/myorder">我的訂單</router-link>            
            </dd>
            <dd>
              <router-link to="/center/grouporder">團購訂單</router-link>               
            </dd>
            <dd>本地生活訂單 </dd>
            <dd>我的預售</dd>
            <dd>評價曬單</dd>
            <dd>取消訂單記錄</dd>
          </dl>
          <dl>
            <dt><i>·</i> 關注中心</dt>
            <dd>關注的商品 </dd>
            <dd>關注的店鋪</dd>
            <dd>關注的專輯 </dd>
            <dd>關注的品牌</dd>
            <dd>關注的活動 </dd>
            <dd>瀏覽歷史</dd>
          </dl>
          <dl>
            <dt><i>·</i> 特色業務</dt>
            <dd>我的營業廳 </dd>
            <dd>京東通信 </dd>
            <dd>定期送 </dd>
            <dd>京東代下單</dd>
            <dd>我的回收單 </dd>
            <dd>節能補貼</dd>
            <dd>醫藥服務 </dd>
            <dd>流量加油站 </dd>
            <dd>黃金托管</dd>
          </dl>
          <dl>
            <dt><i>·</i> 客戶服務</dt>
            <dd>返修退換貨 </dd>
            <dd>價格保護 </dd>
            <dd>意見建議 </dd>
            <dd>購買咨詢 </dd>
            <dd>交易糾紛 </dd>
            <dd>我的發票</dd>
          </dl>
          <dl>
            <dt><i>·</i> 設置</dt>
            <dd>個人信息 </dd>
            <dd>收貨地址 </dd>
          </dl>
        </div>
        <!-- 右側內容 -->
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script> 

  export default {
    name: 'Center',

  }
</script>

<style lang="less" >
  .order-main {
    .container {
      margin: 0 auto;
      width: 1200px;

      .order-body {
        padding: 10px;
        color: #333;

        &:after {
          content: "";
          display: block;
          clear: both;
        }

        //左边
        .order-left {
          float: left;
          width: 16.67%;

          dl {
            line-height: 28px;

            dt {
              font-weight: 700;
              padding: 5px;

              i {
                color: #77b72c;
              }
            }

            dd {
              margin: 0 0 6px;
              border-bottom: 1px solid #ededed;
              text-align: center;
            }
          }
        }

        //右边
        .order-right {
          float: right;
          width: 83.33%;

          //订单部分
          .order-content {
            margin: 0 20px;
            color: #666;

            //标题
            .title {
              margin-bottom: 22px;
              border: 1px solid #ddd;

              h3 {
                padding: 12px 10px;
                font-size: 15px;
                background-color: #f1f1f1;

              }
            }

            //表头
            .chosetype {
              margin-bottom: 15px;
              color: #666;

              table {
                border: 1px solid #e6e6e6;
                border-collapse: separate;
                border-radius: 2px;
                width: 100%;
                max-width: 100%;
                border-spacing: 0;

                th {
                  padding: 6px 8px;
                  color: #666;
                  font-weight: 700;
                  vertical-align: bottom;
                  background-color: #f4f4f4;
                  line-height: 18px;
                  border-bottom: 1px solid #e6e6e6;
                  font-size: 12px;
                  text-align: left;
                }
              }
            }

            // 表单内容
            .orders {
              font-size: 12px;

              a {
                &:hover {
                  color: #4cb9fc;
                }
              }

              table {
                border: 1px solid #e6e6e6;
                border-collapse: collapse;
                border-radius: 2px;
                width: 100%;
                margin-bottom: 18px;
                max-width: 100%;

                th {
                  padding: 6px 8px;
                  line-height: 18px;
                  text-align: left;
                  vertical-align: bottom;
                  background-color: #f4f4f4;
                  font-size: 12px;
                  color: #666;

                  .pull-right {
                    float: right;
                    cursor: pointer;

                    img {
                      margin-right: 10px;
                      vertical-align: middle;
                    }
                  }
                }

                td {
                  font-size: 12px;
                  color: #666;
                  padding: 6px 8px;
                  line-height: 18px;
                  text-align: left;
                  vertical-align: middle;
                  border: 1px solid #e6e6e6;

                  &.center {
                    text-align: center;
                  }

                  .typographic {
                    img {
                      float: left;
                      margin-right: 10px;
                    }

                    a {
                      float: left;
                      min-width: 80px;
                      max-width: 250px;
                      color: #e1251b;

                      &.service {
                        color: #666;
                      }
                    }

                    span {
                      float: left;
                      min-width: 80px;
                      max-width: 250px;
                      text-align: center;
                    }

                  }
                }

              }
            }

            // 分页
            .choose-order {
              .pagination {
                margin: 38px 0;

                ul {
                  font-size: 0;
                  display: inline-block;

                  li {
                    display: inline-block;
                    padding: 4px 9px;
                    font-size: 14px;
                    border: 1px solid #e0e9ee;

                    &.prev,
                    &.next {
                      background-color: #fafafa;
                    }

                    &.prev {
                      border-right-color: #28a3ef;
                    }

                    &.page {
                      border-color: #28a3ef;
                      border-left: 0;

                      &.actived {
                        background-color: #28a3ef;

                        a {
                          color: #fff;
                        }

                      }
                    }
                  }
                }

                div {
                  display: inline-block;
                  font-size: 14px;
                  color: #333;
                }
              }
            }
          }

          // 猜你喜欢
          .like {
            border: 1px solid #ddd;
            margin: 15px 20px;

            .kt {
              border-bottom: 1px solid #ddd;
              background: #f1f1f1;
              color: #666;
              margin: 0;
              padding: 12px;
              font-size: 15px;
            }

            .like-list {
              padding: 15px 11px;
              overflow: hidden;

              .likeItem {
                width: 25%;
                float: left;

                .p-img {
                  text-align: left;

                  img {
                    width: 167px;
                    height: 123px;
                  }
                }

                .attr {
                  padding: 0 15px;
                }

                .price {
                  padding: 0 15px;
                  font-size: 16px;
                  color: #c81623;
                  margin-bottom: 20px;
                }

                .commit {
                  padding: 0 15px;
                }
              }
            }
          }
        }
      }
    }
  }
</style>