<template>
    <div >
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
                label="填写面评"
                type="textarea"
                maxlength="1000"
                 :rules="[{ required: true, message: '面评为必填项' }]"
                show-word-limit
                ></van-field>
         <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
        </van-form>
    </div>
</template>
<script>
export default {
    created () {
        console.log(this.$route.query);
     if(!this.$route.query.id||!this.$route.query.jwt){
            this.$router.replace('/homepage')
        }
       /*if (this._isMobile()) {
      this.phone=true
    } else {
      this.phone=false
      console.log(this.phone);
      this.$router.replace('/homepage')
    }*/
    },
    data () {
        return {
            name:'张三',
            radio: '1', 
            message:''
        }
    },
    methods: {
         _isMobile() {
      let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
      return flag;
    },
    onSubmit(values) {
      console.log('submit', values);
      this.$notify.success('提交成功');
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