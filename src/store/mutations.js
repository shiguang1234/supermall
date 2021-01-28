import { ADD_COUNTER } from './mutations-types'

export default {
  //mutations中的方法尽量单一
  // addCart(state, payload) {
  //   //1.iid判断cartList是否存在payload,存在则oldProduct为payload，不存在则oldProduct为空
  //   // let oldProduct = null;
  //   // for (let item of state.cartList) {
  //   //   if (item.iid === payload.iid) {
  //   //     oldProduct = item;
  //   //   }
  //   // }

  //   let oldProduct = state.cartList.find(item => item.iid === payload.iid);

  //   //2.通过oldProduct是否为空，决定往cartList中添加元素，还是将已有元素的计数加一
  //   if (oldProduct) {
  //     oldProduct.count += 1;
  //   } else {
  //     payload.count = 1;
  //     state.cartList.push(payload);
  //   }
  // }

  //数量加1
  [ADD_COUNTER](state, payload) {
    payload.count++;
  },
  //添加到购物车
  addToCart(state, payload) {
    payload.checked = true; //记录商品的选中状态
    state.cartList.push(payload);
  }
}