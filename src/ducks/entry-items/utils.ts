import {SortProps} from "chums-types";
import {ErrorResponse, ImportResponse, PhysInvImportItem} from "../../types";


export const itemSorter = (sort:SortProps<PhysInvImportItem>) => (a:PhysInvImportItem, b:PhysInvImportItem) => {
    const sortMod = sort.ascending ? 1 : -1;
    switch (sort.field) {
        case 'itemCode':
        case 'unitOfMeasure':
            return (a[sort.field].toLowerCase() === b[sort.field].toLowerCase()
                    ? (a.line - b.line)
                    : (a[sort.field].toLowerCase() > b[sort.field].toLowerCase() ? 1 : -1)
            ) * sortMod;
        case 'line':
        default:
            return (a.line - b.line) * sortMod;
    }
}

export const isImportResponse = (response:ImportResponse|ErrorResponse|unknown):response is ImportResponse => {
    return Array.isArray((response as ImportResponse)?.items)
        && (response as ImportResponse)?.hasErrors !== undefined
}

export const isErrorResponse = (response:ImportResponse|ErrorResponse|unknown):response is ErrorResponse => {
    return (response as ErrorResponse).error !== undefined
}

