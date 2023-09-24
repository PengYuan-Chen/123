const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer:{
    proxy:{
      '/sinb':{    //網址前有sinb的話才會傳給下面服務器
        target:'http://gmall-h5-api.atguigu.cn',
        pathRewrite:{'^/sinb':''}    //刪掉sinb
      }
    }
  }
})
