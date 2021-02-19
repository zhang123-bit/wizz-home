// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'ant-design-vue/dist/antd.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { Button, Card, DatePicker, Drawer, 
  Form, Input, InputNumber, Layout, Menu, 
  Pagination, Radio, Row,Select,TimePicker,
  Timeline,message,Icon,Avatar,Col,Dropdown,
  List,Table,Cascader,Modal,Upload,Collapse,Tooltip,Steps} from 'ant-design-vue'
import App from '@/App'
import router from '@/router'
import { Loading } from 'element-ui';
import moment from 'moment'
import axios from 'axios'
Vue.use(axios)

Vue.config.productionTip = false
Vue.use(Button)
Vue.use(Tooltip)
Vue.use(Collapse)
Vue.use(Upload)
Vue.use(Modal)
Vue.use(Cascader)
Vue.use(Card)
Vue.use(DatePicker)
Vue.use(Drawer)
Vue.use(Form)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Pagination)
Vue.use(Row)
Vue.use(Select)
Vue.use(TimePicker)
Vue.use(Timeline)
Vue.use(Icon)
Vue.use(Radio)
Vue.use(Avatar)
Vue.use(Col)
Vue.use(Dropdown)
Vue.use(List)
Vue.use(Table)
Vue.use(Steps)
Vue.use(ElementUI);

Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$message = message
Vue.prototype.$moment = moment;
Vue.prototype.$http = axios
console.log(Vue.prototype);
export default Vue.prototype.$http

//request拦截器 添加一个请求拦截器  
axios.interceptors.request.use(function (config) {
  Loading.service({background: 'rgba(0, 0, 0, 0)'})
	return config
});
//response拦截器，用来处理加载图标
axios.interceptors.response.use(function (response) {
  let loading=Loading.service({background: 'rgba(0, 0, 0, 0)'})
  loading.close()
	return response;
});
axios.defaults.baseURL=process.env.API_PATH+'/api';//设置基址
/* eslint-disable no-new */
 new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
