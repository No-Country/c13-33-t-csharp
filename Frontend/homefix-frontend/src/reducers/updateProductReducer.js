import { createSlice } from '@reduxjs/toolkit';

const updateProductSlice = createSlice({
  name: 'updateProduct',
  initialState: [],
  reducers: {
      updateProduct: (state, action) => {
        const updatedProduct = action.payload;
        return state.map(product => {
          if (product.id === updatedProduct.id) {
            return updatedProduct;
          }
          return product;
        });
      },
    },
  });

export const { updateProduct } = updateProductSlice.actions;
export default updateProductSlice.reducer;