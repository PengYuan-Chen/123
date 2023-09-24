import vueRouter from 'vue-router'
import Home from '@/pages/Home'    //@表src
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import AddCartSuccess from '@/pages/AddCartSuccess'
import ShopCart from '@/pages/ShopCart'
import Store from '@/store'
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import Center from '@/pages/Center'
import myOrder from '@/pages/Center/myOrder'
import groupOrder from '@/pages/Center/groupOrder'

let originPush=vueRouter.prototype.push;

vueRouter.prototype.push=function(location,resolve,reject){
    if(resolve && reject){
        originPush.call(this,location,resolve,reject)
    }else{
        originPush.call(this,location,()=>{},()=>{});
    }
}



let router= new vueRouter({
    routes:[
        {
            name:'home',
            path:'/home',
            component:Home,
            meta:{
                show:true    //要不要顯示footer
            }
        },
        {
            path:'/login',
            component:Login,
            meta:{
                show:false
            }
        },
        {
            path:'/register',
            component:Register,
            meta:{
                show:false
            }
        },
        {
            name:'search',
            path:'/search/:keyword?',
            component:Search,
            meta:{
                show:true
            }
        },
        {
            name:'detail',
            path:'/detail/:skuid',
            component:Detail,
            meta:{
                show:false
            }
        },
        {
            name:'addcartsuccess',
            path:'/addcartsuccess',
            component:AddCartSuccess,
            meta:{
                show:true
            }
        },
        {
            name:'shopcart',
            path:'/shopcart',
            component:ShopCart,
            meta:{
                show:true
            }
        },
        {
            name:'login',
            path:'/login',
            component:Login,
            meta:{
                show:true
            }
        },
        {
            name:'trade',
            path:'/trade',
            component:Trade,
            meta:{
                show:true
            },
            //獨享守衛
            //trade只能從shopcart到達
            beforeEnter:((to,from,next)=>{
                if(from.path=='/shopcart'){
                    next()
                }else{
                    next(false)
                }
            })
        },
        {
            name:'pay',
            path:'/pay',
            component:Pay,
            meta:{
                show:true
            },
            //pay只能從trade到達
            beforeEnter:((to,from,next)=>{
                if(from.path=='/trade'){
                    next()
                }else{
                    next(false)
                }
            })
        },
        {
            name:'center',
            path:'/center',
            component:Center,
            meta:{
                show:true
            },
            children:[{
                path:'myOrder',
                component:myOrder
                },
                {
                path:'groupOrder',
                component:groupOrder
                },
                {
                path:'/center', 
                redirect:'/center/myorder'    //重新定向，進入center直接定位到myorder
                }
            ]
        },
        {
            path:'*',
            redirect:'/home'
        }
    ],
    //控制跳轉後滾輪在的位置，滾動行為
    scrollBehavior(to,from,savedPosition){
        //y=0是最上面
        return {y:0}
    }
})

//全局守衛(判斷各種狀況)
router.beforeEach((to,from,next)=>{
    let token=Store.state.user.token;    //取的token
    let name=Store.state.user.userinfo.name;    //取的用戶名
    //先判斷有沒有登入
    if(token){
        //已登入就不能去login跟register
        if(to.path=='/login' || to.path=='/register'){
            next('/home')
        //去別的組件的情況
        }else{
            //如果是登入狀態下放行
            if(name){
                next()
            //之前有一個問題是重新整理後userinfo會消失
            //如果消失的話再重新發請求一次
            }else{
                Store.dispatch('getUserInfo').then((res)=>{
                    if(res==1){
                        //請求成功有用戶名了就放行
                        next()
                    }else{
                        //發生錯誤就叫他重新登入(可能是token過期)
                        Store.dispatch('userLogout')
                    }
                })
            }
        }
    //未登入:不能去交易相關的，個人中心(應該直接跳到登入)
    }else{
        let toPath=to.path;
        //有包含這三個網址就導到登入
        if(toPath.indexOf('/trade')!=-1 || toPath.indexOf('/pay')!=-1 || toPath.indexOf('/center')!=-1){
            //因為重新登入後應該要跳回上一個頁面，所以放在query參數中
            next('login?redirect='+toPath)
        }else{
            next()
        }
    }
})



export default router