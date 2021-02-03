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
        prop="date"
        label="日期">
      </el-table-column>
      <el-table-column
        prop="message"
        label="信息内容">
      </el-table-column>
    <el-table-column fixed="right" label="操作" >
      <template slot-scope="scope">
        <el-button
          type="text"
          size="small"
          @click="modity(scope.row, scope.$index)"
          :disabled='scope.row.type==1'
        >标为已读</el-button>
      </template>
    </el-table-column>
    </el-table>
    </div>
</template>
<script>
export default {
      data() {
        return {
          tableData: [{
            date: '2016-05-02',
            message: '王小虎',
            type: 1
          }, {
            date: '2016-05-04',
            message: '王小虎',
            type: 0
          }, {
            date: '2016-05-01',
            message: '王小虎',
            type: 1
          }, {
            date: '2016-05-03',
             message: '王小虎',
            type: 1
          }]
        }
      },
      methods: {
           change1:function(e){
            console.log(e);
        },
          modity:function(){
              console.log('123');
          }
      }
    }
</script>
<style >
.el-main{
    padding-top: 0px;
}
</style>