import { createSlice } from '@reduxjs/toolkit';

const updateProductSlice = createSlice({
  name: 'updateProduct',
  initialState: [],
  reducers: {
    updateProduct: (state, action) => {
      const updatedProduct = action.payload;
      const index = state.findIndex(product => product.id === updatedProduct.id);
      if (index !== -1) {
        state[index] = updatedProduct;
      }
    },
  },
});

export const { updateProduct } = updateProductSlice.actions;
export default updateProductSlice.reducer;