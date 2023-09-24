//home模塊小倉庫
import { reqCategoryList,reqGetBannerList, reqGetFloorList} from '@/api'    //具名匯入方法


 
//actions處理業務邏輯
const actions={
    //用之前創的對象向server發請求，在actions中發請求
    categoryList(context){   
        reqCategoryList().then((res)=>{
            let result=res;
            if(result.code===200){
                result.data.pop();
                context.commit('CATEGORYLIST',result.data)
            }
        }); 
    },
    //mock請求banner
    getBannerList(context){  
        reqGetBannerList().then((res)=>{
            let result=res;
            if(result.code===200){
                context.commit('GETBANNERLIST',result.data)
            }
        });
    },
    //mock請求floor
    getFloorList(context){ 
        reqGetFloorList().then((res)=>{
            let result=res;
            if(result.code===200){
                context.commit('GETFLOORLIST',result.data)
            }
        });
    }
}

//mutations唯一修改state數據的地方
const mutations={    
    CATEGORYLIST(state,result){    //把值存放在state中
        state.categoryList=result     
    },
    GETBANNERLIST(state,result){
        state.bannerList=result
    },
    GETFLOORLIST(state,result){
        state.floorList=result
    }
};
const state={
    categoryList:[],
    bannerList:[],
    floorList:[],
    
};
const getters={};

export default {
    actions,mutations,state,getters
}