//對axios進行二次封裝
import axios from "axios";  
//引入進度條，是一個對象
import nProgress from "nprogress";
//引入進度條樣式
import 'nprogress/nprogress.css'
//引入倉庫
import store from '@/store'

//創建axios實例
const requests =axios.create({     
    timeout:5000    //請求超時的時間超過就失敗
})

//請求攔截器，請求前做一些事
requests.interceptors.request.use((config)=>{    //config包含一些資訊 ，請求頭等
    if(store.state.detail.uuid_token){    //如果detail中有uuid就把它放在請求頭裡
        config.headers.userTempId=store.state.detail.uuid_token
    }
    if(store.state.user.token){    //登入成功後有token了就把token放在請求頭，之後帶給服務器抓資料
        config.headers.token=store.state.user.token
    }
    nProgress.start();    //nprogress對象的start()表開始
    return config;
})
//響應攔截器，請求回來後做一些事
requests.interceptors.response.use((res)=>{    //config包含一些資訊 ，請求頭等
    nProgress.done(); //nprogress對象的done()表結束
    return res.data;
},(error)=>{
    return Promise.reject(new Error('fail'));
})

export default requests;    //匯出對象