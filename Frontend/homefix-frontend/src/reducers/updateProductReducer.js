const initialState = {
  products: [],
};

const updateProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATE_PRODUCT':
      const updatedProducts = state.products.map(product => {
        if (product.id === action.payload.id) {
          // Actualizamos el producto con los datos del payload
          return { ...product, ...action.payload };
        }
        return product;
      });
      console.log(updatedProducts);
      return { ...state, products: updatedProducts };

    default:
      return state;
  }
};

export default updateProductReducer;
