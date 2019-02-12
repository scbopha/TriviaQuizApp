const initialState = {
  isLoading: false,
  loadResult: {success: true, data: []},
};

export const ApiReducer = (state = initialState, action) => {  
  switch(action.type) {
    case 'LOAD_QUIZ':
      return {...state, isLoading: true}
    case 'LOAD_SUCCESSED':
      return {...state, isLoading: false, loadResult: {success: true, data: action.payload}};
    case 'LOAD_FAILED':
      return {...state, isLoading: false, loadResult: {success: false, error: action.payload}};
    default: return state;
  }
}