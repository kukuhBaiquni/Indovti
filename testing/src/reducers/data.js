let initialState = []

export default function status(state = initialState, action){
  switch (action.type) {

    case 'ADD_DATA_SUCCESS':
    console.log(action.type);
    return []

    default:
    return state
  }
}
