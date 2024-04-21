import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from "../store";
import api from "../../lib/api"
import {USERS} from "../constants";
import {getSortFunction, getSortFunctionByDate} from "../helpers";
import {DESC, SortDirection} from "../../interfaces/sortDirection.type";
import {Entity} from "../../interfaces/entity.interface";
import {
    FetchCollectionErrorResponse,
    FetchCollectionSuccessResponse
} from "../../interfaces/fetchCollectionResponse.interface";

export interface UsersState {
    users: Entity[],
    isLoading: boolean,
    error: FetchCollectionErrorResponse | null
    sort: {
        property: string,
        sortOrder: SortDirection
    }
}

const INIT_STATE: UsersState = {
    users: [],
    isLoading: false,
    error: null,
    sort: {
        property: 'timestamp',
        sortOrder: DESC
    },
};

export const getUsers = createAsyncThunk(
    `${USERS}/getUsers`,
    async (_, {getState}) => {
        const fetchCollectionResponse = await api.getUsersDiff() as FetchCollectionSuccessResponse;
        const {users: {sort: {sortOrder, property}, users}} = getState() as RootState;

        return [...(users || []), ...fetchCollectionResponse.data].sort(getSortFunction(sortOrder, property));
    }
);

export const users = createSlice({
    name: USERS,
    initialState: INIT_STATE,
    reducers: {
        setSortingOptions: (state, action: PayloadAction<{ sortOrder: SortDirection, property: string }>) => {
            const {sortOrder, property} = action.payload;

            state.sort.sortOrder = sortOrder;
            state.sort.property = property;

            state.users.sort(getSortFunction(sortOrder, property))
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUsers.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload;
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error as unknown as FetchCollectionErrorResponse;
            });
    },
});

export const {setSortingOptions} = users.actions;

export default users.reducer;
