import type {FileStatus, ImportMessage, UploadParams} from "../../types";
import {createReducer, type SerializedError} from "@reduxjs/toolkit";
import {
    initFile,
    setCountInstance, setFilename,
    setFileProgress,
    setImportMessage,
    setLocation,
    setSheet,
    setUploadError,
    setWarehouseCode, setWIP,
    uploadFile
} from "./actions";
import {setImportResponse} from "../entry-items/actions";

export interface AppState {
    uploadParams: UploadParams;
    filename: string;

    progress: number;
    status: FileStatus;
    importMessage: ImportMessage | null;
    error: SerializedError | null;
}

const initialState: AppState = {
    uploadParams: {
        countInstance: 0,
        warehouseCode: '',
        sheet: 0,
        location: '',
        wip: false,
    },
    filename: '',
    progress: 0,
    status: 'idle',
    importMessage: null,
    error: null,
}

const appReducer = createReducer(initialState, builder => {
    builder
        .addCase(setCountInstance, (state, action) => {
            state.uploadParams.countInstance = action.payload;
            state.uploadParams.wip = false;
        })
        .addCase(setWarehouseCode, (state, action) => {
            state.uploadParams.warehouseCode = action.payload;
            state.uploadParams.wip = false;
        })
        .addCase(setSheet, (state, action) => {
            state.uploadParams.sheet = action.payload;
            state.uploadParams.wip = false;
        })
        .addCase(setLocation, (state, action) => {
            state.uploadParams.location = action.payload;
        })
        .addCase(setWIP, (state, action) => {
            state.uploadParams.wip = action.payload;
        })
        .addCase(initFile, (state, action) => {
            state.filename = action.payload;
        })
        .addCase(setFileProgress, (state, action) => {
            state.progress = action.payload;
            state.status = 'uploading';
        })
        .addCase(setFilename, (state, action) => {
            state.filename = action.payload;
        })
        .addCase(setImportMessage, (state, action) => {
            state.importMessage = action.payload;
            switch (action.payload.eventName) {
                case 'abort':
                case 'error':
                case 'timeout':
                    state.status = 'error'
                    return;
                case 'load':
                case 'loadstart':
                    state.status = 'uploading';
                    return;
                case 'loadend':
                    state.status = 'idle';
                    return;
            }
        })
        .addCase(setUploadError, (state, action) => {
            state.error = action.payload;
            state.status = 'idle'
        })
        .addCase(uploadFile.pending, (state) => {
            state.status = 'pending';
            state.progress = 0;
            state.error = null;
        })
        .addCase(setImportResponse, (state) => {
            state.progress = 0;
            state.status = 'idle';
        })

})

export default appReducer
