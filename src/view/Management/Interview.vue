<template>
    <div>
          <el-row :gutter="20" >
  <el-col :span="3">筛选条件:</el-col>
  <el-col :span="6"><el-select v-model="value1" placeholder="请选择项目" size="mini" @change="change1">
    <el-option
      v-for="item in options1"
      :key="item.id"
      :label="item.Name"
      :value="item.id">
    </el-option>
  </el-select></el-col>
    <el-col :span="6"><el-select v-model="value2" placeholder="请选择状态" size="mini" @change="change2">
    <el-option
      v-for="item in options2"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select></el-col>
  <el-col :span="4"><el-button type="primary" size="mini" @click="addone()" :disabled='nowprojectid!=id'>添加面试官 </el-button></el-col>
</el-row>
    <el-table
    :header-cell-style="{textAlign: 'center'}"   :cell-style="{ textAlign: 'center' }"
       stripe
      :data="tableData"
      style="width: 100%">
       <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="Name" label="姓名" > </el-table-column>
      <el-table-column prop="ServerchanId" label="severchan id"> </el-table-column>
      <el-table-column prop="WebhookUrl" label="webhook url"></el-table-column>
     <el-table-column fixed="right" label="部门" >
      <template slot-scope="scope">
        <span v-if="scope.row.DepartmentType==1">前端</span>
        <span v-if="scope.row.DepartmentType==2">产品</span>
        <span v-if="scope.row.DepartmentType==3">后端</span>
        <span v-if="scope.row.DepartmentType==4">运营</span>
      </template>
    </el-table-column>
       <el-table-column fixed="right" label="操作" >
      <template slot-scope="scope">
        <el-button
          type="text"
          size="small"
          @click="modity(scope.row, scope.$index)"
          :disabled='nowprojectid!=id'
        >编辑</el-button>
        <el-button
          type="text"
          size="small"
          @click="deleteone(scope.row, scope.$index)"
          :disabled='nowprojectid!=id'
        >删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <!-- 编辑模态框 -->
    <el-dialog title="面试官管理" :visible.sync="dialogFormVisible" class="father1" width="35%">
  <el-form :model="form" class="father2">
    <el-form-item label="姓名" :label-width="formLabelWidth" >
      <el-input v-model="form.Name" autocomplete="off"> </el-input>
         
    </el-form-item>
        <el-form-item label="severchain id" :label-width="formLabelWidth">
      <el-input v-model="form.ServerchanId" autocomplete="off"></el-input>
    </el-form-item>
            <el-form-item label="webhook url" :label-width="formLabelWidth">
      <el-input v-model="form.WebhookUrl" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="部门" :label-width="formLabelWidth">
      <el-select v-model="value3"  placeholder="请选则部门" @change='change3'>
        <el-option
      v-for="item in typenumber"
      :key="item.id"
      :label="item.Name"
      :value="item.id">
    </el-option>
      </el-select>
    </el-form-item>
     <el-form-item label="是否接收简历" :label-width="formLabelWidth" >
  <el-switch v-model="value4"></el-switch>
    </el-form-item>
          
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="submit()">确 定</el-button>
  </div>
</el-dialog>
    </div>
</template>
<script>
import {getToken } from "../../api/api.js";
export default {
   created () {
        this.token = JSON.parse(getToken("loginToken")); 
        this.getallproject()
      },
    data () {
        return {
        //筛选条件
        nowprojectid:'',//项目栏中最新的id
        id:'',//当前项目的id
        typenumber:[{id:1,Name:'前端'},{id:2,Name:'产品'},{id:3,Name:'后端'},{id:4,Name:'运营'}],
        dataindex:{options1:null,options2:null,typenumber:null},
        value1:'',
        value2:'',
        value3:'',
        value4:true,
         options1:[ ],
        options2:[ {
          value: '1',
          label: '停止接收简历'
        }, {
          value: '0',
          label: '正常接收简历'
        }],
        interviewersdata:[],
        //表格数据
        tableData: [],
          //表单数据
        type:'add',
        dialogFormVisible: false,
        form: { },
        formLabelWidth: '120px'
        }
    },
    methods: {
      //获取所有的项目
     getallproject:async function(){
        let res=await this.$http({
                  url:'/interviews',
                  method:'get',
                })
        if(res.status==200){
          res=res.data.reverse()
          this.options1=res
         
           this.value1=res[0].Name
         console.log(this.options1);
         this.id=res[0].id
         this.nowprojectid=res[0].id
         this.getinterviewers(res[0].id)
        }
                
        
    },
    //获取项目所对应的面试官
    getinterviewers:async function(id){
      let res=await this.$http({
        url:'/interviewers/all/'+id,
        method:'get'
      })
      console.log(res);
      this.tableData=res.data
          this.tableData.forEach((e)=>{
            if(e.DepartmentType==1){
              e.Type='前端'
            }else if(e.DepartmentType==2){
              e.Type='产品'
            }else if(e.DepartmentType==3){
              e.Type='后端'
            }else{
              e.Type='运营'
            }
          })
      this.interviewersdata=res.data
      if(this.value2!=''){
        this.change2(this.value2)
      }
    },
        //筛选条件
         change1:function(e){
            console.log(e);
            this.id=e
            this.dataindex.options1=e
            this.value2=''//切换简历一时默认为获取全部面试官
            this.getinterviewers(this.id)
        },
        //停止接收简历为1
        change2:function(e){
          this.value2=e
            this.dataindex.options2=e
            if(e==0){
              this.tableData=this.interviewersdata.filter((e)=>{
                return e.Status==0
              })
              console.log(this.tableData);
            }
            if(e==1){
              this.tableData=this.interviewersdata.filter((e)=>{
                return e.Status==1
                })
                console.log(this.tableData);
              }
        },
        change3:function(e){
            console.log(e);
            this.dataindex.typenumber=e
        },
        //面试官管理
        //面试官修改
        modity:function(e){
            console.log(e);
            this.type='modity'
            this.dialogFormVisible=true
            this.form=e
            this.value3=e.Type
            if(this.form.Status==0){
                  this.value4=true
                }else{
                  this.value4=false
                }
              console.log(this.value4);
        },
        //面试官删除
        deleteone:async function(e){
            console.log(e);
            let res=await this.$http({
                  url:'/interviewers/'+e.id,
                  method:'delete',
                headers: {
                  'Authorization': `Bearer ${this.token}`,
              }
                })
                console.log(res);
                if(res.status==200){
                  this.$message.success('删除面试官成功')
                  this.getinterviewers(this.id)
                }
        },
        //添加面试官
        addone:function(){
            this.form={}
            console.log('添加面试官');
            this.type='add'
            this.dialogFormVisible=true
        },
        submit:async function(){
          if(this.value3=='前端'){
            this.value3=1
          }if(this.value3=='产品'){
            this.value3=2
          }if(this.value3=='后端'){
            this.value3=3
          }if(this.value3=='运营'){
            this.value3=4
          }
            console.log('提交表单');
            if(this.type=='add'){
              this.form.DepartmentType=this.value3
             if(this.value4){
                  this.form.Status=0
                }else{
                  this.form.Status=1
                }
                console.log(this.form);
                let res=await this.$http({
                  url:'/interviewers',
                  method:'post',
                   data:{
                          DepartmentType: this.form.DepartmentType,
                          Name: this.form.Name,
                          InterviewId: this.id,
                          ServerchanId:this.form.ServerchanId,
                          Status:this.form.Status,
                          WebhookUrl: this.form.WebhookUrl
                        },
                headers: {
                  'Authorization': `Bearer ${this.token}`,
              }
                })
              console.log(res);
                  console.log(res);
                if(res.status==200){
                  this.getinterviewers(this.id)
                  this.dialogFormVisible=false
                this.value3=''
                this.value4=true
                this.$message.success('添加面试官成功')
                }else{
                  this.$message.error('添加面试官失败')
                }
                
            }
            else{
                console.log('编辑管理员');
                this.form.DepartmentType=this.value3
                if(this.value4){
                  this.form.Status=0
                }else{
                  this.form.Status=1
                }
                let res=await this.$http({
                  url:'/interviewers/'+this.form.id,
                  method:'put',
                   data:{
                          DepartmentType: this.form.DepartmentType,
                          Name: this.form.Name,
                          InterviewId: this.id,
                          ServerchanId:this.form.ServerchanId,
                          Status:this.form.Status,
                          WebhookUrl: this.form.WebhookUrl
                        },
                headers: {
                  'Authorization': `Bearer ${this.token}`,
              }
                })
                console.log(res);
                if(res.status==200){
                  this.getinterviewers(this.id)
                  this.dialogFormVisible=false
                this.$message.success('修改面试官成功')
                this.value3=''
                this.value4=true
                 console.log(this.form);
                }else{
                    this.$message.error('修改面试官失败')
                }
                
            }
            
        }

    }
}
</script>
<style>
.father1{
    text-align: left;
}
.el-form-item__label{
    text-align: center;
}
</style>