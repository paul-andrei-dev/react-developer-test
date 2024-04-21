import * as React from 'react';
import {FC, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {ACTIONS} from "../../redux";
import {PROJECTS, USERS} from "../../redux/constants";
import {Box, Container} from "@mui/material";
import TableComponent from "../../components/TableComponent";
import {RootState} from "../../redux/store";
import {USERS_COLUMNS} from "../../constants/columns/users";
import {SortDirection} from "../../interfaces/sortDirection.type";
import {getRequestSortOptions} from "../../redux/helpers";
import {PROJECTS_COLUMNS} from "../../constants/columns/projects";

export const HomeContainer: FC = () => {
    const dispatch = useAppDispatch();

    const users = useAppSelector((state: RootState) => state.users.users);
    const usersIsLoading = useAppSelector((state: RootState) => state.users.isLoading);
    const usersError = useAppSelector((state: RootState) => state.users.error);
    const {property: userProperty, sortOrder: userSortOrder} = useAppSelector((state: RootState) => state.users.sort);
    const projects = useAppSelector((state: RootState) => state.projects.projects);
    const projectsIsLoading = useAppSelector((state: RootState) => state.projects.isLoading);
    const projectsError = useAppSelector((state: RootState) => state.projects.error);
    const {
        property: projectProperty,
        sortOrder: projectSortOrder
    } = useAppSelector((state: RootState) => state.projects.sort);

    useEffect(() => {
        getUsers();
        getProjects();
    }, [])

    const userSortOptions = {
        name: userProperty,
        type: userSortOrder
    }

    const projectSortOptions = {
        name: projectProperty,
        type: projectSortOrder
    }

    const getUsers = () => {
        dispatch(ACTIONS[USERS].getUsers())
    }

    const getProjects = () => {
        dispatch(ACTIONS[PROJECTS].getProjects())
    }

    const onUsersSort = (sortOrder: SortDirection, property: string) => {
        const parsedSortOptions = {name: property, type: sortOrder}
        const newSort = getRequestSortOptions(property, parsedSortOptions);

        dispatch(ACTIONS[USERS].setSortingOptions({sortOrder: newSort.type, property: newSort.name}))
    }

    const onProjectsSort = (sortOrder: SortDirection, property: string) => {
        const parsedSortOptions = {name: property, type: sortOrder}
        const newSort = getRequestSortOptions(property, parsedSortOptions);

        dispatch(ACTIONS[PROJECTS].setSortingOptions({sortOrder: newSort.type, property: newSort.name}))
    }

    const usersLoadingRowConfig = {
        hasError: !!usersError,
        isLoading: usersIsLoading,
        onFetchResources: getUsers
    }

    const projectsLoadingRowConfig = {
        hasError: !!projectsError,
        isLoading: projectsIsLoading,
        onFetchResources: getProjects
    }

    return (
        <Container className="app" fixed>
            <Box data-testid="app-box" m={2} display={'flex'} gap={10} flexDirection={"column"}>
                <TableComponent
                    columns={USERS_COLUMNS}
                    data={users}
                    loadingRowConfig={usersLoadingRowConfig}
                    onSort={onUsersSort}
                    sortOptions={userSortOptions}
                />
                <TableComponent
                    columns={PROJECTS_COLUMNS}
                    data={projects}
                    loadingRowConfig={projectsLoadingRowConfig}
                    onSort={onProjectsSort}
                    sortOptions={projectSortOptions}
                />
            </Box>
        </Container>
    );
};

export default HomeContainer;
