const initialState = {
  products: [],
};

const updateProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_PRODUCT':
      const index = state.products.findIndex(product => product.id === action.payload.id);
      

      const updatedProducts = [...state.products];

      if (index !== -1) {
        updatedProducts[index] = action.payload;
      }

      console.log(updatedProducts);
      return { ...state, products: updatedProducts };

    default:
      return state;
  }
};

export default updateProductReducer;
