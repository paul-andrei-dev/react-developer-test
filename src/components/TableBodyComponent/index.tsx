import * as React from 'react';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import {FC} from "react";
import TableLoadingRowComponent from "../TableLoadingRowComponent";
import {StyledTableRow} from "./styles";
import Column from "../../interfaces/column.interface";

interface Props {
    data: any[]
    columns: Column[],
    loadingRowConfig?: {
        hasError: boolean,
        isLoading: boolean,
        onFetchResources: () => void
    }
}

const TableBodyComponent: FC<Props> = (props) => {
    const {data, columns, loadingRowConfig} = props;
    const hasLoadingRow = !!loadingRowConfig;

    return (
        <TableBody>
            {data?.map((entity: any, dataIndex) => (
                <StyledTableRow
                    key={`tableCell-${dataIndex}`}
                >
                    {columns.map((column, columnIndex) => {
                        return (
                            <TableCell align="center" key={`tableCell-${columnIndex}`}>
                                {column.render(entity)}
                            </TableCell>
                        )
                    })}
                </StyledTableRow>
            ))}
            {hasLoadingRow && (
                <TableLoadingRowComponent {...loadingRowConfig}/>
            )}
        </TableBody>
    );
}

export default TableBodyComponent
