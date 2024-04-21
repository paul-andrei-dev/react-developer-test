import * as React from 'react';
import {FC} from "react";
import {Button, TableBody, TableCell, TableRow, Typography} from "@mui/material";
import {LoadingComponent} from "../LoadingComponent";
import {Entity} from "../../interfaces/entity.interface";

interface Props {
    isLoading: boolean,
    hasError: boolean,
    onFetchResources: () => void
}

const TableLoadingRowComponent: FC<Props> = (props) => {
    const {isLoading, hasError, onFetchResources} = props;

    return (
        <TableRow>
            <TableCell colSpan={4} align="center">
                <LoadingComponent isLoading={isLoading}>
                    {hasError
                        ? (
                            <>
                                <Typography sx={{color: 'red', mb: 1}}>
                                    We had a problem fetching your data. Please try again.
                                </Typography>
                                <Button variant="contained" color="primary"
                                        onClick={onFetchResources}>
                                    Try again
                                </Button>
                            </>
                        ) : (
                            <Button variant="contained" color="primary"
                                    onClick={onFetchResources}>
                                Load more
                            </Button>
                        )
                    }
                </LoadingComponent>
            </TableCell>
        </TableRow>
    );
}

export default TableLoadingRowComponent
