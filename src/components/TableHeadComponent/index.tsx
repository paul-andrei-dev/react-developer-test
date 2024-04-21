import * as React from 'react';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {FC} from "react";
import {TableSortLabel} from "@mui/material";
import {SortDirection} from "../../interfaces/sortDirection.type";
import Column from "../../interfaces/column.interface";

interface Props {
    columns: Column[],
    onSort?: (direction: SortDirection, property: string) => void,
    sortOptions?: {
        name: string,
        type: SortDirection,
    }
}

const TableHeadComponent: FC<Props> = (props) => {
    const {columns, onSort, sortOptions} = props;

    const renderColumns = (column: Column, index: number) => {
        if (column.isSortable) {
            const sortDirection = sortOptions?.name === column.name ? sortOptions.type : 'asc';

            return <TableCell align="center" key={`column-${index}`}>
                <TableSortLabel
                    active={sortOptions?.name === column.name}
                    direction={sortDirection}
                    {...(!!onSort && !!sortOptions && {
                        onClick: () => onSort(sortOptions.type, column.name)
                    })}
                >
                    {column.label}
                </TableSortLabel>
            </TableCell>
        }

        return (
            <TableCell align="center" key={`column-${index}`}>{column.label}</TableCell>
        )

    }

    return (
        <TableHead>
            <TableRow>
                {columns.map((column, index) => renderColumns(column, index))}
            </TableRow>
        </TableHead>
    );
}

export default TableHeadComponent
