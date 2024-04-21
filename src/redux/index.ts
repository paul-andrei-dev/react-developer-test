import * as USERS_REDUCER from "./reducers/users";
import * as PROJECTS_REDUCER from "./reducers/projects";
import {PROJECTS, USERS} from "./constants";

export const ACTIONS = {
    [USERS]: {
        setSortingOptions: USERS_REDUCER.setSortingOptions,
        getUsers: USERS_REDUCER.getUsers,
    },
    [PROJECTS]: {
        setSortingOptions: PROJECTS_REDUCER.setSortingOptions,
        getProjects: PROJECTS_REDUCER.getProjects,
    }
}
