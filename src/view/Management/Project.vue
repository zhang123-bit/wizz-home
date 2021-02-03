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
  <el-col :span="3"><el-button type="primary" size="mini" @click="addproject()">添加项目</el-button></el-col>
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
    <el-table-column label="日期">
      <template scope="scope">
      <span v-if="!scope.row.editeFlag">{{ scope.row.name }}</span>
      <span v-if="scope.row.editeFlag" class="cell-edit-input"><el-input v-model="scope.row.name" placeholder="请输入内容"></el-input></span>
      <span v-if="!scope.row.editeFlag" style="margin-left:10px;" class="cell-icon"  @click="handleEdit(scope.$index,scope.row)">  <i class="el-icon-edit"></i> </span>
      <span v-if="scope.row.editeFlag"  style="margin-left:10px;"  class="cell-icon"  @click="handleSave(scope.$index,scope.row)">  <i class="el-icon-document"></i> </span>
      </template>
    </el-table-column>
    <el-table-column prop="datenumber" label="收到简历数" > </el-table-column>
      <el-table-column  label="已通过" >
        <template scope="scope">
          <el-button type="text"  @click="passmen(scope.row)">{{ scope.row.pass }}</el-button>
          </template >
      </el-table-column>
      <el-table-column prop="notpass" label="未通过"></el-table-column>
  </el-table>
</el-row >
  </div>
</template>
 
<script>
export default{

  data(){
    return {
        input:'',
        value:'全部',
        options:[
          {
          value: '0',
          label: '全部'
          },
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
       tableData:[
	    {
		name:"test",
         editeFlag:false,
         datenumber:20,
         pass:10,
         notpass:10,
	    },
	  	    {
		name:"test",
         editeFlag:false,
         datenumber:20,
         pass:10,
         notpass:10,
	    },
	  	    {
		name:"test",
         editeFlag:false,
         datenumber:20,
         pass:10,
         notpass:10,
	    },
	    	    {
		name:"test",
         editeFlag:false,
         datenumber:20,
         pass:10,
         notpass:10,
	    },
    ], 
      inputColumn1:""//第一列的输入框
    }
  },
  methods:{
    //查看通过的同学
    passmen:function(data){
      console.log(data);
    },
    //修改表格某一行的样式
      tableRowClassName:function({row, rowIndex}) {
        if (rowIndex === 1) {
          console.log(rowIndex);
          return 'success-row';
        }
        return '';
      },
    change:function(e){
            console.log(e);
        },
     handleEdit:function(index,row){
			        //遍历数组改变editeFlag
			        console.log(row)
			        console.log(index);
			        this.tableData[index].editeFlag=true;
			    },
    handleSave:function(index,row){
                    console.log(row);
			        //保存数据，向后台取数据
			         this.tableData[index].editeFlag=false;
                },
    addproject:function(){
        if(this.input==''){
            this.$message.error('项目名称不能为空')
        }
        console.log(this.input);
        this.input=''
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