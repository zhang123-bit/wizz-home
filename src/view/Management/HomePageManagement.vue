<template>
  <div>
      <!-- 轮播图上传部分 -->
    <el-row v-if="phone==false">
            <el-col :span="4"><div class="main-text" >轮播图上传</div></el-col>
            <el-col :span="12"><div class="sub-text">(推荐上传比例为4:3，最多上传5张)</div></el-col>
     </el-row>
       <el-row v-if="phone==true">
            <el-col :span="9"><div class="main-text" >轮播图上传</div></el-col>
            <el-col :span="15"><div class="sub-text">(推荐上传比例为4:3，最多上传5张)</div></el-col>
     </el-row>
  <div class="clearfix">
    <a-upload
      :action="uploadHost"
      list-type="picture-card"
      :data="tokenInfo" 
      :beforeUpload="beforeUpload"
      :file-list="fileListlunbo"
      @preview="handlePreviewlunnbo"
      @change="handleChangelunbo"
    >
      <div v-if="fileListlunbo.length < 5">
        <a-icon type="plus" />
        <div class="ant-upload-text">
          Upload
        </div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancellunbo">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
  <!-- vtalk图片上传 -->
      <el-row v-if="phone==false">
            <el-col :span="4"><div class="main-text" >vtalk图片上传</div></el-col>
            <el-col :span="12"><div class="sub-text">(推荐上传比例为4:3，最多上传4张)</div></el-col>
     </el-row>
          <el-row v-if="phone==true">
            <el-col :span="9"><div class="main-text" >vtalk图片上传</div></el-col>
            <el-col :span="15"><div class="sub-text">(推荐上传比例为4:3，最多上传4张)</div></el-col>
     </el-row>
  <div class="clearfix">
    <a-upload
      :action="uploadHost"
      :data="tokenInfo" 
      :beforeUpload="beforeUpload"
      list-type="picture-card"
      :file-list="fileListvtalk"
      @preview="handlePreviewvtalk"
      @change="handleChangevtalk"
    >
      <div v-if="fileListvtalk.length < 4">
        <a-icon type="plus" />
        <div class="ant-upload-text">
          Upload
        </div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancelvtalk">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
   <!-- vread图片上传 -->
      <el-row v-if="phone==false">
            <el-col :span="4"><div class="main-text" >vread图片上传</div></el-col>
            <el-col :span="12"><div class="sub-text">(推荐上传比例为4:3，最多上传4张)</div></el-col>
     </el-row>
       <el-row v-if="phone==true">
            <el-col :span="9"><div class="main-text" >vread图片上传</div></el-col>
            <el-col :span="15"><div class="sub-text">(推荐上传比例为4:3，最多上传4张)</div></el-col>
     </el-row>
  <div class="clearfix">
    <a-upload
      :action="uploadHost"
      :data="tokenInfo" 
      :beforeUpload="beforeUpload"
      list-type="picture-card"
      :file-list="fileListvread"
      @preview="handlePreviewvread"
      @change="handleChangevread"
    >
      <div v-if="fileListvread.length < 4">
        <a-icon type="plus" />
        <div class="ant-upload-text">
          Upload
        </div>
      </div>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancelvread">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal>
  </div>
   <!-- 为之介绍修改-->
      <el-row v-if="phone==false">
            <el-col :span="12"><div class="main-text" >为之介绍修改<el-button type="text" @click="modifyintroduce"> (确认修改)</el-button></div></el-col>
     </el-row>
      <el-row v-if="phone==true">
            <el-col :span="8"><div class="main-text" >为之介绍修改</div></el-col>
            <el-col :span="9"><el-button type="text" @click="modifyintroduce" class="phonebutton-text"> (确认修改)</el-button></el-col>
     </el-row>
     <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="textarea" class="textareaclass">
</el-input>
    <br>
   <!-- 公众号文章上传修改-->
      <el-row v-if="phone==false">
            <el-col :span="12"><div class="main-text" >公众号文章上传 <el-button type="text" @click="addartical" class="phonebutton-text"> (添加文章)</el-button></div>
            </el-col>
     </el-row>
      <el-row v-if="phone==true">
            <el-col :span="8"><div class="main-text" >为之介绍修改</div></el-col>
            <el-col :span="9"><el-button type="text" @click="addartical" class="phonebutton-text"> (添加文章)</el-button></el-col>
     </el-row>
  <el-table
    :data="tableDataart"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="title"
      label="标题">
    </el-table-column>
    <el-table-column
      prop="articleUrl"
      label="网址">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
        <el-button @click="handleClickdelete(scope.row)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
<!-- 添加公众号文章的模态框 -->
<el-dialog 
  title="提示"
  :visible.sync="dialogVisible"
  :width="phone?'80%':'30%'">
<el-input v-model="addtitle" placeholder="请输入公众号文章标题" required></el-input>
<br><br>
<el-input v-model="addurl" placeholder="请输入公众号文章网址"></el-input>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitartical">确 定</el-button>
  </span>
</el-dialog>
  </div>
</template>
<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
import { removeToken, getToken, getUploadToken, getBackGround, getDomain,
         getMember, addMember, changeMember, deleteMember } from "../../api/api.js";
export default {
  data() {
    return {
      moditydata:{},//编辑文章信息
      operatetype:'add',//操作类型，添加或者修改
      addtitle:'',
      addurl:'',
      dialogVisible: false,
       tableDataart: [],
      tokenInfo:{
        key: "",
        token: ""
      },
      token:'',
      urlHost:'',
      uploadHost:'',
      previewVisible: false,
      previewImage: '',
      fileListlunbo: [],
      fileListvtalk:[],
      fileListvread:[],
      phone:false,
      textarea:''
    };
  },
    mounted: async function() {
    this. token = JSON.parse(getToken("loginToken"));
    if (this._isMobile()) {
      this.phone=true
    } else {
      this.phone=false
    }
  this.getartcials()
  this.getintroduce()
  this.getallpictures()
    console.log(this.phone);
   var res=await this.$http.get('/image/PlaceAndDomain')
    console.log('图片上传域名:',res);
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
  },
  methods: {
      //判断是否是移动端
       _isMobile() {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag;
    },
    //为之介绍修改接口
    getintroduce:async function(){
      var res=await this.$http.get('/passage')
      console.log(res);
      if(res.status==200){
        this.textarea=res.data.passage
     }
    },
    modifyintroduce:async function(){
      console.log(this.textarea);
     var res=await this.$http({
        url: '/passage',
        method: 'put',
        data:{
          passage:this.textarea
        },
        headers: {
            'Authorization': `Bearer ${this.token}`,
        }})
      console.log(res);
      if(res.status==200){
        this.$message.success('修改成功')
     }else{
       this.$message.error('修改失败')
     }
    },
    //获取所有公众号文章
    getartcials:async function(){
      var res=await this.$http('/articles')
      console.log(res);
      if(res.status==200){
        this.tableDataart=res.data
      }
    },
    //获取所有图片
    getallpictures:async function(){
        var res=await this.$http('/image')
        console.log(res);
        if(res.data){
          console.log(res.data);
         var reslunbo= res.data.filter((item)=>{ return item.ImageType==2})
         this.fileListlunbo=reslunbo.map((item)=>({
          uid:item.id,
          type:item.ImageType,
          name: item.ImageUrl,
          status: 'done',
          url: item.ImageUrl,
        }))
        var resvtalk= res.data.filter((item)=>{ return item.ImageType==0})
         this.fileListvtalk=resvtalk.map((item)=>({
          uid:item.id,
          type:item.ImageType,
          name: item.ImageUrl,
          status: 'done',
          url: item.ImageUrl,
        }))
        var resvread= res.data.filter((item)=>{ return item.ImageType==1})
         this.fileListvread=resvread.map((item)=>({
          uid:item.id,
          type:item.ImageType,
          name: item.ImageUrl,
          status: 'done',
          url: item.ImageUrl,
        }))
        }
       console.log(this.fileListlunbo);
       console.log(this.fileListvread);
       console.log(this.fileListvread);
    },
    deleteimage: async function(id){
      console.log(id);
      var res=await this.$http({
        url: '/image/'+id,
        method: 'delete',
        headers: {
            'Authorization': `Bearer ${this.token}`,
        }
    })
      console.log(res);
      if(res.status==200){
       this.$message.success('图片删除成功')
     }else{
       this.$message.error('图片删除失败')
     }
    },
      //轮播图部分
       beforeUpload (file) {
      var filename = `member-${new Date().getTime()}.${file.name.split('.').pop()}`;
      return getUploadToken(filename).then( res => {
        console.log(res);
        this.tokenInfo.token = res.data;
        this.tokenInfo.key = filename;
      }, err => {
      });},
      baseUpload (info) {
      let fileList = [...info.fileList];
      fileList = fileList.map(file => {
        if (file.response) {
          file.url = file.thumbUrl = `${this.urlHost}${file.response.key}`;
        }
        console.log(file);
        return file;
      })
    },
    handleCancellunbo() {
      this.previewVisible = false;
    },
    async handlePreviewlunbo(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChangelunbo: async function({file, fileList }) {
      if(file.status=='done'){
      fileList[fileList.length-1].thumbUrl=this.urlHost+fileList[fileList.length-1].response.key
      fileList[fileList.length-1].name=fileList[fileList.length-1].response.key
     var res=await this.$http({
        url: '/image',
        method: 'post',
        headers: {
            'Authorization': `Bearer ${this.token}`,
        },
        data:{
          imagetype: 2,
           imageurl: fileList[fileList.length-1].thumbUrl 
        }
    })
     console.log(res);
     if(res.status==200){
       fileList[fileList.length-1].uid=res.data.id
       this.$message.success('图片上传成功')
     }else{
       this.$message.error('图片上传失败')
     }
      }
       if(file.status=='removed'){
        console.log(file);
        this.deleteimage(file.uid)
      }
      this.fileListlunbo = fileList;
    },
        //vtalk部分
    handleCancelvtalk() {
      this.previewVisible = false;
    },
    async handlePreviewvtalk(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChangevtalk: async function({ file,fileList }) {
       if(file.status=='done'){
      fileList[fileList.length-1].thumbUrl=this.urlHost+fileList[fileList.length-1].response.key
      fileList[fileList.length-1].name=fileList[fileList.length-1].response.key
     var res=await this.$http({
        url: '/image',
        method: 'post',
        headers: {
            'Authorization': `Bearer ${this.token}`,
        },
        data:{
          imagetype: 0,
           imageurl: fileList[fileList.length-1].thumbUrl 
        }
    })
     console.log(res);
     if(res.status==200){
       fileList[fileList.length-1].uid=res.data.id
       this.$message.success('图片上传成功')
     }else{
       this.$message.error('图片上传失败')
     }
      }
       if(file.status=='removed'){
        console.log(file);
        this.deleteimage(file.uid)
      }
      this.fileListvtalk = fileList;
    },
            //vread部分
    handleCancelvread() {
      this.previewVisible = false;
    },
    async handlePreviewvread(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChangevread: async function({file,fileList }) {
        if(file.status=='done'){
      fileList[fileList.length-1].thumbUrl=this.urlHost+fileList[fileList.length-1].response.key
      fileList[fileList.length-1].name=fileList[fileList.length-1].response.key
     var res=await this.$http({
        url: '/image',
        method: 'post',
        headers: {
            'Authorization': `Bearer ${this.token}`,
        },
        data:{
          imagetype: 1,
           imageurl: fileList[fileList.length-1].thumbUrl 
        }
    })
     console.log(res);
     if(res.status==200){
       fileList[fileList.length-1].uid=res.data.id
       this.$message.success('图片上传成功')
     }else{
       this.$message.error('图片上传失败')
     }
      }
       if(file.status=='removed'){
        console.log(file);
        this.deleteimage(file.uid)
      }
      this.fileListvread= fileList;
      console.log(this.fileListvread);
    },
    //公众号文章部分
    //添加文章
    addartical:function(){
      this.operatetype='add'
      this.dialogVisible=true
    },
    submitartical:async function(){
      if(this.operatetype=='add'){
      if(this.addtitle!=''&&this.addurl!='')
      {
        var data={title:this.addtitle,url:this.addurl}
        console.log(data);
        var res=await this.$http({ url: '/articles',
        method: 'post',
        data:{
          title:  data.title,
         articleUrl:  data.url
        },
        headers: {
            'Authorization': `Bearer ${this.token}`,
        }})
         console.log(res);
         if(res.status==200){
           this.getartcials()
           this.$message.success('文章上传成功')
         }else{
           this.$message.error('文章上传失败')
         }
        this.dialogVisible=false
        this.addtitle=''
        this.addurl=''
       
      }else{
        this.$message.error('标题或网址为空,无法添加');
      }}
      if(this.operatetype=='modify'){
        var res=await this.$http({
          url:'/articles/'+this.moditydata.id,
          method:'put',
          data:{
            articleUrl: this.addurl,
            title: this.addtitle
          },headers: {
            'Authorization': `Bearer ${this.token}`,
        }
        })
           console.log(res);
        if(res.status==200){
        this.$message.success('修改成功')
        this.dialogVisible=false
        this.addtitle=''
        this.addurl=''
        this.getartcials()
        }  else{
          this.$message.error('修改失败')
        }
      }
    },
    //编辑文章
     handleClick(row) {
        console.log(row);
        this.dialogVisible=true
        this.operatetype='modify'
        this.moditydata=row
        this.addtitle=this.moditydata.title
        this.addurl=this.moditydata.articleUrl
      },
    //删除文章
    handleClickdelete:async function(row){
      console.log(row);
       var res=await this.$http({
          url:'/articles/'+row.id,
          method:'delete',
          headers: {
            'Authorization': `Bearer ${this.token}`,
        }
        })
        console.log(res);
        if(res.status==200){
          this.$message.success('删除成功')
          this.getartcials()
        }
        else{
          this.$message.error('删除失败')
        }
    }
  },
};
</script>
<style scoped>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
.main-text{
        height: 50px;
    font-weight: 700;
    font-size: 20px;
    line-height: 50px;
}
.phonebutton-text{
   height: 50px;
   line-height: 30px;
}
.sub-text{
        height: 50px;
    color:#ccc;
    font-weight: 20;
    font-size: 14px;
    line-height: 50px;
}
.textareaclass{
  display: inline-block;
  width: 50%;
}
</style>