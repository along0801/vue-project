// 入口文件
// 导入 Vue 模块
import Vue from 'vue';

// 1.1 导入路由的包
import VueRouter from 'vue-router';
// 1.2 安装路由模块
Vue.use(VueRouter);

// 注册 vuex
import Vuex from 'vuex';
Vue.use(Vuex);

// 每次刚进入 网站，肯定会调用 main.js 在刚调用的时候，先从本地存储中，把 购物车的数据读取出来，放到 store 中
const car = JSON.parse(localStorage.getItem('car') || '[]');

const store = new Vuex.Store({
  state: { // 调用方法 this.$store.state.***
    car: car  //将 购物车中的商品数据，用一个数组存储起来，在 car 数组中，存储一些商品的对象，可以暂时将这个商品对象设计成
    // { id: 商品的id, count: 要购买的数量, price: 商品的单价, selected: true }
  },
  mutations: { // 调用方法  this.$store.commit('方法的名称'，'按需传递唯一的参数')
    addToCar(state, goodsinfo) {
      // 点击加入购物车，把商品信息，保存到 store 中的 car 上
      // 分析： 
      // 1. 如果购物车之中，之前就已经有这个对应的商品了，那么，只需要更新数量
      // 2. 如果没有，则直接把 商品数据，push 到 car 中即可

      // 假设 在购物车中，没有找到对应的商品
      let flag = false;

      state.car.some(item => {
        if (item.id === goodsinfo.id) {
          item.count += parseInt(goodsinfo.count);
          flag = true;
          return true;
        }
      });

      // 如果最终循环完毕，得到的 flag 还是 false，则把商品数据直接 push 到购物车中
      if (!flag) {
        state.car.push(goodsinfo);
      }

      // 当更新 car 之后，把 car 数组，存储到 本地的 localStoreage 中
      localStorage.setItem('car', JSON.stringify(state.car));

    },
    updateGoodsInfo(state, goodsinfo) {
      // 修改购物车中商品的数量值
      state.car.some(item => {
        if (item.id === goodsinfo.id) {
          item.count = parseInt(goodsinfo.count);
          return true;
        }
      })

      // 当修改完商品的数量，把最新购物车数据存储到 本地的 localStoreage 中
      localStorage.setItem('car', JSON.stringify(state.car));
    },
    removeFromCar(state, id) {
      // 根据 id，从 store 中的购物车中删除对应的那条商品数据
      state.car.some((item, i) => {
        if (item.id === id) {
          state.car.splice(i, 1);
          return true;
        }
      });
      // 当删除完商品后，把最新购物车数据存储到 本地的 localStoreage 中
      localStorage.setItem('car', JSON.stringify(state.car));
    },
    updateGoodsSelected(state, info) {
      state.car.some(item => {
        if (item.id === info.id) {
          item.selected = info.selected;
        }
      });

      localStorage.setItem('car', JSON.stringify(state.car));
    }
  },
  getters: {  // 调用方法 this.$store.getters.***
    // 相当于 计算属性，也相当于 filters
    getAllCount(state) {
      let c = 0;
      state.car.forEach(item => {
        c += item.count;
      });
      return c;
    },
    getGoodsCount(state) {
      let o = {};
      state.car.forEach(item => {
        o[item.id] = item.count;
      });
      return o;
    },
    getGoodsSelected(state) {
      let b = {};
      state.car.forEach(item => {
        b[item.id] = item.selected;
      });
      return b;
    },
    getGoodsCountAndAmount(state) {
      let o = {
        count: 0,  //勾选的数量
        amount: 0  //勾选的总价
      };
      state.car.forEach(item => {
        if (item.selected) {
          o.count += item.count;
          o.amount += item.price * item.count;
        }
      });
      return o;
    }
  }
});

// 导入 App 根组件
import app from './App.vue';

// 导入 MUI 的样式
import './lib/mui/css/mui.min.css';
import './lib/mui/css/icons-extra.css';

// #along: 导入主页的 css 样式
import './lib/css/main.css';

// #along: 导入 mock
import './lib/mui/js/mock.js';

// 导入格式化时间的插件
import moment from 'moment';
// 定义全局的过滤器
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern);
});

// 2.1 导入 vue-resource
import VueResource from 'vue-resource';
// 2.2 安装 vue-resource
Vue.use(VueResource);
// 设置请求的根路径
Vue.http.options.root = 'http://www.liulongbin.top:3005';
// 全局设置 post 时候表单数据格式阻止形式  application/x-www-form-urlencoded
Vue.http.options.emulateJSON = true;

// 按需导入 Mint-UI 中的组件
/* import { Header, Swipe, SwipeItem, Button, Lazyload } from 'mint-ui';
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.use(Lazyload); */
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(MintUI);

// 安装图片预览插件
import VuePreview from 'vue-preview'
// defalut install
Vue.use(VuePreview)

// 1.3 导入自己的 router.js 路由模块
import router from './router.js';



const vm = new Vue({
  el: '#app',
  render: c => c(app),
  router: router,  // 1.4 挂载路由对象到 VM 实例上
  store: store  // 把 store 挂载到 vm 实例上
})