const initState = {
    userEmail: "",
    userName: "",
    userId: "",
    loggedIn: false
  }
  
  const rootReducer = (state = initState, action) => {
    
    if(action.type === 'LOGIN'){
     return {
      ...state,
       userEmail: action.email,
       userName: action.name,
       userId: action.id,
       loggedIn: true
     }
    }
    if(action.type === 'LOGOUT'){
      return {
        ...state,
        userEmail: "",
        userName: "",
        userId: "",
        loggedIn: false
      }
    }
    return state;
  }
  
  export default rootReducer