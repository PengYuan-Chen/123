<template>
<div class="register-container">
    <!-- 注冊內容 -->
    <div class="register">
      <h3>注冊新用戶
        <span class="go">我有賬號，去 <a href="login.html" target="_blank">登陸</a>
        </span>
      </h3>
      <div class="content">
        <label>手機號:</label>
        <!--name:要驗證的是哪一項
          v-validate是否必須，驗證規則
          -->
        <input placeholder="請輸入你的手機號" v-model="phone" name="phone"   
               v-validate="{required:true,regex:/^09\d{8}$/}"
               :class="{invalid:errors.has('phone')}">
        <span class="error-msg">{{errors.first("phone")}}</span>
      </div>
      <div class="content">
        <label>驗證碼:</label>
        <input placeholder="請輸入驗證碼" v-model="code" name="code"   
               v-validate="{required:true,regex:/^\d{6}$/}"
               :class="{invalid:errors.has('code')}">
        <button style="width:100px;height:38px" @click="getCode">獲取驗證碼</button>
        <img ref="code" src="http://182.92.128.115/api/user/passport/code" alt="code">
        <span class="error-msg">{{errors.first("code")}}</span>
      </div>
      <div class="content">
        <label>登錄密碼:</label>
        <input placeholder="請輸入你的登入密碼" v-model="password" name="password"   
               v-validate="{required:true,regex:/^[0-9A-Za-z]{8,20}$/}"
               :class="{invalid:errors.has('password')}">
               <span class="error-msg">{{errors.first("password")}}</span>
      </div>
      <div class="content">
        <label>確認密碼:</label>
        <input placeholder="請輸入確認密碼" v-model="password1" name="password1"   
               v-validate="{required:true,is:password}"
               :class="{invalid:errors.has('password1')}">
        <span class="error-msg">{{errors.first("password1")}}</span>
      </div>
      <div class="controls">
        <input type="checkbox" v-model="agree" name="agree"   
               v-validate="{required:true,'eunha':true}"
               :class="{invalid:errors.has('password1')}">
        <span>同意協議並注冊《尚品匯用戶協議》</span>
        <span class="error-msg">{{errors.first("agree")}}</span>
      </div>
      <div class="btn">
        <button @click="userRegister">完成注冊</button>
      </div>
    </div>

    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>關於我們</li>
        <li>聯系我們</li>
        <li>聯系客服</li>
        <li>商家入駐</li>
        <li>營銷中心</li>
        <li>手機尚品匯</li>
        <li>銷售聯盟</li>
        <li>尚品匯社區</li>
      </ul>
      <div class="address">地址：北京市昌平區宏福科技園綜合樓6層</div>
      <div class="beian">京ICP備19006430號
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Register',
    data(){
      return{
        phone:'',    //手機
        code:'',    //驗證碼
        password:'',    //密碼
        password1:'',    //密碼驗證
        agree:true    //同意
      }
    },
    methods:{
      getCode(){
        if(this.phone){
          this.$store.dispatch('getCode',this.phone).then((res)=>{
            if(res==1){
              this.code=this.$store.state.user.code;    //獲取驗證碼存起來
            }
          })
        }                 
      },
      userRegister(){
        //全不驗證通過才服務氣發請求
        //回傳成功true/失敗false
        this.$validator.validateAll().then((res)=>{
          if(res==true){
            this.$router.push({
                name:'login'
              })
          }else{
            alert('註冊失敗')
          }
        });
 
        /*const {phone,code,password}=this;
        //都要不為空
        if(phone&&code&&password){
          this.$store.dispatch('userRegister',{phone,code,password}).then((res)=>{
            if(res==1){
              //註冊成功後跳到login
              this.$router.push({
                name:'login'
              })
            }else{
              alert('註冊失敗')
            }
          })
        }  */ 
      }
    }
  }
</script>

<style lang="less" scoped>
  .register-container {
    .register {
      width: 1200px;
      height: 445px;
      border: 1px solid rgb(223, 223, 223);
      margin: 0 auto;

      h3 {
        background: #ececec;
        margin: 0;
        padding: 6px 15px;
        color: #333;
        border-bottom: 1px solid #dfdfdf;
        font-size: 20.04px;
        line-height: 30.06px;

        span {
          font-size: 14px;
          float: right;

          a {
            color: #e1251b;
          }
        }
      }

      div:nth-of-type(1) {
        margin-top: 40px;
      }

      .content {
        padding-left: 390px;
        margin-bottom: 18px;
        position: relative;

        label {
          font-size: 14px;
          width: 96px;
          text-align: right;
          display: inline-block;
        }

        input {
          width: 270px;
          height: 38px;
          padding-left: 8px;
          box-sizing: border-box;
          margin-left: 5px;
          outline: none;
          border: 1px solid #999;
        }

        img {
          vertical-align: sub;
        }

        .error-msg {
          position: absolute;
          top: 100%;
          left: 495px;
          color: red;
        }
      }

      .controls {
        text-align: center;
        position: relative;

        input {
          vertical-align: middle;
        }

        .error-msg {
          position: absolute;
          top: 100%;
          left: 495px;
          color: red;
        }
      }

      .btn {
        text-align: center;
        line-height: 36px;
        margin: 17px 0 0 55px;

        button {
          outline: none;
          width: 270px;
          height: 36px;
          background: #e1251b;
          color: #fff !important;
          display: inline-block;
          font-size: 16px;
        }
      }
    }

    .copyright {
      width: 1200px;
      margin: 0 auto;
      text-align: center;
      line-height: 24px;

      ul {
        li {
          display: inline-block;
          border-right: 1px solid #e4e4e4;
          padding: 0 20px;
          margin: 15px 0;
        }
      }
    }
  }
</style>