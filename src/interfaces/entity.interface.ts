export interface Entity {
    id: string;
    timestamp: number;
    diff: [{ field: string, oldValue: string, newValue: string }];
}
