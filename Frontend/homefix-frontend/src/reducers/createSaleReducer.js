import { createSlice } from '@reduxjs/toolkit';

const createSaleSlice = createSlice({
  name: 'updateProduct',
  initialState: [],
  reducers: {
      createSale: (state, action) => {
        const createdSale = action.payload;
        return state.map(product => {
          if (product.id === createdSale.id) {
            return createdSale;
          }
          return product;
        });
      },
    },
  });

export const { createSale } = createSaleSlice.actions;
export default createSaleSlice.reducer;