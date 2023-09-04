const initialState = {
  products: [], 
};

const deleteProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'DELETE_PRODUCT':
      const updatedProducts = state.products.filter(product => product.id !== action.payload);
      console.log(updatedProducts);
      return { ...state, products: updatedProducts };

    default:
      return state;
  }
};

export default deleteProductReducer;
