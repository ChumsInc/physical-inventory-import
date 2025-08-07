import type {RootState} from "../../app/configureStore";

export const selectFilename = (state:RootState) => state.app.filename;
export const selectProgress = (state:RootState) => state.app.progress;
export const selectStatus = (state:RootState) => state.app.status;
export const selectImportMessage = (state:RootState) => state.app.importMessage;
export const selectUploadParams = (state:RootState) => state.app.uploadParams;
export const selectCountInstance = (state:RootState) => state.app.uploadParams.countInstance;
export const selectWarehouseCode = (state:RootState) => state.app.uploadParams.warehouseCode;
export const selectCountSheet = (state:RootState) => state.app.uploadParams.sheet;
export const selectLocation = (state:RootState) => state.app.uploadParams.location;
export const selectImportError = (state:RootState) => state.app.error;

