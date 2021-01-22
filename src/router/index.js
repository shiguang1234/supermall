import Vue from 'vue'
import VueRouter from 'vue-router'

//懒加载
const Home = () =>
  import ('views/home/Home')
const Category = () =>
  import ('views/category/Category')
const Cart = () =>
  import ('views/cart/Cart')
const Profile = () =>
  import ('views/profile/Profile')
const Detail = () =>
  import ('views/detail/Detail')

// 1.安装插件
Vue.use(VueRouter)

const routes = [
  // 配置映射关系
  {
    path: '',
    redirect: '/home'
  }, {
    path: '/home',
    component: Home
  }, {
    path: '/category',
    component: Category
  }, {
    path: '/cart',
    component: Cart
  }, {
    path: '/profile',
    component: Profile
  }, {
    // path: '/detail/:id', //动态路由传参数
    path: '/detail/:id',
    component: Detail
  }
]

// 2.创建路由对象
const router = new VueRouter({
  //传入属性
  routes,
  mode: 'history'
})

// 3.导出
export default router