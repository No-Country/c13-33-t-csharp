export const CREATE_PRODUCT_SUCCESS = 'CREATE_PRODUCT_SUCCESS';

export const createProductSuccess = (newProduct) => ({
  type: CREATE_PRODUCT_SUCCESS,
  payload: newProduct,
});

const initialState = {
    products: [],
  };
  
  const createProductReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'CREATE_PRODUCT':
        const newProducts = [...state.products, action.payload];
        console.log(newProducts);
        return { ...state, products: newProducts };
  
      default:
        return state;
    }
  };
  
  export default createProductReducer;
  