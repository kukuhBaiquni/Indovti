import {put, takeEvery, all} from 'redux-saga/effects'

export const init = (email, password) => {
  var user = {
    email, password
  }
  return {type: 'LOGIN_ATTEMPT', user}
}

export const addfood = (data) => {
  return {type: 'ADD_DATA', data}
}

const loginSuccess = () => {
  return {type: 'LOGIN_OK'}
}

const loginFail = () => {
  return {type: 'LOGIN_FAIL'}
}

function* watcherLogin(user){
  yield takeEvery('LOGIN_ATTEMPT', workerLogin)
}

function* workerLogin(data){
  try {
    yield put({type: 'ADD_CURRENT_USER', data})
    yield put(loginSuccess())
  } catch (error) {
    yield put(loginFail())
  }
}


function* watcherData(data){
  yield takeEvery('ADD_DATA', workerData)
}

function* workerData(item){
  try {
    yield put({type: 'ADD_DATA_SUCCESS', item})
  } catch (error) {
    yield put({type: 'ADD_DATA_FAIL'})
  }
}

export default function* rootSaga(){
  yield all([
    watcherLogin(),
    watcherData()
  ])
}
