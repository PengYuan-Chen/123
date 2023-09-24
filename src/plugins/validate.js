//表單驗證插件
import Vue from 'vue'
import VeeValidate from 'vee-validate'
Vue.use(VeeValidate)
import zh_TW from 'vee-validate/dist/locale/zh_TW'

//               對象.方法(,)
VeeValidate.Validator.localize('zh_TW',{
    messages:{
        ...zh_TW.messages, //提示訊息用中文
        is: (field) => `${field}必須與密碼相同`
    },
    attributes:{
        phone:'手機號',    //要顯示的中文
        code:'驗證碼',
        password:'密碼',
        password1:'確認密碼',
        agree:'協議'    
    }
})

//自訂義校驗規則
VeeValidate.Validator.extend('eunha',{
    validate:(value)=>{
        return value
    },
    getMessage: (field)=>field+"必須同意"
})