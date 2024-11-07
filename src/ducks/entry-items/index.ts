import {PhysInvImportItem} from "../../types";
import {SortProps} from "chums-types";
import {createReducer} from "@reduxjs/toolkit";
import {setImportResponse, setImportSort} from "./actions";
import {itemSorter} from "./utils";
import {setFilename, uploadFile} from "../app/actions";

export interface EntryItemsState {
    list: PhysInvImportItem[];
    textLines: string[]
    hasErrors: boolean;
    isTested: boolean,
    sort: SortProps<PhysInvImportItem>;
    filter: string;
}

const initialState: EntryItemsState = {
    list: [],
    textLines: [],
    hasErrors: false,
    isTested: false,
    sort: {field: 'line', ascending: true},
    filter: '',
}

const entryItemsReducer = createReducer(initialState, builder => {
    builder
        .addCase(setImportSort, (state, action) => {
            state.sort = action.payload;
        })
        .addCase(setImportResponse, (state, action) => {
            state.list = action.payload.items.sort(itemSorter({field: 'line', ascending: true}));
            state.textLines = action.payload.lines;
            state.hasErrors = action.payload.hasErrors;
            state.isTested = !state.hasErrors;
        })
        .addCase(setFilename, (state) => {
            state.isTested = false;
            state.list = [];
            state.textLines = []
            state.hasErrors = false;
        })
        .addCase(uploadFile.pending, (state, action) => {
            state.list = [];
            state.textLines = []
            state.hasErrors = false;
            if (!action.meta.arg.exec) {
                state.isTested = false;
            }
        })
});

export default entryItemsReducer;
