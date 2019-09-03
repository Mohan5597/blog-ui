import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import countReducer from '../reducers/count'

const configureStore=() =>{
    const store=createStore(combineReducers({
        count:countReducer
    }),applyMiddleware(thunk))
    return store
}
export default configureStore