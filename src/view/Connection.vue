<template>
    <div>
         
        <div ref="connect" class="connect">
            <el-row>
            <el-col :span="12"><div class="connect-text" >了解更多为之</div></el-col>
            <el-col :span="12"><div class="connect-text">为之培养计划</div></el-col>
            </el-row>
            <a-row  type="flex" justify="space-around" align="top">
                <a-col :xs="5" :sm="5" :md="4" :lg="4" :xl="4">
                    <img src="../assets/img/Connection/ConnectionWeiPub.jpg" alt="公众号">
                    <div class="centerText">{{nameOne}}</div>
                </a-col>
                <a-col :xs="5" :sm="5" :md="4" :lg="4" :xl="4">
                    <img src="../assets/img/Connection/xiaowei.png" alt="QQ群">
                    <div class="centerText">西电小为</div>
                </a-col>
                   <a-col :xs="5" :sm="5" :md="4" :lg="4" :xl="4">
                    <img src="../assets/img/Connection/wizzpeiyang.jpg" alt="为之培养群">
                    <div class="centerText">为之培养群</div>
                </a-col>
                <a-col :xs="5" :sm="5" :md="4" :lg="4" :xl="4">
                    <img src="../assets/img/Connection/ConnectionQQ.jpg" alt="QQ群">
                    <div class="centerText">为之冬/夏令营</div>
                </a-col>
            </a-row>
            <el-row>
            <el-col :span="24"><div class="connect1-text" >投递简历 
                <el-link :underline="false" href='https://www.wjx.top/vj/mG4XHZa.aspx' type="primary"> (点此投递简历)</el-link>
                </div></el-col>
           </el-row>
        </div>
       <!-- <div ref="profile">
            <a-row  type="flex" justify="space-around">
                <a-col :xs="10" :sm="10" :md="8" :lg="8" :xl="8">
                    <img src="../assets/img/Connection/ConnectWei.jpg" alt="简历投递">
                    <div class="centerText">{{nameThree}}</div>
                </a-col>
            </a-row>
            <img src="../assets/img/back5.jpg" alt="简历投递">
        </div> -->
  
    </div>
</template>

<script>
import router from "../router/index";
export default {
    name: "Connection",
    data: function() {
        return {
            nameOne:"微信公众号",
            nameTwo:"QQ互联网交流群",
            nameThree:"简历投递",
        }
    },
    method: {

    }    
}
</script>

<style scoped>
.connect-text{
    height: 50px;
    padding-left: 10%;
    font-weight: 700;
    font-size: 20px;
    line-height: 50px;
}
.connect1-text{
    height: 50px;
    padding-left: 5%;
    font-weight: 700;
    font-size: 20px;
    line-height: 50px;
}
.centerText{
    text-align: center
}
.bigIcon{
    font-size:4em
}
</style>