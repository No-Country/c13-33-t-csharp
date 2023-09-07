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
  