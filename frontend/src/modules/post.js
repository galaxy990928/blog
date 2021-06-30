import {createAction, handleActions} from 'redux-actions';
import {takeLatest} from 'redux-saga/effects';
import * as postAPI from '../lib/api/post';
import createRequestSaga, {createRequestActionTypes} from '../lib/createRequestSaga';

const [WRITE, WRITE_SUCCESS, WRITE_FAILURE] = createRequestActionTypes('post/WRITE');
const [LIST, LIST_SUCCESS, LIST_FAILURE] = createRequestActionTypes('post/LIST');
const CHANGE_FIELD = 'post/CHANGE_FIELD';
const RESET_FIELD = 'post/RESET_FIELD';

export const write = createAction(WRITE, formData => formData);
export const list  = createAction(LIST, formData => formData);
export const changeField = createAction(CHANGE_FIELD, ({key, value}) => ({key, value}));
export const resetField = createAction(RESET_FIELD);

const listSaga = createRequestSaga(LIST, postAPI.list);
const writeSaga = createRequestSaga(WRITE, postAPI.write);
export function* postSaga() {
    yield takeLatest(WRITE, writeSaga);
    yield takeLatest(LIST, listSaga);
}

const initialState = {
    title : '',
    content : '',
    hashtag : '',
    hashtags : [],
    posts : [],
    postError : null,
}

const post = handleActions(
    {
        [LIST_SUCCESS] : (state, {payload : posts}) => ({
            ...state,
            posts,
        }),
        [LIST_FAILURE] : (state, {payload : e}) => ({
            ...state,
            posts : [],
            postError : e,
        }),
        [WRITE_SUCCESS] : (state, paylaod) => (
            {
                ...state,
                postError : true,
            }
        ),
        [WRITE_FAILURE] : (state, {payload : e}) => (
            {
                ...state,
                postError : e
            }
        ),
        [CHANGE_FIELD] : (state, {payload : {key, value}}) => ({
            ...state,
            [key] : value,
        }),
        [RESET_FIELD] : (state, payload) => ({
            ...initialState,
        })
    },
    initialState
)

export default post;