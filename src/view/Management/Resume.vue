<template>
    <div>
  <el-row :gutter="20" >
  <el-col :span="3">筛选条件:</el-col>
  <el-col :span="6"><el-select v-model="value1" placeholder="请选择项目" size="mini" @change="change1($event)">
    <el-option
      v-for="item in options1"
      :key="item.value"
      :label="item.label"
      :value="item.value">
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
       stripe
      :data="tableData"
      style="width: 100%">
       <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="date" label="投递时间" > </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="address" label="面试官"></el-table-column>
       <el-table-column fixed="right" label="操作" >
      <template slot-scope="scope">
        <el-button
          type="text"
          size="small"
          @click="showmessage(scope.row, scope.$index)"
        >查看简历</el-button>
      </template>
    </el-table-column>
    </el-table>
    <!-- 这是信息模态框 -->
    <el-dialog
  title="个人信息及简历查看"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
 <span>个人介绍</span>
    <el-divider></el-divider>
    <!-- 项目经历 -->
    <el-input
  type="textarea"
  readonly="true"
  :autosize="{ minRows: 1, maxRows: 10}"
  placeholder="请输入内容"
  v-model="textarea2">
</el-input>
       <el-divider></el-divider>
    <el-link type="primary" href="https://element.eleme.io" target="_blank">简历链接</el-link>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>
</div>
</template>
<script>

export default {
    data() {
      return {
          textarea2:'刘守仁升任十七军分区副司令员兼四十八团团长后，仍经常随四十八团活动。当时，分区有四',
          //查看面试者信息模态框
          dialogVisible: false,
            tableData: [{
                        date: '2016-05-02',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1518 弄'
                    }, {
                        date: '2016-05-04',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1517 弄'
                    }, {
                        date: '2016-05-01',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1519 弄'
                    }, {
                        date: '2016-05-03',
                        name: '王小虎',
                        address: '上海市普陀区金沙江路 1516 弄'
                    }],
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
        value2: '',
        value3: '',
      }
    },
    methods: {
          change1:function(e){
            console.log(e);
            this.dataindex.options1=e
        },
        change2:function(e){
            console.log(e);
            this.dataindex.options2=e
        },
          change3:function(e){
            console.log(e);
            this.dataindex.options3=e
        },
        //关闭信息模态框
         handleClose(done) {
       this.dialogVisible=false
      },
        showmessage:function(e){
         console.log(e);
         this.dialogVisible=true
        }
    }
    
}
</script>
<style scoped>
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