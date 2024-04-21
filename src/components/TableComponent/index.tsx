import * as React from 'react';
import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import {FC} from "react";
import TableHeadComponent from "../TableHeadComponent";
import TableBodyComponent from "../TableBodyComponent";
import {SortDirection} from "../../interfaces/sortDirection.type";
import Column from "../../interfaces/column.interface";

interface Props {
    columns: Column[],
    data: any[],
    onSort?: (direction: SortDirection, property: string) => void,
    sortOptions?: {
        name: string,
        type: SortDirection,
    }
    loadingRowConfig?: {
        hasError: boolean,
        isLoading: boolean,
        onFetchResources: () => void
    },
}

const TableComponent: FC<Props> = (props) => {
    const {columns, data, onSort, sortOptions, loadingRowConfig} = props;

    return (
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 650}} aria-label="simple table">
                <TableHeadComponent
                    columns={columns}
                    onSort={onSort}
                    sortOptions={sortOptions}
                />
                <TableBodyComponent
                    columns={columns}
                    data={data}
                    loadingRowConfig={loadingRowConfig}
                />
            </Table>
        </TableContainer>
    );
}

export default TableComponent
