<template>
<div class="pagination">
    <button :disabled="pageNo==1" @click="sendPageNo(pageNo-1)">上一頁</button>
    <button v-if="pageNo>3" @click="sendPageNo(1)" :class="{active:pageNo==1}">1</button>
    <button v-if="pageNo>4">···</button>

    <button v-for="(page,index) in startNumEndNum.end" :key="index" 
            v-if="page>=startNumEndNum.start" 
            @click="sendPageNo(page)"
            :class="{active:pageNo==page}">
            {{page}}
    </button>
 
    <button v-if="pageNo<totalPage-continues+2">···</button>
    <button v-if="pageNo<totalPage-continues+3" @click="sendPageNo(totalPage)" :class="{active:pageNo==totalPage}">{{totalPage}}</button>
    <button :disabled="pageNo==totalPage"  @click="sendPageNo(pageNo+1)">下一页</button>

    <button style="margin-left: 30px">共{{total}} 条</button>
</div>
 
</template>

<script>
export default {
    name: "Pagination",
    //     當前頁碼  每頁展示多少條  總筆數   連續頁碼
    props:['pageNo' , 'pageSize' ,'total', 'continues'],
    computed:{
        totalPage(){    //總頁數
            //Math.ceil:無條件進位
            return Math.ceil(this.total/this.pageSize)
        },
        startNumEndNum(){
            const {pageNo,continues,totalPage}=this;
            let start=0;
            let end=0;    //起始數字 結束數字 
            if(continues>totalPage){  
                //當總比數小於連續頁碼的情況
                start=1;
                end=totalPage;
            }else{
                //正常情況
                start=pageNo-parseInt(continues/2)
                end=pageNo+parseInt(continues/2)              
                if(start<1){
                    //前面幾筆的情況
                    start=1;
                    end=continues
                }else if(end>totalPage){
                    //後面幾筆的情況
                    start=totalPage-continues+1 
                    end=totalPage
                }
            }
            return {end,start}
        }
    },
    methods:{
        sendPageNo(pageNo){
            this.$emit('getPageNo',pageNo)
        }
    }

}
</script>

<style lang="less" scoped>
  .pagination {
    text-align: center;
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
  .active{
    background-color: #409eff;
  }
</style>
