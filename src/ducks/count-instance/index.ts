import type {CountInstance} from "../../types";
import {createReducer} from "@reduxjs/toolkit";
import {loadCountInstances} from "./actions";

export interface CountInstanceState {
    list: CountInstance[];
    status: 'idle' | 'loading'
}

export const initialState: CountInstanceState = {
    list: [],
    status: 'idle',
}

const countInstanceReducer = createReducer<CountInstanceState>(initialState, builder => {
    builder
        .addCase(loadCountInstances.pending, (state) => {
            state.status = 'loading'
        })
        .addCase(loadCountInstances.fulfilled, (state, action) => {
            state.status = 'idle';
            state.list = action.payload
                .filter(inst => !inst.locked)
                .sort((a, b) => a.id - b.id)
        })
        .addCase(loadCountInstances.rejected, (state) => {
            state.status = 'idle'
        })
});

export default countInstanceReducer
