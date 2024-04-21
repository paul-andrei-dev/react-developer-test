import * as React from 'react';
import {FC, ReactNode} from "react";
import {CircularProgress} from "@mui/material";

interface Props {
    isLoading: boolean,
    children?: ReactNode,
}

export const LoadingComponent: FC<Props> = ({isLoading, children}) => {
    return (
        <>
            {isLoading ? (
                <CircularProgress/>
            ) : (
                children
            )}
        </>
    )
}
