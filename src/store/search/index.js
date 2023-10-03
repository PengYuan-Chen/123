import {reqSearchInfo} from '@/api'
const actions={
    //請求search模塊數據
    //因為要傳一個參數，由dispatch傳一個過來para
    getSearchList(context,para){
        reqSearchInfo(para).then((res)=>{
            let result=res;
            if(result.code===200){
                context.commit('GETSEARCHLIST',result.data)
            }
        }); 
    }
}
const mutations={
    GETSEARCHLIST(state,result){     
        state.searchList=result     
    }
}
const state={
    searchList:{}  //根據返回數據決定預設值
}
//簡化倉庫數據
const getters={
    //這邊可能有問題，以防出現網路問題至少回傳空
    attrsList(state){    //平台售賣屬性
        return state.searchList.attrsList||[]
    },
    goodsList(state){    //產品
        return state.searchList.goodsList||[]
    },
    trademarkList(state){    //商標
        return state.searchList.trademarkList||[]
    }
}

export default {
    actions,mutations,state,getters
}