import type {AppDispatch} from "../../app/configureStore";
import {initFile, setFileProgress, setImportMessage, setUploadError} from "./actions";
import type {UploadParams} from "../../types";
import {serializeError} from "serialize-error";
import {setImportResponse} from "../entry-items/actions";
import {isErrorResponse, isImportResponse} from "../entry-items/utils";


export async function uploadHandler(file: File, arg: UploadParams, dispatch: AppDispatch): Promise<void> {
    const xhr = new XMLHttpRequest();
    try {
        const params = new URLSearchParams({location: arg.location.trim()});
        if (arg.wip) {
            params.set('wip', '1');
        }
        if (!arg.exec) {
            params.set('test', '1')
        }
        const url = `/api/operations/production/inventory/instances/:countInstance/entries/:warehouseCode/:sheet/import.json?:params`
            .replace(':countInstance', encodeURIComponent(arg.countInstance))
            .replace(':warehouseCode', encodeURIComponent(arg.warehouseCode.trim()))
            .replace(':sheet', encodeURIComponent(arg.sheet))
            .replace(':params', params.toString());



        xhr.responseType = 'json';
        xhr.upload.addEventListener('progress', ev => {
            // console.log('sendFile() progress', ev);
            dispatch(setFileProgress((ev.loaded / ev.total) * 100));
        });

        xhr.upload.addEventListener('loadstart', (ev) => {
            dispatch(initFile(file.name));
            dispatch(setImportMessage({
                eventName: 'loadstart',
                message: JSON.stringify(ev, undefined, 2),
            }))
        });

        xhr.upload.addEventListener('abort', (ev: ProgressEvent<XMLHttpRequestEventTarget>) => {
            dispatch(setImportMessage({
                eventName: 'abort',
                message: JSON.stringify(ev, undefined, 2),
            }))
        });

        xhr.upload.addEventListener('error', () => {
            const response = xhr.response ?? null;
            const error = new Error(`Error: ${xhr.status}; ${isErrorResponse(response) ? response.error : JSON.stringify(response)}`);
            dispatch(setUploadError(serializeError(error)))
        });

        xhr.upload.addEventListener('timeout', (ev) => {
            dispatch(setImportMessage({
                eventName: 'timeout',
                message: JSON.stringify(ev, undefined, 2),
            }))
        });

        xhr.upload.addEventListener('load', (ev) => {
            dispatch(setImportMessage({
                eventName: 'load',
                message: JSON.stringify(ev, undefined, 2),
            }))
        });

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                try {
                    const response = xhr.response ?? null;
                    if (isErrorResponse(response)) {
                        dispatch(setUploadError(serializeError(new Error(response.error))));
                        return;
                    }
                    if (isImportResponse(response)) {
                        dispatch(setImportResponse(response));
                        return;
                    }
                    console.log(response);
                    dispatch(setUploadError(serializeError(new Error('Unknown error, check console log'))));
                } catch (err: unknown) {
                    if (err instanceof Error) {
                        console.debug("onreadystatechange()", err.message);
                        dispatch(setUploadError(err));
                        return Promise.reject(err);
                    }
                    console.debug("onreadystatechange()", err);
                    return Promise.reject(new Error('Error in onreadystatechange()'));
                }
            }
            if (xhr.status >= 400) {
                const response = xhr.response ?? null;
                const error = new Error(`Error: ${xhr.status}; ${isErrorResponse(response) ? response.error : JSON.stringify(response)}`);
                dispatch(setUploadError(serializeError(error)))
            }
        };

        const formData = new FormData();
        formData.append(file.name, file, file.name);
        xhr.open('POST', url, true);
        xhr.send(formData);
    } catch (err: unknown) {
        if (err instanceof Error) {
            console.debug("uploadHandler()", err.message);
            const response = xhr.response ?? null;
            const error = new Error(`Error: ${xhr.status}; ${isErrorResponse(response) ? response.error : JSON.stringify(response)}`);
            dispatch(setUploadError(serializeError(error)))
            return Promise.reject(err);
        }
        console.debug("uploadHandler()", err);
        const response = xhr.response ?? null;
        const error = new Error(`Error: ${xhr.status}; ${isErrorResponse(response) ? response.error : JSON.stringify(response)}`);
        dispatch(setUploadError(serializeError(error)))
        return Promise.reject(new Error('Error in uploadHandler()'));
    }
}
