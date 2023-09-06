const initialState = {
    users: [],
  };
  
  const createUserReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'CREATE_USER':
        const newUser = [...state.users, action.payload];
        console.log(newUser);
        return { ...state, products: newUser };
  
      default:
        return state;
    }
  };
  
  export default createUserReducer;
  