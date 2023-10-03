//對api統一管理
import requests from './request'   

import mockRequests from './mock'

//三級連動接口
export const reqCategoryList=()=>    //具名匯出函式 
    requests({    //用requests對象發請求
        url:'/sinb/api/product/getBaseCategoryList',
        method:'get'
    })

//mock
export const reqGetBannerList=()=>    //具名匯出函式 
    mockRequests({    //用mockrequests對象發請求mock到mock服務器
        url:'/mock/banner',
        method:'get'
    })
    
//mock
export const reqGetFloorList=()=>    //具名匯出函式 
    mockRequests({    //用mockrequests對象發請求到mock服務器
        url:'/mock/floor',
        method:'get'
    })
//search組件的發請求，post、帶參數
//去獲取數據時記得要傳一個默認參數(至少要是空的)，才能獲取到
export const reqSearchInfo=(para)=>     
    requests({    
        url:'/sinb/api/list',
        method:'post',
        data:para
    })

//請求產品詳細訊息
export const reqGoodInfo=(skuId)=>     
    requests({    
        url:`/sinb/api/item/${skuId}`,
        method:'get'
    })

//請求購物車
export const reqAddOrder=({skuId,skuNum})=>     
    requests({    
        url:`/sinb/api/cart/addToCart/${skuId}/${skuNum}`,
        method:'post'
    })
//顯示購物車清單
export const reqCartList=()=>     
    requests({    
        url:`/sinb/api/cart/cartList`,
        method:'get'
    })
//刪除購物車某個物品
export const reqDeleteById=(skuId)=>     
    requests({    
        url:`/sinb/api/cart/deleteCart/${skuId}`,
        method:'delete'
    })
//切換商品選中狀態
export const reqUpdateById=(skuId,isChecked)=>     
    requests({    
        url:`/sinb/api/cart/checkCart/${skuId}/${isChecked}`,
        method:'get'
    })
//取的驗證碼
export const reqGetCode=(phone)=>     
    requests({    
        url:`/sinb/api/user/passport/sendCode/${phone}`,
        method:'get'
    })
//註冊
export const reqUserRegister=(data)=>     
    requests({    
        url:`/sinb/api/user/passport/register`,
        data:data,
        method:'post'
    })
//登入
export const reqLogin=(data)=>     
    requests({    
        url:`/sinb/api/user/passport/login`,
        data:data,
        method:'post'
    })
//用token取得個人資訊再展事
export const reqUserInfo=()=>     
    requests({    
        url:`/sinb/api/user/passport/auth/getUserInfo`,
        method:'get'
    })
//登出
export const reqLogout=()=>     
    requests({    
        url:`/sinb/api/user/passport/logout`,
        method:'get'
    })
//獲取用戶地址信息
export const reqAddressInfo=()=>     
    requests({    
        url:`/sinb/api/user/userAddress/auth/findUserAddressList`,
        method:'get'
    })
//獲取商品清單
export const reqOrderInfo=()=>     
    requests({    
        url:`/sinb/api/order/auth/trade`,
        method:'get'
    })
//提交訂單(不用vuex的寫法)
export const reqSubmitOrder=(tradeNo,data)=>     
    requests({    
        url:`/sinb/api/order/auth/submitOrder?tradeNo=${tradeNo}`,
        data,
        method:'post'
    })
//支付信息
export const reqPayInfo=(orderId)=>     
    requests({    
        url:`/sinb/api/payment/weixin/createNative/${orderId}`,
        method:'get'
    })
//獲取個人中心資訊
export const reqMyOrderList=(page,limit)=>     
    requests({    
        url:`/sinb/api/order/auth/${page}/${limit}`,
        method:'get'
    })