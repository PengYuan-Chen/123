<template>
<div class="outer">
    <!-- 头部 -->
    <header class="header">
        <!-- 头部的第一行 -->
        <div class="top">
            <div class="container">
                <div class="loginList">
                    <p>尚品汇欢迎您！</p>
                    <p v-if="!userName" >
                        <span>请</span>
                        <router-link to="/login">登入</router-link>
                        <router-link to="/register">免費註冊</router-link>
                    </p>
                    <p v-else>
                        <a>{{userName}}</a>
                        <a  class="register" @click="userLogout" >退出登入</a>
                    </p>
                </div>
                <div class="typeList">
                    <router-link to="/center">我的訂單</router-link>
                    <router-link to="/shopcart">我的购物车</router-link>
                    <a href="###">我的尚品汇</a>
                    <a href="###">尚品汇会员</a>
                    <a href="###">企业采购</a>
                    <a href="###">关注尚品汇</a>
                    <a href="###">合作招商</a>
                    <a href="###">商家后台</a>
                </div>
            </div>
        </div>
        <div class="bottom">
                <h1 class="logoArea">
                    <a class="logo" title="尚品汇" href="###" target="_blank">
                        <router-link to="/home"><img src="./images/logo.png" alt=""></router-link>                      
                    </a>
                </h1>
                <div class="searchArea">
                    <form action="###" class="searchForm">
                        <input type="text" id="autocomplete" class="input-error input-xxlarge" v-model="keyword" />
                        <button class="sui-btn btn-xlarge btn-danger" @click="goSearch" type="button">搜索</button>
                    </form>
                </div>
            </div>
    </header>
</div> 
</template>

<script>
 
export default {
    name:'Header',
    data(){
        return{
            keyword:''
        }
    },
    methods:{
        goSearch(){
            /*
            params要加上佔位符才能接收參數
            問:沒加的話可以傳一次，為什麼?
            */ 
            let location={name:'search',params:{keyword:this.keyword}}          
            if(this.$route.query){
                location.query=this.$route.query
            }          
            this.$router.push(location);
            this.keyword='' 
        },
       userLogout(){
        //登出需要做的事1.請求server 2.清除token
            this.$store.dispatch('userLogout');
            this.$router.push('/home')
        }
    },
    computed:{
        //取得用戶名
        userName(){
            return this.$store.state.user.userinfo.name;
        }
    }
}
</script>

<style scoped lang="less">
.header {
    &>.top {
        background-color: #eaeaea;
        height: 30px;
        line-height: 30px;

        .container {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .loginList {
                float: left;

                p {
                    float: left;
                    margin-right: 10px;

                    .register {
                        border-left: 1px solid #b3aeae;
                        padding: 0 5px;
                        margin-left: 5px;
                    }
                }
            }

            .typeList {
                float: right;

                a {
                    padding: 0 10px;

                    &+a {
                        border-left: 1px solid #b3aeae;
                    }
                }

            }

        }
    }

    &>.bottom {
        width: 1200px;
        margin: 0 auto;
        overflow: hidden;

        .logoArea {
            float: left;

            .logo {
                img {
                    width: 175px;
                    margin: 25px 45px;
                }
            }
        }

        .searchArea {
            float: right;
            margin-top: 35px;

            .searchForm {
                overflow: hidden;

                input {
                    box-sizing: border-box;
                    width: 490px;
                    height: 32px;
                    padding: 0px 4px;
                    border: 2px solid #ea4a36;
                    float: left;

                    &:focus {
                        outline: none;
                    }
                }

                button {
                    height: 32px;
                    width: 68px;
                    background-color: #ea4a36;
                    border: none;
                    color: #fff;
                    float: left;
                    cursor: pointer;

                    &:focus {
                        outline: none;
                    }
                }
            }
        }
    }
}
</style>