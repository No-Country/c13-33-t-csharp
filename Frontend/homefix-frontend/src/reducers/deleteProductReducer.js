// reducers/productReducer.js

const initialState = {
    products: [], // Tu estado de productos
  };
  
  const deleteProductReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'DELETE_PRODUCT':
        const updatedProducts = state.products.filter(
          (product) => product.id !== action.payload
        );
        return { ...state, products: updatedProducts };
  
      default:
        return state;
    }
  };
  
  export default deleteProductReducer;
  