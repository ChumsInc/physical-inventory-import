import {createAsyncThunk} from "@reduxjs/toolkit";
import {fetchCountInstances} from "./api";
import {selectCountInstanceStatus} from "./selectors";
import type {CountInstance} from "../../types";
import type {RootState} from "../../app/configureStore";

export const loadCountInstances = createAsyncThunk<CountInstance[], void, {state:RootState}>(
    'count-instance/load',
    async () => fetchCountInstances(),
    {
        condition: (_, {getState}) => {
            const state = getState();
            return selectCountInstanceStatus(state) === 'idle'
        }
    }
)
