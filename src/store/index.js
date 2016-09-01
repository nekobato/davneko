import Vue from 'vue'
import Vuex from 'vuex'
// import * as actions from './actions'
// modules からパーツをインポート
// import { cartInitialState, cartMutations } from './modules/cart'
// import { productsInitialState, productsMutations } from './modules/products'

Vue.use(Vuex)

export default new Vuex.Store({
  // ...
  // root なステートにサブツリーを結合
  state: {
    // cart: cartInitialState,
    // products: productsInitialState
  }
  // ミューテーションは複数の modules から
  // ミューテーション定義オブジェクトの配列にすることが可能
  // mutations: [cartMutations, productsMutations]
})
