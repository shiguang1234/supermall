import Toast from './Toast';

const obj = {};

obj.install = function(Vue) {
  //1.创建组件构造器
  const toastContrustor = Vue.extend(Toast);

  //2.new的方式，根据组件构造器，可以创建出一个组件对象
  const toast = new toastContrustor();

  //3.将组件对象，手动挂载到某一个元素上
  toast.$mount(document.createElement('div'));

  //4.toast.$el对应的就是上面创建的div,将组件对象添加到body中
  document.body.appendChild(toast.$el);

  //5.将toast组件对象绑定至Vue原型
  Vue.prototype.$toast = toast;
}

export default obj