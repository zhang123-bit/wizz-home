<template>
    <div>
  <el-table
  :header-cell-style="{textAlign: 'center'}"   :cell-style="{ textAlign: 'center' }"
      :data="tableData"
      style="width: 100%">
      <el-table-column
        type="index"
        label="#">
      </el-table-column>
      <el-table-column
        prop="RealTime"
        label="日期">
      </el-table-column>
      <el-table-column
        prop="Content"
        label="信息内容">
      </el-table-column>
    <el-table-column fixed="right" label="操作" >
      <template slot-scope="scope">
        <el-button
          type="text"
          size="small"
          @click="modity(scope.row, scope.$index)"
          :disabled='scope.row.ReadStatus==1'
        >标为已读</el-button>
      </template>
    </el-table-column>
    </el-table>
    </div>
</template>
<script>
import {getToken } from "../../api/api.js";
export default {
      data() {
        return {
          tableData: []
        }
      },
      created () {
        this.token = JSON.parse(getToken("loginToken")); 
        this.getallmessage()
      },
      mounted () {},
      inject:['changestatus'],
      methods: {
        //时间戳转换
        formdat:function(da){
            da = new Date(da);
            var year = da.getFullYear()+'年';
            var month = da.getMonth()+1+'月';
            var date = da.getDate()+'日';
            return [year,month,date].join('-')
        },
        //获取所有的信息
        getallmessage:async function(){
         let res= await this.$http.get('/messages')
         res=res.data
         res.forEach((e)=>{
            e.RealTime=this.formdat(e.CreateTime)
         })
         let ReadStatus=res.every((e)=>{
           return e.ReadStatus==1
         })
         if(ReadStatus){
           this.changestatus()
         }
         console.log(ReadStatus);
         this.tableData=res.reverse()
         console.log(this.tableData);
         
        },
           change1:function(e){
            console.log(e);
        },
          modity:async function(row){
              console.log(row);
          let res=await this.$http({
          url:'/messages/'+row.id,
          method:'put',
          data:{
            ReadStatus: 1,
            CreateTime:row.CreateTime,
            Content:row.Content
            
          },
           headers: {
            'Authorization': `Bearer ${this.token}`,
        }
        })
        console.log(res);
        if(res.status==200){
          this.$message.success('消息已读')
          this.getallmessage()
        }
          }
      }
    }
</script>
<style >
.el-main{
    padding-top: 0px;
}
</style>