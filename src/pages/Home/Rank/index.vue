<template>
<div class="rank">
            <div class="tab">
                <div class="tab-tit clearfix">
                    <a href="javascript:;" class="on">
                        <p class="img">
                            <i></i>
                        </p>
                        <p class="text">熱賣排行</p>
                    </a>
                    <a href="javascript:;">
                        <p class="img">
                            <i></i>
                        </p>
                        <p class="text">特價排行</p>
                    </a>
                    <a href="javascript:;">
                        <p class="img">
                            <i></i>
                        </p>
                        <p class="text">新品排行</p>
                    </a>
                </div>

            </div>
            <div class="content">
                <ul>
                    <li>
                        <div class="img-item">
                            <p class="tab-pic">
                                <a href="#">
                                    <img src="./images/ice.jpg" />
                                </a>
                            </p>
                            <div class="tab-info">
                                <div class="info-title">
                                    <a href="#">甜筒冰淇淋</a>
                                </div>
                                <p class="info-price">$100</p>
                            </div>
                        </div>
                        <div class="img-item">
                            <p class="tab-pic">
                                <a href="#">
                                    <img src="./images/donut.jpg" />
                                </a>
                            </p>
                            <div class="tab-info">
                                <div class="info-title">
                                    <a href="#">甜甜圈</a>
                                </div>
                                <p class="info-price">$30</p>
                            </div>
                        </div>
                        <div class="img-item">
                            <p class="tab-pic">
                                <a href="#">
                                    <img src="./images/donut1.jpg" />
                                </a>
                            </p>
                            <div class="tab-info">
                                <div class="info-title">
                                    <a href="#">綜合甜甜圈</a>
                                </div>
                                <p class="info-price">$100</p>
                            </div>
                        </div>
                        <div class="img-item">
                            <p class="tab-pic">
                                <a href="#">
                                    <img src="./images/sand.jpg" />
                                </a>
                            </p>
                            <div class="tab-info">
                                <div class="info-title">
                                    <a href="#">總匯三明治</a>
                                </div>
                                <p class="info-price">$3000</p>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>

</template>

<script>
export default {
    name:'Rank'
}
</script>

<style  scoped lang="less">
.rank {
    width: 1200px;
    margin: 0 auto;

    .tab {
        margin: 0 auto;
        overflow: hidden;
        width: 312px;

        .tab-tit {
            text-align: center;

            a {
                display: block;
                padding: 0 18px;
                float: left;
                text-decoration: none;
                font-size: 16px;
                color: #999;

                p {
                    margin: 5px 0;
                }

                .img {
                    i {
                        width: 35px;
                        height: 35px;
                        display: block;
                        background: url(./images/bg0.png);
                        margin-left: 10px;
                    }
                }

                .text {
                    line-height: 28px;
                }
            }

            .on {
                color: blue;

                .img {
                    i {
                        background-position: -35px 0;
                    }
                }
            }
        }
    }

    .content {
        overflow: hidden;
        padding: 10px;

        ul {
            li {
                overflow: hidden;
                list-style: none;
                line-height: 18px;

                .img-item {
                    border: 1px solid blue;
                    width: 269px;
                    float: left;
                    overflow: hidden;
                    margin: 0 12px 10px;
                    background: #fff;

                    .tab-pic {
                        width: 230px;
                        height: 210px;
                        overflow: hidden;
                        text-align: center;
                        margin: 5px auto 18px;

                        a {
                            img {
                                width: 200px;
                                height: 200px;
                            }
                        }
                    }

                    .tab-info {
                        background: #fafafa;

                        .info-title {
                            height: 50px;
                            line-height: 28px;
                            overflow: hidden;
                            margin: 0 auto;
                            padding-left: 10px;

                            a {
                                color: #333;
                                text-decoration: none;
                            }
                        }

                        .info-price {
                            font-size: 20px;
                            color: blue;
                            height: 35px;
                            padding-left: 10px;
                            display: block;
                            line-height: 24px;
                            margin: 10px auto 0;
                        }
                    }
                }
            }
        }
    }
}

</style>