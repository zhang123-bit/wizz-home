<template>
    <div>
  <el-row :gutter="20" >
  <el-col :span="3">筛选条件:</el-col>
  <el-col :span="6"><el-select v-model="value1" placeholder="请选择项目" size="mini" @change="change1($event)">
    <el-option
      v-for="item in options1"
      :key="item.id"
      :label="item.Name"
      :value="item.id">
    </el-option>
  </el-select></el-col>
  <el-col :span="6"><el-select v-model="value2" placeholder="请选择岗位" size="mini" @change="change2($event)">
    <el-option
      v-for="item in options2"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select></el-col>
  <el-col :span="6"><el-select v-model="value3" placeholder="请选择处理状态" size="mini" @change="change3($event)">
    <el-option
      v-for="item in options3"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select></el-col>
</el-row>
    <el-table
    :header-cell-style="{textAlign: 'center'}"   :cell-style="{ textAlign: 'center' }"
    :row-style="{height:'20px'}"
       stripe
      :data="tableData"
      style="width: 100%">
       <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="Time" label="投递时间" > </el-table-column>
      <el-table-column prop="Name" label="姓名"> </el-table-column>
      <el-table-column prop="InterviewerName" label="面试官"></el-table-column>
       <el-table-column fixed="right" label="操作" >
      <template slot-scope="scope">
        <el-button
          type="text"
          size="small"
          @click="showmessage(scope.row, scope.$index)"
        >查看简历</el-button>
        <!-- 修改状态 -->
        <el-popconfirm
         v-if='value3!="0"'
        title="确认修改状态吗？"
        @confirm="changemessage(scope.row)"
            >
            <el-button
                   
                    type="text"
                    size="small"
                    slot="reference"
                    >修改状态</el-button>
            </el-popconfirm>
        
      </template>
    </el-table-column>
    </el-table>
    <br>
    <!-- 分页 -->
    <el-pagination
        small
        background
        layout="prev, pager, next"
        :current-page="currentPage"
        page-size="6"
        @current-change="changepage"
        :total="total">
      </el-pagination>
    <!-- 这是信息模态框 -->
    <el-dialog
  title="个人信息及简历查看"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <h4 v-if='value3==1'>面试评价</h4>
    <el-input
    v-if='value3==1'
  type="textarea"
  readonly="true"
  :autosize="{ minRows: 3, maxRows: 10}"
  placeholder="暂无面试评价"
  v-model="textarea3">
</el-input>
  <el-divider v-if='value3==1'></el-divider>
 <span>{{Name}} / {{Gendr==1?'男':'女'}} / {{Grade}} / {{CollegeMajor}}</span>
    <el-divider></el-divider>
    <!-- 项目经历 --> 
    <h4>{{Experience==1?'项目经历介绍':'个人能力简介'}}</h4>
    <el-input
  type="textarea"
  readonly="true"
  :autosize="{ minRows: 5, maxRows: 10}"
  placeholder="请输入内容"
  v-model="textarea2">
</el-input>
       <el-divider></el-divider>
    <el-link type="primary" :href='resumeurl' target="_blank" :disabled='resumeurl==""'>简历链接</el-link>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
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
    data() {
      return {
        Experience:'',
        resumeurl:'',
        Interviewers:[],
        textarea3:'暂无面试评价',
          textarea2:'暂无项目经验',
          //查看面试者信息模态框
          dialogVisible: false,
          //面试简历总数
          currentPage:1,//当前分页
          total:100,
            tableData: [],
        //选择筛选条件
        dataindex:{options1:null,options2:null,options3:null},
        options1: [
            {
          value: '1',
          label: '2021春招'
        }
        ],
        options2: [
            {
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
        },
        ],
        options3:[         {
          value: '0',
          label: '未处理'
        },          {
          value: '1',
          label: '已通过'
        }, 
        {
          value: '2',
          label: '未通过'
        },],
        value1: '',
        value2: '1',
        value3: '0',
      }
    },
    methods: {
       //时间戳转换
        formdat:function(da){
            da = new Date(da);
            var year = da.getFullYear()+'年';
            var month = da.getMonth()+1+'月';
            var date = da.getDate()+'日';
            return [year,month,date].join('-')
        },
      changemessage: async function(e){
        console.log(e);
         let res=await this.$http({
                  url:'/resumes/'+e.id,
                  method:'put',
                   data:{
                     CollegeMajor: e.CollegeMajor,
                      DepartmentType: e.DepartmentType,
                      Describe: e.Describe,
                      Experience: e.Experience,
                      FileUrl: e.FileUrl,
                      Gender:e.Gender,
                      Grade: e.Grade,
                      InitialScreeningResult: e.InitialScreeningResult,
                      InitialScreeningTime: e.InitialScreeningTime,
                      InterviewEvaluation: e.InterviewEvaluation,
                      InterviewId:e.InterviewId,
                      InterviewTime: e.InterviewTime,
                      InterviewerId: e.InterviewerId,
                      Name: e.Name,
                      QQNumber: e.QQNumber,
                      SendTime: e.SendTime,
                      TelephoneNumber: e.TelephoneNumber,
                      WechatNumber: e.WechatNumber,
                      InterviewResult: e.InterviewResult==1?2:1
                        },
                headers: {
                  'Authorization': `Bearer ${this.token}`,
              }
                })
              if(res.status==200){
                this.$message.success('修改面试结果成功')
                this.getresume()
              }else{
                 this.$message.error('修改面试结果失败')
              }
      },
      changepage:function(e){
        console.log(e);
        this.currentPage=e
        this.getresume()
      },
      getresume:async function(){
        let res=await this.$http({
          url:'/resumes',
          method:'get',
           params: {
                    DepartmentType: this.value2,
                    InterviewId: this.value1,
                    InterviewResult:this.value3,
                    Page:this.currentPage
                },
        })
        console.log(res);
        if(res.status==200){
          res=res.data
          this.total=res.data.totalSize
          this.tableData=res.data.content
          if(this.tableData!=null){
            this.tableData.forEach((e)=>{
            e.Time=this.formdat(e.SendTime)
          })
          }
        }
      },
      getallproject:async function(){
        let res=await this.$http({
                  url:'/interviews',
                  method:'get',
                })
        if(res.status==200){
          res=res.data.reverse()
          this.options1=res
          this.options1[0].Name= this.options1[0].Name+` (当前)`
          this.value1=res[0].id
          if(this.$route.query.id){
            console.log(this.$route.query.id);
            this.value1=this.$route.query.id
            this.value3='1'
          }
          this.getresume()
          }
      },
        change1:function(e){
            console.log(e);
            this.value1=e
             this.currentPage=1
            this.dataindex.options1=e
            this.getresume()
        },
        change2:function(e){
            console.log(e);
             this.value2=e
            this.currentPage=1
            this.dataindex.options2=e
             this.getresume()
        },
          change3:function(e){
            console.log(e);
            this.value3=e
            this.currentPage=1
            this.dataindex.options3=e
            this.getresume()
        },
        
        //关闭信息模态框
         handleClose(done) {
       this.dialogVisible=false
       this.resumeurl=''
       this.textarea2='暂无项目经验'
      },
        showmessage:function(e){
         console.log(e);
         this.Experience=e.Experience
         this.Name=e.Name
         this.Gendr=e.Gendr
         this.CollegeMajor=e.CollegeMajor
         this.Grade=e.Grade
         this.textarea2=e.Describe
         this.textarea3=e.InterviewEvaluation
         this.resumeurl=e.FileUrl
         this.dialogVisible=true
        }
    }
    
}
</script>
<style scoped>
.el-pagination{
  padding: 0 0;
  text-align: right !important;
}
.el-row {
    margin-bottom: 20px;
    height: 20px;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>