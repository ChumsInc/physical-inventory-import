import {createAsyncThunk} from "@reduxjs/toolkit";
import {fetchCountInstances} from "./api";
import {selectCountInstanceStatus} from "./selectors";
import {CountInstance} from "../../types";
import {RootState} from "../../app/configureStore";

export const loadCountInstances = createAsyncThunk<CountInstance[], void, {state:RootState}>(
    'count-instance/load',
    async () => fetchCountInstances(),
    {
        condition: (arg, {getState}) => {
            const state = getState();
            return selectCountInstanceStatus(state) === 'idle'
        }
    }
)
