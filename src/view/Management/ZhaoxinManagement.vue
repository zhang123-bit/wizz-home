<template >
        <el-container class="body">
        <el-aside width="15%"> <el-menu
      default-active="/management/detail/join/resume"
      class="el-menu-vertical-demo menuside"
      @open="handleOpen"
      @close="handleClose" router>
       <el-menu-item index="/management/detail/join/resume">
        <span slot="title">简历管理</span>
      </el-menu-item>
       <el-menu-item index="/management/detail/join/interview">
        <span slot="title">面试官管理</span>
      </el-menu-item>
       <el-menu-item index="/management/detail/join/project">
        <span slot="title">项目管理</span>
      </el-menu-item>
      <el-menu-item index="/management/detail/join/message">
        <span slot="title">消息管理</span>
      </el-menu-item>
    </el-menu></el-aside>
        <el-main>
            <router-view ref="mainPage"></router-view>
        </el-main>
        </el-container>
</template>
<script>
export default {
  created:function(){
   this.$router.push({
          name: 'resume',
        })
  },
     methods: {
      handleOpen(key, keyPath) {
        console.log(1);
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>
<style scoped>
 .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
.el-aside {
display: block;
min-height: 100%;
background-color: #324157 !important;
}
.body{
    width: 100%;
    height:500px;
}
.menuside{
    width: 100%;
    height: 100%;
    border-right: 1px solid #ccc;
}
  .el-main {
    color: #333;
    text-align: center;
    line-height: 25px !important;
}
</style>