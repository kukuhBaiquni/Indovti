import {combineReducers} from 'redux'
import status from './status'
import currentUser from './currentUser'
import data from './data'

const rootReducer = combineReducers({
  status, currentUser, data
})

export default rootReducer
