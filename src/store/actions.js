import { ADD_COUNTER } from './mutations-types'

export default {
  addCart(context, payload) {
    //Toast，弹窗
    return new Promise((resolve, reject) => {
      //1.iid判断cartList是否存在payload,存在则oldProduct为payload，不存在则oldProduct为空
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid);

      //2.通过oldProduct是否为空，决定往cartList中添加元素，还是将已有元素的计数加一
      if (oldProduct) {
        // oldProduct.count += 1;
        context.commit(ADD_COUNTER, oldProduct);
        resolve('当前的商品数量+1');
      } else {
        payload.count = 1;
        // state.cartList.push(payload);
        context.commit('addToCart', payload)
        resolve('添加了新的商品');
      }
    })

  }
}