import {DESC, ASC, SortDirection} from "../interfaces/sortDirection.type";
import get from 'lodash/get';
import {Entity} from "../interfaces/entity.interface";

export function getRequestSortOptions(name: string, sort: { name: string, type: SortDirection }) {
    if (sort.name === name) {
        return {
            name,
            type: (sort.type === ASC ? DESC : ASC) as SortDirection,
        };
    }

    return {
        name,
        type: ASC as SortDirection,
    };
}

export const getSortFunctionByDate = (sortOrder: SortDirection) => {
    const direction = sortOrder === ASC ? 1 : -1;
    return (date1: Entity, date2: Entity) => direction * (date1.timestamp - date2.timestamp)
}

export const getSortFunction = (sortOrder: SortDirection, property: string) => {
    const direction = sortOrder === ASC ? 1 : -1;
    const compare = <T>(element1: T, element2: T) => {
        return element1 < element2 ? -1 : (element1 > element2 ? 1 : 0);
    }

    return (date1: { [x: string]: any; }, date2: { [x: string]: any; }) => direction * compare(get(date1, property), get(date2, property))
}
