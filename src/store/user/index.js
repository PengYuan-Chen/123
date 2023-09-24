import {reqGetCode, reqUserRegister,reqLogin,reqUserInfo,reqLogout} from '@/api'


const actions={ 
    //獲取驗證碼(參數:手機號)
    getCode(context,phone){
        return reqGetCode(phone).then((res)=>{
            if(res.code==200){
                context.commit('GETCODE',res.data)
                return 1
            }else{
                return 2
            }
        })
    },
    //註冊
    userRegister(context,user){
        return reqUserRegister(user).then((res)=>{
            if(res.code==200){            
                return 1
            }else{
                return 2
            }
        })
    },
    //登入
    userLogin(context,user){
        return reqLogin(user).then((res)=>{
            //返回data會包含一個token(用戶唯一id)，類似uuid，但是是服務器自動返回的
            //會用token進行用戶名的展示
            context.commit('USERLOGIN',res.data.token)    //先給token一個值不然一開始他是空的
            localStorage.setItem('TOKEN',res.data.token)  //存在本地端就不會不見          
            if(res.code==200){        
                return 1
            }else{
                return 2
            }
        })
    },
    //用token獲取信息
    getUserInfo(context){ 
        return reqUserInfo().then((res)=>{
            if(res.code==200){    
                context.commit('GETUSERINFO',res.data); 
                return 1;   
            }else{
                return 2;
            }
        })     
    },
    //登出(刪除各種信息)
    userLogout(context){
        return reqLogout().then((res)=>{
            if(res.code==200){    
                context.commit('USERLOGOUT');    
                return 1
            }else{
                return 2
            }
        })
    },
}
const mutations={
    GETCODE(state,code){
        state.code=code
    },
    USERLOGIN(state,token){
        state.token=token
    },
    GETUSERINFO(state,userinfo){
        state.userinfo=userinfo
    },
    USERLOGOUT(state){
        state.token='';
        state.userinfo={};
        localStorage.removeItem('TOKEN');
   }

}
const state={
    code:'',
    token:localStorage.getItem('TOKEN'),    //永久保存token
    userinfo:{}
}
 
const getters={

}

export default {
    actions,mutations,state,getters
}