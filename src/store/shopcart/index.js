import {reqCartList,reqDeleteById,reqUpdateById} from '@/api'


const actions={ 
    //獲取購物車列表
    getCartList(context){
        reqCartList().then((res)=>{
            let result=res;
            if(result.code===200){
                context.commit('GETCARTLIST',result.data)
            }
        }); 
    },
    //刪除某一項商品
    deleteCartById(context,skuId){
        return reqDeleteById(skuId).then((res)=>{
            let result=res;
            if(result.code===200){
                return 1
            }else{
                return 2
            }
        }); 
    },
    //打勾還是不打勾
    updateCartById(context,{skuId,isChecked}){      
        return reqUpdateById(skuId,isChecked).then((res)=>{           
            let result=res;
            if(result.code===200){         
                return 1
            }else{
                return 2
            }
        }); 
    },
    //打勾的都刪除
    deleteAllChecked(context){
        //在action中調另一個action
        context.getters.cartList.cartInfoList.forEach(item=>{
            if(item.isChecked==1){
                context.dispatch('deleteCartById',item.skuId);    
            }           
        });   
    },
    //全選或全不選
    updateAllCartChecked(context,isCheck){
        context.getters.cartList.cartInfoList.forEach((item)=>{
            context.dispatch('updateCartById',{skuId:item.skuId,isChecked:isCheck});        
        }   
    )}
}
const mutations={
    GETCARTLIST(state,cartList){
        state.cartList=cartList
    }
}
const state={
    cartList:[]
}
 
const getters={
    cartList(state){
        return state.cartList[0] || {}
    }
}

export default {
    actions,mutations,state,getters
}