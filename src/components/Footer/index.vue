<template>
<div class="footer">
    <div class="footer-container">
        <div class="footerList">
            <div class="footerItem">
                <h4>購物指南</h4>
                <ul class="footerItemCon">
                    <li>購物流程</li>
                    <li>會員介紹</li>
                    <li>生活旅行/團購</li>
                    <li>常見問題</li>
                    <li>購物指南</li>
                </ul>

            </div>
            <div class="footerItem">
                <h4>配送方式</h4>
                <ul class="footerItemCon">
                    <li>上門自提</li>
                    <li>211限時達</li>
                    <li>配送服務查詢</li>
                    <li>配送費收取標準</li>
                    <li>海外配送</li>
                </ul>
            </div>
            <div class="footerItem">
                <h4>支付方式</h4>
                <ul class="footerItemCon">
                    <li>貨到付款</li>
                    <li>在線支付</li>
                    <li>分期付款</li>
                    <li>郵局匯款</li>
                    <li>公司轉賬</li>
                </ul>
            </div>
            <div class="footerItem">
                <h4>售後服務</h4>
                <ul class="footerItemCon">
                    <li>售後政策</li>
                    <li>價格保護</li>
                    <li>退款說明</li>
                    <li>返修/退換貨</li>
                    <li>取消訂單</li>
                </ul>
            </div>
            <div class="footerItem">
                <h4>特色服務</h4>
                <ul class="footerItemCon">
                    <li>奪寶島</li>
                    <li>DIY裝機</li>
                    <li>延保服務</li>
                    <li>尚品匯E卡</li>
                    <li>尚品匯通信</li>
                </ul>
            </div>
            <div class="footerItem">
                <h4>幫助中心</h4>
            </div>
        </div>
        <div class="copyright">
            <ul class="helpLink">
                <li>關於我們
                    <span class="space"></span>
                </li>
                <li>聯系我們
                    <span class="space"></span>
                </li>
                <li>關於我們
                    <span class="space"></span>
                </li>
                <li>商家入駐
                    <span class="space"></span>
                </li>
                <li>營銷中心
                    <span class="space"></span>
                </li>
                <li>友情鏈接
                    <span class="space"></span>
                </li>
                <li>關於我們
                    <span class="space"></span>
                </li>
                <li>營銷中心
                    <span class="space"></span>
                </li>
                <li>友情鏈接
                    <span class="space"></span>
                </li>
                <li>關於我們</li>
            </ul>
            <p>地址：桃園市大園區</p>
            <p>下埔路</p>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name:'Footer'
}
</script>

<style lang="less">
.footer {
    background-color: #eaeaea;

    .footer-container {
        width: 1200px;
        margin: 0 auto;
        padding: 0 15px;

        .footerList {
            padding: 20px;
            border-bottom: 1px solid #e4e1e1;
            border-top: 1px solid #e4e1e1;
            overflow: hidden;
            padding-left: 40px;

            .footerItem {
                width: 16.6666667%;
                float: left;

                h4 {
                    font-size: 14px;
                }

                .footerItemCon {
                    li {
                        line-height: 18px;
                    }
                }

                &:last-child img {
                    width: 121px;
                }
            }
        }

        .copyright {
            padding: 20px;

            .helpLink {
                text-align: center;

                li {
                    display: inline;

                    .space {
                        border-left: 1px solid #666;
                        width: 1px;
                        height: 13px;
                        background: #666;
                        margin: 8px 10px;
                    }
                }
            }

            p {
                margin: 10px 0;
                text-align: center;
            }
        }
    }
}
</style>