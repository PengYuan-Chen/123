import {reqAddressInfo,reqOrderInfo} from '@/api'

//(統一用他提供的帳號)
const actions={ 
//獲取交易頁面用戶信息(登入才能獲取)
    getUserAddress(context){
        reqAddressInfo().then((res)=>{
            if(res.code==200){
                context.commit('GETUSERADDRERSS',res.data)
            }
        })
    },
    //獲取商品清單數據
    getOrderInfo(context){
        reqOrderInfo().then((res)=>{
            if(res.code==200){
                context.commit('GETORDERINFO',res.data)
            }
        })
    },

}
const mutations={
    GETUSERADDRERSS(state,address){
        state.address=address
    },
    GETORDERINFO(state,orderInfo){
        state.orderInfo=orderInfo
    }

}
const state={
    address:[],
    orderInfo:{}
}
 
const getters={

}

export default {
    actions,mutations,state,getters
}