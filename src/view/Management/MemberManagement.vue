<template>
  <div>
    <!-- 二级菜单部分 -->
        <div class="menu">
  <el-menu default-active="2" class="el-menu-demo" mode="horizontal" @select="handleSelect"  text-color="#333" 
  active-text-color="#409EFF">
        <el-row  class="b">
    <el-col :span="12" class="a b"> <el-submenu index="1" style="textAlign:center" >
    <template slot="title">成员管理</template>
    <el-menu-item index="1-0">导师</el-menu-item>
    <el-menu-item index="1-1">前端</el-menu-item>
    <el-menu-item index="1-2">产品</el-menu-item>
    <el-menu-item index="1-3">后端</el-menu-item>
    <el-menu-item index="1-4">运营</el-menu-item>
  </el-submenu></el-col>
          <el-col :span="12"> <el-menu-item index="2" style="textAlign:center">添加成员</el-menu-item></el-col>
        </el-row>
        </el-menu>
        <div class="line"></div>
            </div>

    <!-- 编辑成员部分 -->
    <el-backtop></el-backtop>
    <div v-if="tabindex==1">
  <el-table :header-cell-style="{textAlign: 'center'}"   :cell-style="{ textAlign: 'center' }" :data="tableData" border style="width: 100%">
     <el-table-column fixed type="index" label="#" ></el-table-column>
    <el-table-column label="头像">
      <template slot-scope="scope"><el-avatar shape="square" :size="50" :src="scope.row.UrlAvatar"></el-avatar></template>
    </el-table-column>
    <el-table-column prop="Name" label="姓名" ></el-table-column>
    <el-table-column prop="SchoolYear" label="入学年份" ></el-table-column>
    <el-table-column prop="Describe" label="介绍" ></el-table-column>
    <el-table-column fixed="right" label="操作" >
      <template slot-scope="scope">
        <el-button
          type="text"
          size="small"
          @click="moveUp(scope.row, scope.$index)"
          :disabled="scope.$index === 0"
        >上移</el-button>
        <!-- 这里分别展示了判断是否上移下移的两种方案 -->
        <el-button
          type="text"
          size="small"
          @click="moveDown(scope.row, scope.$index)"
          :disabled="getFormLength(scope.$index)"
        >下移</el-button>
      </template>
    </el-table-column>
  </el-table>
    </div>
    <!-- 添加成员部分 -->
    <a-form  v-if="tabindex==2" @submit="add" :form="form" layout='horizontal' style="position:relative">
      <a-button @click="setAddStatus" v-if="addButtonVisible" class="roundButtonLeft" shape="circle" icon="file-add" ></a-button>
      <a-button @click="gotoDelete" v-if="deleteButtonVisible" class="roundButtonRight" shape="circle" icon="delete"></a-button>
      <a-button @click="exchangeCallName" v-if="exchangeButtonVisible" class="roundButtonRight" shape="circle" icon="swap"></a-button>

      <a-form-item :label="`${callName}名称`" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
        <a-input
          v-decorator="[
            'memberName',
            { initialValue: memberInfo.name,
              rules: [{ required: true, message: `${callName}名称是必填项` }] }]"
             :placeholder="`请输入${callName}名称`"
        ></a-input>
      </a-form-item>
      <a-form-item :label="`${callName}简介`" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
        <a-input
          v-decorator="[
            'memberDescribe',
            { initialValue: memberInfo.describe,
              rules: [{ required: true, message: `${callName}简介是必填项` }] }]"
             :placeholder="`请输入${callName}简介`"
        ></a-input>
      </a-form-item>
      <!-- 按钮组 -->
      <a-form-item :label="`${callName}类别`"  v-show="!isTeacher" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
        <a-radio-group 
          v-decorator="[
          'memberType',
          { initialValue:memberInfo.type,
          rules: [{ required: true, message: `${callName}类别是必填项` }] }]">
          <!-- <a-radio value="memberType0">导师</a-radio> -->
          <a-radio value="memberType1">前端组</a-radio>
          <a-radio value="memberType2">产品组</a-radio>
          <a-radio value="memberType3">后端组</a-radio>
          <a-radio value="memberType4">运营组</a-radio>
      </a-radio-group>
      </a-form-item>
      <a-form-item :label="`${callName}信息`" v-show="isTeacher" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
        <a-input
          v-decorator="[
          'teacherInfo',
          { initialValue:memberInfo.teacher,
          rules: [{ required: isTeacher, message: `${callName}信息是必填项` }] }]"
          :placeholder="`请输入${callName}信息，用斜线“/”分割`"
        ></a-input>
      </a-form-item>
      <a-form-item label="年级" v-show="!isTeacher" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
        <a-input-number
          v-decorator="[
          'schoolYear',
          { initialValue:memberInfo.year,
          rules: [{ required: true, message: ' ' }] }]"
          :min="2015" :max="2020"
        ></a-input-number>
      </a-form-item>
      <!-- 图片：成员图标 -->
      <a-form-item :label="`${callName}头像`" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
        <a-upload
          v-decorator="[
            'memberUrlAvatar',
            { initialValue:listAvatar,
            rules: [{ required: true,  message: `${callName}头像是必填项` }] }]"
            :action="uploadHost" listType="picture-card" accept="image/*" :data="tokenInfo" :beforeUpload="beforeUpload"
            :fileList="listAvatar" 
            @change="uploadAvatar" 
            @preview="previewAvatar" 
        > <div v-if="listAvatar.length < 1">
            <a-icon type="plus" />
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
        <a-modal :visible="visibleAvatar" :footer="null" @cancel="cancelAvatar">
          <img alt="example" style="width: 100%" :src="previewImageUrl" />
        </a-modal>
      </a-form-item>
      <a-form-item :wrapper-col="formItemLayout.buttonCol">
        <a-button html-type="submit" v-if="addVisible" type="primary" class="bulkButton">添加{{callName}}</a-button>
        <a-button @click="change(changeId)" v-if="changeVisible" type="primary" class="bulkButton">修改{{callName}}</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
import "../../assets/style/public.css";
import router from "../../router/index";
import vm from '../../main'
import { removeToken, getToken, getUploadToken, getBackGround, getDomain,
         getMember, addMember, changeMember, deleteMember } from "../../api/api.js";
export default {
  data: function() {
    this.form = this.$form.createForm(this);
    return {
      token:'',
      disabled: true,
      tableData: [],
      memberdata:[],
      tabindex:'2',
       activeIndex: '2',
       callName: "成员",
       exchangeButtonVisible: true,
       isTeacher: false,
       changeId: 0,
       //导师的SchoolYear都是2018;
       //导师的type是0;前端/产品/后端/运营是1234
       //成员的teacherInfo为空
       memberInfo: {
        describe: "",
        name: "",
        type: "memberType0",
        teacher: "",
        year: "2018",
      },
      // 图片上传
      urlHost:"",
      uploadHost:"",
      tokenInfo:{
        key: "",
        token: ""
      },
      listAvatar: [],
      // 图片预览
      previewImageUrl: '',
      visibleAvatar: false,
      //按鈕組
      addButtonVisible: false,
      deleteButtonVisible: false,
      addVisible: true,
      changeVisible: false,
      //表单样式
      formItemLayout: {
        labelCol: { span: 6 },
        wrapperCol: { span: 12 },
        buttonCol: {
           lg: { span: 12, offset: 6}
        }
      },
    };
  },  
  mounted :async function() {
    this. token = JSON.parse(getToken("loginToken"));
    //  获取所有成员的信息
    var res=await vm.get('/members')
      console.log(res);
      if(res.status==200){
       this.memberdata=res.data
       this.tableData=res.data
      console.log(this.memberdata);
      }
    console.log(this);
    this.memberInfo.year = new Date().getFullYear()-2;
    getBackGround().then( res => {
      this.productUrlBackground=[];
      if(res.status == 200) {
        res.data.forEach(file=>{
        this.productUrlBackground.push(file)
      })
      }
    })
    getDomain().then(res=>{
      console.log(res);
      if(res.status == 200) {
        this.urlHost = `${res.data.domain}/`;
        if(res.data.place == "华东") {
          this.uploadHost = "//upload.qiniup.com/"
        } else if(res.data.place == "华北") {
          this.uploadHost = "//upload-z1.qiniup.com/"
        } else if(res.data.place == "华南") {
          this.uploadHost = "//upload-z2.qiniup.com/"
        } 
      }
    })
  },                                                               
  methods: {
       // 上移
    moveUp:async function(item, index) {
      console.log(item);
      var res=await this.$http({
        url:`/members/up/${item.id}?type=${item.MemberType}`,
        method: 'put',
        headers: {
            'Authorization': `Bearer ${this.token}`,
        },
    })
     console.log(res);
     if(res.status==200){
      this.tableData=res.data
      this.$message.success('上移成功')
     }else{
       this.$message.error('上移失败')
     }
    },
    // 下移
    moveDown:async function(item, index) {
       console.log(item);
      var res=await this.$http({
        url:`/members/down/${item.id}?type=${item.MemberType}`,
        method: 'put',
        headers: {
            'Authorization': `Bearer ${this.token}`,
        },
    })
     console.log(res);
     if(res.status==200){
      this.tableData=res.data
      this.$message.success('下移成功')
     }else{
       this.$message.error('下移失败')
     }
    },  // 删除
    deleteItem(index) {
      console.log("delete");
      this.tableData.splice(index, 1);
    },
    // 控制下移按钮的显示于隐藏
    getFormLength(index) {
      if (index === this.tableData.length - 1) return true;
      else return false;
    },
    //二级菜单
         handleSelect(key, keyPath) {
           this.tabindex=keyPath[0]
           if(keyPath.length>1){
        this.membertype=keyPath[1].split('-')[1]
        this.tableData=this.memberdata.filter((item,index)=>{
          return item.MemberType==this.membertype
        })
        console.log(this.tableData);
           }
      },
    // 添加成员
    add(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          addMember(values.memberName, parseInt(values.schoolYear), values.memberDescribe,
                      parseInt(values.memberType.split('').pop()), values.teacherInfo, 
                      this.isEmptyArray(this.isArrayOrObject(values.memberUrlAvatar))[0].url)
                      .then((res) => {
                        this.showHandleTip2(res, values, '添加');
                        this.setAddStatus();
                      }, (err) => {
                      });
        } else {
        } 
      });
    },
    // 修改成员
    change: async function(id){
      this.form.validateFields(async(err, values) => {
        if (!err) {
          console.log(id);
        console.log(values);
        console.log(values.memberType.substr(-1));
        if(values.memberUrlAvatar.fileList){
          var url=values.memberUrlAvatar.fileList[0].url
        }else{
          var url=values.memberUrlAvatar[0].url
        }
        var res=await this.$http({
          url:`/members/update/${id}`,
          method: 'put',
        headers: {
            'Authorization': `Bearer ${this.token}`,
        },
        data:{
            name:values.memberName,
          memberType: values.memberType.substr(-1),
          describe: values.memberDescribe,
          schoolYear: values.schoolYear,
          teacherInfo: values.teacherInfo,
          urlAvatar: url
        }
        })
        console.log(res);
        if(res.status==200){
          this.$message.success('人员修改成功')
        }
        else{
          this.$message.error('人员修改失败')
        }
        } else {
        } 
      });
    },
    // 转化成数组
    isArrayOrObject(item) {
      if (Object.prototype.toString.call(item) === "[object Array]") {
        item = item;
      }else if(Object.prototype.toString.call(item)==='[object Object]'){
        item = item.fileList;
      }
      return item;
    },
    isEmptyArray(item) {
      if(item.length == 0) {
        item.push({
          url:'',
        })
      }
      return item;
    },
    // 删除成员
    delete(id) {
     return deleteMember(id).then((res) => {
        this.showHandleTip(res);
      })
    },
    //  页面改变，index页调用
    setChangePage (id, type) {
      this.changeId = id;
      if (type == 0) {
        this.isTeacher = true;
        this.callName = "导师"
      } else {
        this.isTeacher = false;
        this.callName = "成员"
      }
      getMember(id).then((res) => {
        this.form.setFieldsValue({
          memberName: res.data.Name,
          memberDescribe: res.data.Describe,
          memberType: `memberType${res.data.MemberType}`,
          teacherInfo: res.data.TeacherInfo,
          schoolYear: res.data.SchoolYear,
        });
        this.listAvatar = [];
        if(res.data.UrlAvatar.length > 0) {
          this.listAvatar.push({
            uid: res.data.UrlAvatar.split('/').pop(),
            name: res.data.UrlAvatar.split('/').pop(),
            url: res.data.UrlAvatar,
          })
        }
        this.setChangeStatus();
      })
    },
    // 删除前的确认
    gotoDelete() {
      var self = this;
      self.$confirm({
        title: '删除',content: '您确认要删除该人员吗？',okText: '确认',cancelText: '取消',
        onOk() {
          self.delete(self.changeId)
        },
        onCancel() {},
      });
    },
    //上传前钩子，设置filename，获取token
    beforeUpload (file) {
      var filename = `member-${new Date().getTime()}.${file.name.split('.').pop()}`;
      return getUploadToken(filename).then( res => {
        this.tokenInfo.token = res.data;
        this.tokenInfo.key = filename;
      }, err => {
      });
    },
    // 添加状态
    setAddStatus() {
      this.form.resetFields();
      this.listAvatar = [];
      this.exchangeButtonVisible = this.addVisible = true;
      this.addButtonVisible = this.deleteButtonVisible = this.changeVisible = false;
    },
    exchangeCallName() {
      if(this.callName == "成员") {
        this.callName = "导师"
        this.isTeacher = true;
      }
      else if(this.callName == "导师") {
        this.callName = "成员";
        this.isTeacher = false;
      }
        
    },
    // 修改状态
    setChangeStatus() {
      this.addButtonVisible = this.changeVisible = this.deleteButtonVisible = true;
      this.addVisible = this.exchangeButtonVisible = false;
    },
    
    // 删除后的操作提示
    showHandleTip(res) {
      this.$message.config({ top: `200px`, duration: 2 });
      if (res.status == 200 || res.status == 404) {
          let self = this;
          this.$message.success(`人员已成功删除`);
          this.setAddStatus();
        } else if (res.status == 401) {
          this.$message.error(`您的身份已过期，请重新登录`);
          setTimeout(function() {
            router.push({ name: "login" });
          }, 2000);
        } else if (res.status == 504) {
          this.$message.warning(`请求超时，请稍后再试`);
        } else {
          this.$message.warning(`服务器故障，请联系管理员`);
        }
    },
    // 添加修改后的操作提示
    showHandleTip2(res, values, handleType) {
      this.$message.config({ top: `200px`, duration: 2 });
      if (res.status == 200) {
        let self = this;
        this.$message.success(`人员“${values.memberName}”已成功${handleType}`);
        if(handleType == '添加') {
          setTimeout(function() {
            self.form.resetFields();
          }, 2000);
        }
      } else if (res.status == 401) {
        this.$message.error(`您的身份已过期，请重新登录`);
        setTimeout(function() {
          router.push({ name: "login" });
        }, 2000);
      } else if (res.status == 504) {
        this.$message.warning(`请求超时，请稍后再试`);
      } else {
        this.$message.warning(`服务器故障，请联系管理员`);
      }
    },
    // 预览
    previewAvatar (file) {
      this.previewImageUrl = file.url || file.thumbUrl
      this.visibleAvatar = true
    },
    cancelAvatar () {
      this.visibleAvatar = false
    },
    // 上传
    baseUpload (info) {
      let fileList = [...info.fileList];
      fileList = fileList.map(file => {
        if (file.response) {
          file.url = file.thumbUrl = `${this.urlHost}${file.response.key}`;
        }
        return file;
      })
    },
    uploadAvatar ( info ) {
      this.baseUpload(info);
      this.listAvatar = info.fileList;
    },
  },
};
</script>

<style scoped>
.bulkButton {
  width: 100%;
  margin: 1em auto;
}
.upload-list-inline >>> .ant-upload-list-item {
  width: 150px;
  margin-right: 8px;
}
.upload-list-inline >>> .ant-upload-animate-enter {
  animation-name: uploadAnimateInlineIn;
}
.upload-list-inline >>> .ant-upload-animate-leave {
  animation-name: uploadAnimateInlineOut;
}
.roundButtonLeft {
  position:absolute;
  right:50px;
  top:-8px;
  z-index:999;
}
.roundButtonRight {
  position:absolute;
  right:10px;
  top:-8px;
  z-index:999;
}
.backImage{
   width:100%;
   height:80px
}
.el-menu-demo{
  margin-top: -25px;
  margin-bottom: 15px;
}
.el-table td, .el-table th {
            text-align: center;
        } 

.el-table--enable-row-hover .el-table__body tr:hover>td{
background-color: #c6cfdf !important;
}
.el-menu-item.is-active {    color: #409EFF;
    border-bottom: 2px solid #409EFF;
}
.el-menu-item{
  margin-left: 25%;
  width: 50%;
  text-align: center;
}
.el-submenu__title:hover{
  background-color:#ffffff !important;
}
.el-menu-item:hover{
  background-color:#ffffff !important;
}
.el-menu--horizontal:hover{
  background-color:#ffffff !important;
}
.el-submenu:hover{
  background-color:#ffffff !important;
}
.a :hover{
   background-color:#ffffff !important;
}
</style>