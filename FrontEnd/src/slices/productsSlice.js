import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    loading: false
  },
  reducers: {
    productsRequest(state, action){
      return {
        loading: true,
      }
    },
    productsSuccess(state,action){
      return{
        loading: false,
        products: action.payload.products,
        productsCount: action.payload.count,
        resPerPage: action.payload.resPerPage
      }
    },
    productsFail(state, action){
      return {
        loading: false,
        error: action.payload
      }
    },

    adminProductsRequest(state, action){
      return {
        loading: true,
      }
    },
    adminProductsSuccess(state,action){
      return{
        loading: false,
        products: action.payload.products,
      }
    },
    adminProductsFail(state, action){
      return {
        loading: false,
        error: action.payload
      }
    }



  }
});

//Actioncreator - action object creating functions , it will send the reducer
const { actions, reducer } = productsSlice;
export const {
  productsRequest,
  productsSuccess,
  productsFail,
  adminProductsRequest,
  adminProductsFail,
  adminProductsSuccess
}  = actions

export default reducer;
