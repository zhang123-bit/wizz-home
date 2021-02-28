<template>
  <div>
   <el-row :gutter="20" >
  <el-col :span="3">筛选条件:</el-col>
  <el-col :span='6'><el-select v-model="value" placeholder="请选择部门" size="mini" @change="change($event)">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select></el-col>
    <el-col :span="5"><el-input v-model="input" placeholder="请输入项目名称" size="mini"></el-input></el-col>
  <el-col :span="3">

<el-popconfirm
  title="确认新建项目吗？将会自动成为新项目，当前的项目将会被终止"
  
   @confirm='addproject()'
>
<el-button type="primary" slot="reference" size="mini">添加项目</el-button>
</el-popconfirm>

    </el-col>
</el-row>
<el-row>
  <el-table class='father'
  :header-cell-style="{textAlign: 'center'}"   :cell-style="{ textAlign: 'center' }"
    :row-class-name="tableRowClassName"
    :data="tableData"
    border
    @cell-mouse-enter="handleMouseEnter"
    @cell-mouse-leave="handleMouseOut"
    style="width: 100%">
      <el-table-column type="index" label="#"></el-table-column>
    <el-table-column label="项目名称">
      <template scope="scope">
      <span v-if="!scope.row.editeFlag">{{ scope.row.Name }}</span>
      <span v-if="scope.row.editeFlag" class="cell-edit-input"><el-input v-model="scope.row.Name" placeholder="请输入内容"></el-input></span>
      <span v-if="!scope.row.editeFlag" style="margin-left:10px;" class="cell-icon"  @click="handleEdit(scope.$index,scope.row)">  <i class="el-icon-edit"></i> </span>
      <span v-if="scope.row.editeFlag"  style="margin-left:10px;"  class="cell-icon"  @click="handleSave(scope.$index,scope.row)">  <i class="el-icon-document"></i> </span>
      </template>
    </el-table-column>
    <el-table-column prop="SentNumber" label="收到简历数" > </el-table-column>
      <el-table-column  label="已通过" >
        <template scope="scope">
          <el-button type="text"  @click="passmen(scope.row)">{{ scope.row.PassNumber}}</el-button>
          </template >
      </el-table-column>
      <el-table-column prop="FailNumber" label="未通过"></el-table-column>
  </el-table>
</el-row >
  </div>
</template>
 
<script>
import {getToken } from "../../api/api.js";
export default{

  data(){
    return {
      token:'',
        input:'',
        value:'全部',
        options:[
          {
          value: '0',
          label: '全部'
          },
               /* {
          value: '1',
          label: '前端'
        },       {
          value: '2',
          label: '产品'
        },
         {
          value: '3',
          label: '后端'
        }, {
          value: '4',
          label: '运营'
        },*/
        ],
       tableData:[
	    
    ], 
      inputColumn1:""//第一列的输入框
    }
  },
   //组件挂载完成，生命周期
   mounted () {
      this.token = JSON.parse(getToken("loginToken")); 
      console.log(this.token);
      this.getallproject()
    },
  methods:{
    //获取所有项目
    getallproject:async function(){
        let res=await this.$http({
                  url:'/interviews',
                  method:'get',
                })
                res=res.data.reverse()
                res.forEach((e)=>{
                  e.editeFlag=false
                })
                this.tableData=res
    },
    //查看通过的同学
    passmen:function(data){
      console.log(data);
      this.$router.push({name:'resume',query:{id:data.id}})
    },
    //修改表格某一行的样式
      tableRowClassName:function({row, rowIndex}) {
        if (rowIndex === 0) {
          return 'success-row';
        }
        return '';
      },
    change:function(e){
        },
     handleEdit:function(index,row){
			        //遍历数组改变editeFlag
			        this.tableData[index].editeFlag=true;
			    },
    //修改项目名称
    handleSave:async function(index,row){
			        //保存数据，向后台取数据
     let res=await this.$http({
                url:'/interviews/'+row.id,
                method:'put',
                data:{
                  CreateTime:row.CreateTime,
                  Name: row.Name
                },
                headers: {
                  'Authorization': `Bearer ${this.token}`,
              }
              })
       if(res.status==200){
          this.$message.success('修改项目成功')
          this.getallproject()
        }else{
          this.$message.error('修改项目失败')
        }
			 this.tableData[index].editeFlag=false;
                },
    addproject:async function(){
        if(this.input==''){
            this.$message.error('项目名称不能为空')
        }else{
  console.log(this.input);
        var time=new Date().getTime()
        let res=await this.$http({
          url:'/interviews',
          method:'post',
          data:{
             CreateTime: time,
              Name:this.input
          },
           headers: {
            'Authorization': `Bearer ${this.token}`,
        }
        })
        console.log(res);
        if(res.status==200){
          this.$message.success('添加项目成功，默认为当前项目')
          this.input=''
          this.getallproject()
          this.$router.push({
          name: 'interview',
          query:{isroute:true}
        })
        }else{
          this.$message.error('添加项目失败')
        }
        
    }
        }
      
			    
  }
}
</script>
 
<style >

.cell-edit-input .el-input, .el-input__inner {
  width:150px;
}
.cell-icon{
  cursor:pointer;
  color:#ccc
  ;
}
.father{
    margin-top: 20px;
}

.el-table .success-row {
    background: #DCDFE6 !important;
  }
</style>