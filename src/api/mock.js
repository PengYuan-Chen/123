//引入axios
import axios from "axios";  
//引入進度條，是一個對象
import nProgress from "nprogress";
//引入進度條樣式(必要)
import 'nprogress/nprogress.css'

//創建axios實例
const requests =axios.create({    
    timeout:5000    //請求超時的時間超過就失敗
})

//請求攔截器，請求前做一些事
requests.interceptors.request.use((config)=>{    //config包含一些配置，url,method等等
    nProgress.start();    //nprogress對象的start()表開始
    return config;
})
//響應攔截器，請求回來後做一些事
requests.interceptors.response.use((res)=>{    
    nProgress.done(); //nprogress對象的done()表結束
    return res.data;    //取得數據
},(error)=>{
    return Promise.reject(new Error('fail'));    //捕獲錯誤 Error: error message
})

export default requests;    //匯出對象