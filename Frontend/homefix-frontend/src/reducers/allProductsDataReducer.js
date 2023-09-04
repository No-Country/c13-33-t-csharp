import { createSlice } from "@reduxjs/toolkit";

const allProductsDataSlice = createSlice({
  name: "allProductsData",
  initialState: [],
  reducers: {
    setAllProductsData(state, action) {
      return action.payload;
    },
    setCreateProduct(state, action) {
      state.push(action.payload);
    },
    setDeleteProduct(state, action) {
      const updatedProducts = state.find((product) => product.id === action.payload);
	  return { ...updatedProducts };
    },
  },
});

export const { setAllProductsData, setCreateProduct,setDeleteProduct } =
  allProductsDataSlice.actions;
export default allProductsDataSlice.reducer;
