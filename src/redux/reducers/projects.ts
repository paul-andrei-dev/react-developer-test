import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from "../store";
import api from "../../lib/api"
import {PROJECTS} from "../constants";
import {getSortFunction, getSortFunctionByDate} from "../helpers";
import {DESC, SortDirection} from "../../interfaces/sortDirection.type";
import {Entity} from "../../interfaces/entity.interface";
import {
    FetchCollectionErrorResponse,
    FetchCollectionSuccessResponse
} from "../../interfaces/fetchCollectionResponse.interface";

export interface ProjectState {
    projects: Entity[],
    isLoading: boolean,
    error: FetchCollectionErrorResponse | null
    sort: {
        property: string,
        sortOrder: SortDirection
    }
}

const INIT_STATE: ProjectState = {
    projects: [],
    isLoading: false,
    error: null,
    sort: {
        property: 'timestamp',
        sortOrder: DESC
    },
};

export const getProjects = createAsyncThunk(
    `${PROJECTS}/getProjects`,
    async (_, {getState}) => {
        const fetchCollectionResponse = await api.getProjectsDiff() as FetchCollectionSuccessResponse;
        const {projects: {sort: {sortOrder, property}, projects}} = getState() as RootState;

        return [...(projects || []), ...fetchCollectionResponse.data].sort(getSortFunction(sortOrder, property));
    }
);

export const projects = createSlice({
    name: PROJECTS,
    initialState: INIT_STATE,
    reducers: {
        setSortingOptions: (state, action: PayloadAction<{ sortOrder: SortDirection, property: string }>) => {
            const {sortOrder, property} = action.payload;

            state.sort.sortOrder = sortOrder;
            state.sort.property = property;

            state.projects.sort(getSortFunction(sortOrder, property))
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getProjects.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(getProjects.fulfilled, (state, action) => {
                state.isLoading = false;
                state.projects = action.payload;
            })
            .addCase(getProjects.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error as unknown as FetchCollectionErrorResponse;
            });
    },
});

export const {setSortingOptions} = projects.actions;

export default projects.reducer;
