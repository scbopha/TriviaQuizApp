import { call, put, takeEvery, takeLatest, all } from 'redux-saga/effects';
import Apis from '../apis'

function* loadQuiz(action) {  
  try {
    let {data} = yield call(Apis.loadQuiz)
    yield put({type: 'LOAD_SUCCESSED', payload: data.results})
  } catch (err) {
    yield put({type: 'LOAD_FAILED', payload: err})
  }
}

export default function * rootSaga() {
  yield takeLatest('LOAD_QUIZ', loadQuiz)
}