import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {appReducer} from "./reducers/app-reducer";
import {film5Reducer} from "./reducers/film-reducer";


const rootReducer = combineReducers({
     film5: film5Reducer,
     app: appReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer>
