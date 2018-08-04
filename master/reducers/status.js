let initialState = {
  userLogin: false,
}

export default function status(state = initialState, action){
  switch (action.type) {

    case 'LOGIN_OK':
    initialState.userLogin = true
    return initialState

    case 'LOGIN_FAIL':
    initialState.userLogin = false
    return initialState



    default:
    return state
  }
}
