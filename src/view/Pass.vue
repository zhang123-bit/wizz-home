<template>
    <div >
        <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="info-o" >
        关闭前未提交评价将不会保存当前的内容
       </van-notice-bar>
       <br>
        <van-cell title="姓名" :value="name"  border class="cell"></van-cell>
        <br>
        <van-form @submit="onSubmit">
        <van-field name="radio" label="是否通过" class="cell">
        <template #input>
            <van-radio-group v-model="radio" direction="horizontal" @change='onchange'>
            <van-radio name="1">通过</van-radio>
            <van-radio name="0">不通过</van-radio>
            </van-radio-group>
        </template>
        </van-field>
        <br>
         <van-field
                v-model="message"
                rows="2"
                autosize
                name="message"
                class="cell"
                label="面试评价"
                type="textarea"
                maxlength="1000"
                 :rules="[{ required: true, message: '请输入对面试者的面试评价' }]"
                show-word-limit
                ></van-field>
         <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit" :disabled='isclick==false'>提交</van-button>
        </div>
        </van-form>
    </div>
</template>
<script>
import { Dialog } from 'vant';
export default {
    created () {
     window.addEventListener("beforeunload", e => {
            this.beforeunloadHandler(e);
        }); 
        console.log(this.$route.query);
     if(!this.$route.query.id||!this.$route.query.jwt){
            this.$router.replace('/homepage')
        }else{
            this.getresum()
        }
      
    },
    mounted () {
   
    },
    destroyed(){
        window.removeEventListener("beforeunload", e => {
            this.beforeunloadHandler(e);
        });
    },
    data () {
        return {
            isclick:true,
            name:'',
            radio: '1', 
            message:''
        }
    },
    methods: {
        beforeunloadHandler(e) {
        e = e || window.event;
        if (e) {
            e.returnValue = "您是否确认离开此页面-您输入的数据可能不会被保存";
        }
        return "您是否确认离开此页面-您输入的数据可能不会被保存";
        },
     getresum:async function(){
         console.log('请求数据');
          const res=await this.$http.get(`/resumes/${this.$route.query.id}`)
          if(res.status!=200){
              this.$notify.error('获取页面失败,请联系管理员或稍后重试');
          }
          console.log(res.data);
          this.name=res.data.Name
          if(res.data.InterviewResult==1||2){
              this.isclick=false
          }
      },
    onSubmit: async function(values) {
        Dialog.confirm({
                    title: '提醒',
                    message: '如果您点击了提交，将无法再次修改',
                    })
                    .then(async () => {
                         console.log('submit', values);
                        const res=await this.$http({
                                url:'/resumes/result/'+this.$route.query.id,
                                        method:'put',
                                        data:{
                                        Type:1,
                                        Result:this.radio,
                                        InterviewEvaluation:this.message
                                        },
                                        headers: {
                                        'Authorization': `Bearer ${this.$route.query.jwt}`,
                                    }
                            })
                         console.log(res);
                        if(res.status==200){
                            this.isclick=false
                            if(res.data.code==10001){
                                console.log('111');
                                 this.$notify.error('无法重复提交');
                            }else{
                                this.$notify.success('提交面评成功,请及时通知投递者面试结果哦');
                            }
                                
                            }else{
                                    this.$notify.error('提交面评失败,请联系管理员或稍后重试');
                            }
                    })
                    .catch(() => {
                        // on cancel
                    }); 
    },
    onchange(value){    
        console.log('单选框',value);
    }
    }
}
</script>
<style  scoped>
.cell{
    background:#f2f3f5;
}
</style>