<template>
    <div>
          <el-row :gutter="20" >
  <el-col :span="3">筛选条件:</el-col>
  <el-col :span="6"><el-select v-model="value1" placeholder="请选择项目" size="mini" @change="change1">
    <el-option
      v-for="item in options1"
      :key="item.value"
      :label="item.label"
      :value="item.value">
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
  <el-col :span="4"><el-button type="primary" size="mini" @click="addone()">添加面试官 </el-button></el-col>
</el-row>
    <el-table
    :header-cell-style="{textAlign: 'center'}"   :cell-style="{ textAlign: 'center' }"
       stripe
      :data="tableData"
      style="width: 100%">
       <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="name" label="姓名" > </el-table-column>
      <el-table-column prop="severchanid" label="severchan id"> </el-table-column>
      <el-table-column prop="webhookurl" label="webhook url"></el-table-column>
     <el-table-column fixed="right" label="部门" >
      <template slot-scope="scope">
        <span v-if="scope.row.memberType==1">前端</span>
        <span v-if="scope.row.memberType==2">产品</span>
        <span v-if="scope.row.memberType==3">后端</span>
        <span v-if="scope.row.memberType==4">运营</span>
      </template>
    </el-table-column>
       <el-table-column fixed="right" label="操作" >
      <template slot-scope="scope">
        <el-button
          type="text"
          size="small"
          @click="modity(scope.row, scope.$index)"
        >编辑</el-button>
        <el-button
          type="text"
          size="small"
          @click="deleteone(scope.row, scope.$index)"
        >删除</el-button>
      </template>
    </el-table-column>
    </el-table>
    <!-- 编辑模态框 -->
    <el-dialog title="面试官管理" :visible.sync="dialogFormVisible" class="father1" width="35%">
  <el-form :model="form" class="father2">
    <el-form-item label="姓名" :label-width="formLabelWidth" >
      <el-input v-model="form.name" autocomplete="off"></el-input>
    </el-form-item>
        <el-form-item label="severchain id" :label-width="formLabelWidth">
      <el-input v-model="form.severchanid" autocomplete="off"></el-input>
    </el-form-item>
            <el-form-item label="webhook url" :label-width="formLabelWidth">
      <el-input v-model="form.webhookurl" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="部门" :label-width="formLabelWidth">
      <el-select v-model="form.memberType" placeholder="请选择活动区域">
        <el-option label="前端" value="1"></el-option>
        <el-option label="产品" value="2"></el-option>
        <el-option label="后端" value="3"></el-option>
        <el-option label="运营" value="4"></el-option>
      </el-select>
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
export default {
    data () {
        return {
        //筛选条件
        dataindex:{options1:null,options2:null},
        value1:'',
        value2:'',
         options1:[ {
          value: '1',
          label: '2021春招'
        }, {
          value: '2',
          label: '2020秋招'
        }],
        options2:[ {
          value: '1',
          label: '停止接收简历'
        }, {
          value: '2',
          label: '正常接收简历'
        }],
        //表格数据
        tableData: [{
            name: '王小虎',
           severchanid: '1234567890',
            webhookurl:'1234',
            memberType:'1'
            
          }, {
            name: '王小虎',
           severchanid: '1234567890',
            webhookurl:'1234',
            memberType:'2'
            
          }, {
            name: '王小虎',
           severchanid: '1234567890',
            webhookurl:'1234',
            memberType:'3'
            
          }, {
            name: '王小虎',
           severchanid: '1234567890',
            webhookurl:'1234',
            memberType:'4'
            
          }],
          //表单数据
        type:'add',
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          severchanid:'',
          webhookurl:'',
          memberType: '',
        },
        formLabelWidth: '120px'
        }
    },
    methods: {
        //筛选条件
         change1:function(e){
            console.log(e);
            this.dataindex.options1=e
        },
        change2:function(e){
            console.log(e);
            this.dataindex.options2=e
        },
        //面试官管理
        //面试官修改
        modity:function(e){
            console.log(e);
            this.type='modity'
            this.dialogFormVisible=true
            this.form=e
        },
        //面试官删除
        deleteone:function(e){
            console.log(e);
        },
        //添加面试官
        addone:function(){
            this.form={}
            console.log('添加面试官');
            this.type='add'
            this.dialogFormVisible=true
        },
        submit:function(){
            console.log('提交表单');
            if(this.type=='add'){
                console.log(this.form);
            }
            else{
                console.log('编辑管理员');
                 console.log(this.form);
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