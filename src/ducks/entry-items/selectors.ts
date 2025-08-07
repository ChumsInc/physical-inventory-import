import type {RootState} from "@/app/configureStore";
import {createSelector} from "@reduxjs/toolkit";
import {itemSorter} from "./utils";

export const selectEntryItems = (state: RootState) => state.entryItems.list;
export const selectEntrySort = (state: RootState) => state.entryItems.sort;
export const selectEntryFilter = (state: RootState) => state.entryItems.filter;
export const selectHasErrors = (state:RootState) => state.entryItems.hasErrors;
export const selectIsTested = (state:RootState) => state.entryItems.isTested;

export const selectCanImport = createSelector(
    [selectHasErrors, selectIsTested],
    (hasErrors, isTested) => !hasErrors && isTested
)
export const selectFilteredEntryItems = createSelector(
    [selectEntryItems, selectEntrySort, selectEntryFilter],
    (items, sort, filter) => {
        return items
            .filter(item => item.itemCode.toLowerCase().includes(filter.toLowerCase())
                || item.error?.toLowerCase().includes(filter.toLowerCase())
            )
            .sort(itemSorter(sort))
    }
)

export const selectTextLines = (state:RootState) => state.entryItems.textLines;
