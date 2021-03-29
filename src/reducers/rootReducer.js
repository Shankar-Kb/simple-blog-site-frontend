const initState = {
    userEmail: "",
    userName: "",
    userId: "",
    userRole: "",
    loggedIn: false
  }
  
  const rootReducer = (state = initState, action) => {
    
    if(action.type === 'LOGIN'){
     return {
      ...state,
       userEmail: action.email,
       userName: action.name,
       userId: action.id,
       userRole: action.role,
       loggedIn: true
     }
    }
    if(action.type === 'LOGOUT'){
      return {
        ...state,
        userEmail: "",
        userName: "",
        userId: "",
        userRole: "",
        loggedIn: false
      }
    }
    return state;
  }
  
  export default rootReducer