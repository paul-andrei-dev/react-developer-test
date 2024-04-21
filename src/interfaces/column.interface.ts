import {ReactNode} from "react";
import {Entity} from "./entity.interface";

export default interface Column {
    name: string,
    label: string,
    isSortable?: boolean,
    render: (element: Entity) => ReactNode,
}
