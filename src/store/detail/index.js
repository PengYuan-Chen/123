//home模塊小倉庫
import {reqGoodInfo,reqAddOrder} from '@/api'    //具名匯入方法
import {getUUID} from '@/utils/uuid_token'    //生成一個隨機id，存在本地端

 
//actions處理業務邏輯
const actions={
    getGoodInfo(context,goods){  
        reqGoodInfo(goods).then((res)=>{
            let result=res;
            if(result.code===200){
                context.commit('GETGOODINFO',result.data)
            }
        });
    },
    reqAddOrder(context,{skuId,skuNum}){  
        return reqAddOrder({skuId,skuNum}).then((res)=>{
            let result=res;
            if(result.code===200){
                return 1
            }else{
                return 2
            }
        });
    },

}

//mutations唯一修改state數據的地方
const mutations={    
    GETGOODINFO(state,goodInfo){
        state.goodInfo=goodInfo
    }
};
const state={
    goodInfo:{},
    //當跳到購物車畫面時，請求頭有這個uuid的話就能獲取資料，否則會回傳空陣列
    uuid_token:getUUID()    //生成一個隨機id，表示一個人
    
};
const getters={
    //麵包屑簡化
    categoryView(state){
        //當服務器還沒返回時給他一個空才不會報錯，但沒加不會影響程序
        return state.goodInfo.categoryView||{}
    },
    //圖片簡化
    skuInfo(state){
        return state.goodInfo.skuInfo||{}
    },
    //售賣屬性簡化
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList||[]
    }
};

export default {
    actions,mutations,state,getters
}