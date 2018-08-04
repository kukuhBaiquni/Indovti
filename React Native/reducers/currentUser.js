let initialState = {
  email: '',
  password: '',
}

export default function status(state = initialState, action){
  switch (action.type) {

    case 'ADD_CURRENT_USER':
    initialState.email = action.data.user.email
    initialState.password = action.data.user.password
    return initialState

    default:
    return state
  }
}
