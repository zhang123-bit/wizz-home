<template>
    <div >
        <!-- <input type="text"> -->
        <!-- 首页部分 -->
        <div ref="firstPage">
           
        <!-- <div class="block">
    <el-carousel   v-if="phone===false" :height="hdgd" >
      <el-carousel-item v-for="item in imgs" :key="item" autoplay  interval="3000 " :height="hdgd">
           <a-row :gutter="2">
                <a-col :span="24">
                      <img :src="item.src"  class="firstpageimg" alt="item" :min-height="hdgd">
                </a-col>
            </a-row>
      </el-carousel-item>
    </el-carousel>
       <el-carousel height="40vw"  v-if="phone===true"  indicator-position="none">
      <el-carousel-item v-for="item in imgs" :key="item" autoplay  interval="3000 ">
           <a-row :gutter="2">
                <a-col :span="24">
                      <el-image :src="item.src"  class="firstpageimg" alt="item"></el-image>
                </a-col>
            </a-row>
      </el-carousel-item>
    </el-carousel>
  </div> -->
            <a-row :gutter="2" >
                    <a-col :span="24" style="position:relative;float:right" id="home1">
                        <div>
                        <img src="../assets/img/char2.jpg" style="z-index:5;" alt="插图">
                        </div>
                        <div style="background:#ffb660">
                        <div style="font-size:16px;font-weight:700;text-align:right;color:#ffffff">为之工作室——打造西电互联网的“黄埔军校”</div>
                        </div>
                    </a-col>
                    
            </a-row>
        </div>
        <!-- 介绍部分 -->
        <div ref="introduction">
            <br><br><br>
            <div class="boldText" v-if="phone==false">{{introduction[0]}}</div>
            <div class="boldText" v-if="phone==true">{{introduction[4]}}</div>
            <br>
            <div class="normalText">{{introduction[1]}}</div>
            <br>

        </div>
        <!-- 文化部分 -->
        <div ref="culture">
            <br><br><br>
            <div class="boldText">为之文化</div>
            <br><br>
            <a-row :height="hdgd1"  v-if="phone==false">
                <a-col :span="16" class="col" v-if="phone==false">
                        <el-carousel :height="hdgd1" class="el">
                        <el-carousel-item v-for="item in fileListlunbo" :key="item.uid" :height="hdgd1">
                           <img :src='item.url'   class="itemimg" :height="hdgd1">
                        </el-carousel-item>
                        </el-carousel>
                </a-col>
                <a-col :span="8" v-if="phone==false">
                     <img src="../assets/img/HomePage/fifth/culture.jpg" class="wid24" alt="为之文化"  :height="hdgd1">
                </a-col>
                <a-col :span='1'></a-col>
            </a-row>
            <a-row  v-if="phone==true" class="rowphone">
                    <a-col :span="16" class="colphone" v-if="phone==true" >
                       <el-carousel height='45vw' indicator-position="none"> 
                        <el-carousel-item v-for="item in fileListlunbo " :key="item" height='100%'>
                           <img :src='item.url'  alt="为之文化"  class="carousel-image" height='100%'>
                        </el-carousel-item>
                        </el-carousel>
                </a-col>
                <a-col :span="8" v-if="phone==true">
                     <img src="../assets/img/HomePage/fifth/culture.jpg" class="wid24" alt="为之文化" height='100%' >
                </a-col>
                <a-col :span='1'></a-col>
            </a-row>
            <br v-if="phone==false"><br v-if="phone==false">
            <!-- vtalk和vread -->
            <el-row>
            <el-col :span="12" v-if="phone==false"><div class="introduction-text" >Vtalk</div></el-col>
            <el-col :span="12" v-if="phone==false"><div class="introduction-text">Vread</div></el-col>
            </el-row>
            <br>
            <div class="backGround2">
                <el-row v-if="phone==false">
                <el-col :span="8">  
                    <el-carousel :height="hdgd2" class="el">
                        <el-carousel-item v-for="item in fileListvtalk" :key="item.uid" :height="hdgd2">
                           <img :src='item.url'   class="itemimg" :height="hdgd2">
                        </el-carousel-item>
                        </el-carousel></el-col>
                <el-col :span="4"><div class="grid-content introducetext1" >{{vtalk}}</div></el-col>
                     <el-col :span="8">  
                    <el-carousel :height="hdgd2" class="el">
                        <el-carousel-item v-for="item in fileListvread" :key="item.uid" :height="hdgd2">
                           <img :src='item.url'   class="itemimg" :height="hdgd2">
                        </el-carousel-item>
                        </el-carousel></el-col>
                <el-col :span="4"> <div class="grid-content introducetext1" >{{vread}}</div></el-col>
                </el-row>
                <!-- 手机上面显示 -->
                 <el-row v-if="phone==true">
            
           <el-row >
            <el-col :span="24" v-if="phone==true"><br><div class="introduction-text">Vtalk</div></el-col>
            </el-row>
                     <el-col :span="16">  
                    <el-carousel height="40vw" indicator-position="none">
                        <el-carousel-item v-for="item in fileListvtalk" :key="item.uid" height="40vw">
                           <img :src='item.url'   class="itemimg" height="100%">
                        </el-carousel-item>
                        </el-carousel></el-col>
            <el-row >
                <el-col :span="8"> <div class="grid-content introducetext1 phonev">{{vtalk}}</div></el-col>
            <el-col :span="24" v-if="phone==true"><br><div class="introduction-text">Vread</div></el-col>
            </el-row>
                     <el-col :span="16">  
                    <el-carousel height="40vw" indicator-position="none">
                        <el-carousel-item v-for="item in fileListvread" :key="item.uid" height="40vw">
                           <img :src='item.url'   class="itemimg" height="100%">
                        </el-carousel-item>
                        </el-carousel></el-col>
                <el-col :span="8"> <div class="grid-content introducetext1 phonev">{{vread}}</div></el-col>
                </el-row>
            </div>
        </div>
        <!-- 近期推文 -->
        <div ref="history" style="width:96%">
        <br>
        <div class="boldText">Vthink近期推文</div>
        <br><br>
                <el-row :gutter="20" v-if="phone==false">
                <el-col :span="6" v-for="item in articallist" :key="item.id">
                    <a :href="item.articleUrl">
                     <el-tooltip class="item" effect="dark" :content="item.articleUrl" placement="top">
                        <div class="grid-content bg-purple-light artical" >{{item.title}}</div>
                     </el-tooltip>  
                    </a>
                     </el-col>
                </el-row>
                <!-- 手机上的推文 -->
                 <el-row :gutter="20" v-if="phone==true">
                <el-col :span="12" v-for="item in articallist" :key="item.id">
                    <a :href="item.articleUrl">
                     <el-tooltip class="item" effect="dark" :content="item.articleUrl" placement="top">
                        <div class="grid-content bg-purple-light artical" >{{item.title}}</div>
                     </el-tooltip>  
                    </a>
                     </el-col>
                </el-row>
        </div>
        <!-- 历史部分 -->
        <div ref="history" style="width:96%">
        <br><br>
        <div class="boldText">为之历史</div>
            <a-timeline mode="alternate">
                <div v-for="(value, name) of storyWithYear" :key="name+value">
                    <a-timeline-item>
                        <a-icon slot="dot" type="clock-circle-o" style="font-size: 16px;color:black"/>
                        <div><strong>{{name}}</strong></div>
                    </a-timeline-item>
                    <a-timeline-item color="grey" mode="alternate" v-for="(subvalue) of value" :key="subvalue.id">{{subvalue.storyDescribe}}</a-timeline-item>
                </div>
            </a-timeline>
        </div>
        <!-- 氛围建设部分 -->
        <div ref="atmospher">
            <br><br><br>
            <div class="backGround3">
            <a-row :gutter="2" >
                <a-col :span="24">
                <div class="boldText">{{atmos[0].name}}</div>
                <br>
                <div>{{atmos[0].detail}}</div>
                </a-col>
            </a-row>
            <br>
            <a-row :gutter="2" type="flex" justify="space-around" align="bottom" style="text-align:center">
                <a-col :span="8">
                    <img src="../assets/img/HomePage/third/2.jpg" class="wid24" alt="场地">
                    <div>海鲸小红花</div>
                </a-col>
                <a-col :span="8">
                    <img src="../assets/img/HomePage/third/4.jpg" class="wid24" alt="场地">
                    <div>HelloWorld Rank</div>
                    <div>编程语言排行篇</div>
                </a-col>
            </a-row>
            <br><br>
            <div class=" wrapperS">{{atmos[1].name}}</div>
            <div class="normalText wrapperL" v-html="atmos[1].detail">{{atmos[1].detail}}</div>
            <div class=" wrapperS">{{atmos[2].name}}</div>
            <div class="normalText wrapperL">{{atmos[2].detail}}</div>    
            <a-row :gutter="2" >
                <a-col :span="16">
                </a-col>
                <a-col :span="8">
                    <img src="../assets/img/HomePage/third/5.jpg" class="wid24 roundGraph" alt="场地">
                </a-col>
            </a-row>
            </div>  
        </div>
        <!-- 成员去向部分 -->
        <div ref="member">
            <br><br><br>
            <div class="boldText">为之成员</div>
            <div class="backGround3">
            <a-row>
                <a-col :xs="0" :sm="0" :md="3" :lg="3" :xl="3"></a-col>
                <a-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
                    <img src="../assets/img/HomePage/forth/1.jpg" class="wid24" alt="毕业去向">
                </a-col>
                <a-col :xs="0" :sm="0" :md="3" :lg="3" :xl="3"></a-col>
            </a-row>
            <!-- <a-row :gutter="2" >
                <a-col :span="12">
                </a-col>
                <a-col :span="12">
                    <img src="../assets/img/HomePage/forth/2.jpg" class="wid24" alt="毕业">
                </a-col>
            </a-row>
            <a-row :gutter="2" >
                <a-col :span="16">
                    <img src="../assets/img/HomePage/forth/3.png" class="wid24" alt="毕业">
                </a-col>
                <a-col :span="8">
                </a-col>
            </a-row>
            <a-row :gutter="2" >
                <a-col :span="12">
                </a-col>
                <a-col :span="12">
                    <img src="../assets/img/HomePage/forth/4.png" class="wid24" alt="">
                </a-col>
            </a-row> -->
            </div>
        </div>
        <!-- 了解更多 -->
        <div ref="join" class="connect">
            <br><br><br>
            <el-row>
            <el-col :span="12"><div class="join-text" >了解更多为之</div></el-col>
            <el-col :span="12"><div class="join-text">为之培养计划</div></el-col>
            </el-row>
            <a-row  type="flex" justify="space-around" align="top">
                <a-col :xs="5" :sm="5" :md="4" :lg="4" :xl="4">
                    <img src="../assets/img/Connection/ConnectionWeiPub.jpg" alt="公众号">
                    <div class="centerText">为之公众号</div>
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
        </div>
    </div>
    
</template>

<script>
import router from "../router/index";
import '../assets/style/public.css'
import { getAllStories } from '../api/api'
export default {
    name: 'HomePage',
    created: function() {
        this.fillInStory();
    },
     mounted() {
     let that = this;
        window.onresize = function windowResize() {
          // 通过捕获系统的onresize事件触发我们需要执行的事件
          var w = window.innerWidth
          var h = 500
          var h1=467
          var h2=200
          if (w > 1200) {
            h = 500
            h1=500
            h2=200
          } else {
            h = 0.3 * w
            h1= 0.3 * w
            h2= 0.3 * w
          }
          that.hdgd = h + 'px'
           that.hdgd1 = h1 + 'px'
           that.hdgd2 = h2 + 'px'
          console.log(that.hdgd)
        }
    if (this._isMobile()) {
      this.phone=true
    } else {
      this.phone=false
    }
    console.log(this.phone);
    this.getallpictures()
    this.getintroduce()
    this.getarticals()
  },
    methods: {
    _isMobile() {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag;
    },
    getarticals:async function(){
        var res=await this.$http.get('/articles')
        console.log(res);
        if(res.status==200){
            this.articallist=res.data
            console.log(this.articallist);
        }
    },
    getintroduce:async function(){
      var res=await this.$http.get('/passage')
      console.log(res);
      if(res.status==200){
        this.introduction[1]=res.data.passage
     }
    },
        getallpictures:async function(){
        var res=await this.$http('/image')
        console.log(res);
        if(res.data){
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
       console.log(this.fileListlunbo,'轮播图');
       console.log(this.fileListvread);
       console.log(this.fileListvread);
    },
        fillInStory:function(){
            getAllStories().then(res => {
                console.log(res);
                let self = this;
                this.storys = res.data;
                this.storys.forEach(function(item){
                    var temp = new Date(item.timeStamp*1000);
                    item.year = temp.getFullYear();
                })
                this.storys.forEach(function(item){
                    if(self.storyWithYear.hasOwnProperty(item.year)){
                        self.storyWithYear[item.year].push(item);
                    }else{
                        self.$set(self.storyWithYear, item.year,[]);
                        self.storyWithYear[item.year].push(item);
                    }
                })
            });
        },
    },
    data :function() {
        return {
            vtalk:'《反恐精英：全球攻势》是一款由VALVE与Hidden Path Entertainment合作开发、Valve Software发行的第一人称射击游戏,《反恐精英：全球攻势》是一款由VALVE与Hidden Path Entertainment合作开发、Valve Software发行的第一人称射击游戏',
            vread:'《反恐精英：全球攻势》是一款由VALVE与Hidden Path Entertainment合作开发、Valve Software发行的第一人称射击游戏,《反恐精英：全球攻势》是一款由VALVE与Hidden Path Entertainment合作开发、Valve Software发行的第一人称射击游戏',
            fileListvtalk:[],
            fileListlunbo:[],
            fileListvread:[],
            articallist:[],
            hdgd2:'200px',
            hdgd1:'450px',
            hdgd:'500px',
            phone:false,
            test:false,
            storys:[],
            storyWithYear:{
            },
            imgs:[{
                src:require('../assets/img/HomePage/first/1.jpg'),
                name:'成员合照'
            },
            {
                src:require('../assets/img/HomePage/first/2.jpg'),
                name:'成员合照'
            },
            {
                src:require('../assets/img/HomePage/first/3.jpg'),
                name:'活动室'
            },
            {
                src:require('../assets/img/HomePage/first/4.jpg'),
                name:'老师'
            },
            {
                src:require('../assets/img/HomePage/first/5.jpg'),
                name:'老师'
            }],
            introduction:[
                "为之工作室成立于2017年11月",
                "是西电创新创业学院下属团队，汇聚互联网产品、技术、运营预备役从业者，拥有公司资质、独立的工作室和十余个独立工位，依托真实的互联网产品项目，不断发展创新。",
                "我们是一个敢想敢做的团队，尊重团队里的每一个idea，聚焦专注而为之。",
                "这让我们把为之做到了全校<strong>最有活力、容纳项目最多</strong>的团队。",
                "为之介绍",
            ],
            atmos:[
                {
                    name:"产品项目",
                    detail:"自成立以来，众多互联网项目的真实产出，实践出了真实的人才培养机制"
                },
                {
                    name:"",
                    detail:""
                },
                {
                    name:"",
                    detail:""
                },
            ],
            memTo:[
                "成员拥有丰富的互联网大厂实习经历，多数已成功进入一线互联网企业工作",
                "同时，我们拥有充足的实习资源—内推、简历直达，连接各大互联网企业"
            ],
            
        }
    },

}
</script>

<style scoped>
.phonev{
    height: 40vw;
    overflow-x:hidden;
    overflow-y: scroll;
    font-size: 1rem;
}
 .join-text{
    height: 50px;
    padding-left: 10%;
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
    .introduction-text{
    height: 1.4rem;
    font-size: 1.4rem;
    font-weight: 700;
    letter-spacing:0.2rem;
    line-height: 1.35rem;
    border-left:0.3rem solid red;
    padding-left: 0.5rem;
    }

    .col{
    overflow: auto;
    }
    .colphone{
    overflow: hidden;
    height: 40vw;
    }

  .firstpageimg{
    width: 100%;
    height: 100%;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
     background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
     background-color: #d3dce6;
  }

.red{
    background: red
}
div{margin:0;border:0;padding:0;}
img{margin:0;border:0;padding:0;}

.backGround3{
    background:  url('../assets/img/back3.png') no-repeat bottom;
    background-size:100% 50%
}
.backGround4{
    background:  url('../assets/img/back4.png') no-repeat bottom;
    background-size:100% 60%
}
.ant-timeline.ant-timeline-alternate .ant-timeline-item-left .ant-timeline-item-content{
    left: 50%;
    width: 40%;
    text-align: left;
}
.boldText{
    height: 1.2rem;
    font-size: 1.4rem;
    letter-spacing:0.2rem;
    line-height: 1.35rem;
    border-left:0.3rem solid  red;
    padding-left: 0.5rem;
}
.el-carousel__indicators .el-carousel__indicator--horizontal {
    display: none;
    
}
 .el-row {
    margin-bottom: 20px;
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
  .artical{
      text-align: center;
      line-height: 250%;
      margin-bottom: 1rem;
  }
  .el{
      border: 1px solid #cccccc;
  }
  .introducetext1{
      font-size: 0.8rem;
      padding: 0 1rem;
  }
.el-carousel__indicator--horizontal{
    display: none;
}
.rowphone{
    height: 40vw  !important;
    overflow: auto;
}
</style>