import {createAction, createAsyncThunk, SerializedError} from "@reduxjs/toolkit";
import {ImportMessage, UploadFileProps} from "../../types";
import {AppDispatch, RootState} from "../../app/configureStore";
import {
    selectCountInstance,
    selectCountSheet,
    selectLocation,
    selectStatus,
    selectUploadParams,
    selectWarehouseCode
} from "./selectors";
import {uploadHandler} from "./api";


export const setCountInstance = createAction<number>('app/setCountInstance');
export const setWarehouseCode = createAction<string>('app/setWarehouseCode');
export const setSheet = createAction<number>('app/setSheet');
export const setLocation = createAction<string>('app/setLocation');
export const setFilename = createAction<string>('app/setFilename');
export const initFile = createAction<string>('app/init');
export const setFileProgress = createAction<number>('app/setFileProgress');
export const setImportMessage = createAction<ImportMessage>('app/setImportMessage');

export const setUploadError = createAction<SerializedError | null>('app/setUploadError');

export const uploadFile = createAsyncThunk<string, UploadFileProps, { state: RootState }>(
    'app/uploadFile',
    async (arg, {getState, dispatch}) => {
        const state = getState();
        await uploadHandler(arg.file, {...selectUploadParams(state), exec: arg.exec}, dispatch as AppDispatch);
        return arg.file.name;
    },
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return selectStatus(state) === 'idle'
                && selectCountInstance(state) !== 0
                && selectWarehouseCode(state).trim() !== ''
                && selectCountSheet(state) !== 0
                && selectLocation(state).trim() !== ''
                ;
        }
    }
)
