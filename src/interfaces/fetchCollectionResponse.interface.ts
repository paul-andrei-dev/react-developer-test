export type FetchCollectionResponse = FetchCollectionSuccessResponse | FetchCollectionErrorResponse;

export interface FetchCollectionSuccessResponse {
    code: number,
    data: any[],
    limit: number,
    offset: number,
    total: number,
}

export interface FetchCollectionErrorResponse {
    code: number,
    error: string,
}

export type FetchCollectionFunction = () => Promise<FetchCollectionResponse>;
