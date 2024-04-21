import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import usersReducer from './reducers/users';
import projectsReducer from './reducers/projects';
import {PROJECTS, USERS} from "./constants";

export const store = configureStore({
    reducer: {
        [USERS]: usersReducer,
        [PROJECTS]: projectsReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
    >;
