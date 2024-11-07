import {configureStore} from '@reduxjs/toolkit'
import {combineReducers} from "redux";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import alertsReducer from "../ducks/alerts";
import appReducer from "../ducks/app";
import countInstanceReducer from "../ducks/count-instance";
import entryItemsReducer from "../ducks/entry-items";

const rootReducer = combineReducers({
    alerts: alertsReducer,
    app: appReducer,
    countInstance: countInstanceReducer,
    entryItems: entryItemsReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ['app/uploadFile']
        }
    })
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
