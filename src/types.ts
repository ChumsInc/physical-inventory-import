export type FileStatus = 'idle'|'pending' | 'uploading' | 'done' | 'error' | 'aborted' | 'timeout';

export interface FileProgress {
    filename: string,
    progress: number,
    status: FileStatus,
    timestamp?: number,
}

export interface PhysInvImportProps {
    countInstance: number | string;
    warehouseCode: string;
    location: string;
    sheet: number;
}

export interface PhysInvImportItem {
    entryId: number;
    sheet: number;
    line: number;
    warehouseCode: string;
    itemCode: string;
    quantity: number;
    unitOfMeasure: string;
    error?: string | null;
    item?:PhysInvImportValidation|null;
}

export interface PhysInvImportValidation {
    itemCode: string;
    itemCodeDesc: string|null;
    warehouseCode: string | null;
    productType: string;
    inactiveItem: string;
}


export interface ImportMessage {
    eventName: keyof XMLHttpRequestEventTargetEventMap;
    message: string;
}


export interface UploadParams {
    countInstance: number;
    warehouseCode: string;
    sheet: number;
    location: string;
    wip: boolean;
    exec?: boolean;
}

export interface CountInstance {
    id: number;
    label: string;
    dateStarted: string;
    dateCompleted: string|null;
    locked: number|boolean|null;
    dateCreated: string;
    dateUpdated: string;
}

export interface ImportResponse {
    items: PhysInvImportItem[];
    hasErrors: boolean;
    lines: string[];
}

export interface ErrorResponse {
    error: string;
    name?: string;
}

export interface UploadFileProps {
    exec: boolean;
    file: File;
}
