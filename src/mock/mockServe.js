import Mock from 'mockjs'    //引入mock
//引入兩個json文件(json文件默認對外export所以不需要寫export)
import banner from './banner.json'
import floor from './floor.json'

//mock方法，第一個參數:請求地址  第二個參數:請求的數據
Mock.mock('/mock/banner',{code:200,data:banner})    //模擬倫波的數據
Mock.mock('/mock/floor',{code:200,data:floor})