const initialState = {
    brands: [],
  };
  
  const createBrandReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'CREATE_BRAND':
        const newBrand = [...state.products, action.payload];
        console.log(newBrand);
        return { ...state, products: newBrand };
  
      default:
        return state;
    }
  };
  
  export default createBrandReducer;
  