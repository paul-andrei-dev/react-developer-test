import React, {ReactNode} from 'react';
import {Typography} from "@mui/material";
import {Entity} from "../../interfaces/entity.interface";
import Column from "../../interfaces/column.interface";

const USER_DATE: Column = {
    name: 'timestamp',
    label: 'Date',
    isSortable: true,
    render: (user: Entity) => (
        <Typography>
            {new Date(user.timestamp).toISOString().slice(0, 10)}
        </Typography>
    ),
}

const USER_ID: Column = {
    name: 'id',
    label: 'User Id',
    render: (user: Entity) => (
        <Typography>
            {user.id}
        </Typography>
    ),
}

const OLD_VALUE: Column = {
    name: 'diff.0.oldValue',
    label: 'Old Value',
    render: (user: Entity) => (
        <Typography>
            {user.diff[0].oldValue}
        </Typography>
    ),
}

const NEW_VALUE: Column = {
    name: 'diff.0.newValue',
    label: 'New Value',
    render: (user: Entity) => (
        <Typography>
            {user.diff[0].newValue}
        </Typography>
    ),
}

export const USERS_COLUMNS = [
    USER_DATE,
    USER_ID,
    OLD_VALUE,
    NEW_VALUE
]
