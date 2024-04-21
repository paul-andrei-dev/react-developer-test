import {usersDiff, projectsDiff} from './data';
import {Entity} from "../../interfaces/entity.interface";
import {FetchCollectionFunction, FetchCollectionResponse} from "../../interfaces/fetchCollectionResponse.interface";

const DEFAULT_DELAY: number = 2000;
const PAGE_SIZE: number = 3;

const resolveOrRejectCollection = (timesCalled: number, collection: Entity[]) => (): Promise<FetchCollectionResponse> => {
    return new Promise((resolve, reject) => {
        const id = setTimeout(() => {
            timesCalled += 1;
            const sliceStart: number = PAGE_SIZE * (Math.ceil(timesCalled / 2) - 1);
            const sliceEnd: number = PAGE_SIZE * Math.ceil(timesCalled / 2);
            const totalItems: number = collection.length;
            const hasItems: boolean = sliceStart < totalItems;

            clearTimeout(id);

            if (timesCalled % 2 === 0) {
                return reject({
                    code: 500,
                    error: 'Uknown error',
                });
            }

            return resolve({
                code: 200,
                data: collection.slice(sliceStart, sliceEnd),
                limit: PAGE_SIZE,
                offset: hasItems ? sliceStart : totalItems,
                total: totalItems,
            });
        }, DEFAULT_DELAY)
    });
};

const getProjectsDiff = (): FetchCollectionFunction => {
    let timesCalled: number = 0;

    return resolveOrRejectCollection(timesCalled, projectsDiff);
};

const getUsersDiff = (): FetchCollectionFunction => {
    let timesCalled: number = 0;

    return resolveOrRejectCollection(timesCalled, usersDiff);
};

export default {
    getProjectsDiff: getProjectsDiff(),
    getUsersDiff: getUsersDiff(),
};
