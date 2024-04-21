import {SortDirection} from "./sortDirection.type";
import {Entity} from "./entity.interface";
import {FetchCollectionErrorResponse} from "./fetchCollectionResponse.interface";

export interface UsersState {
    users: Entity[],
    isLoading: boolean,
    error: FetchCollectionErrorResponse | null
    sort: {
        sortOrder: SortDirection
    }
}
