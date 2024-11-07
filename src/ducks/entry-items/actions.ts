import {createAction} from "@reduxjs/toolkit";
import {SortProps} from "chums-types";
import {ImportResponse, PhysInvImportItem} from "../../types";

export const setImportSort = createAction<SortProps<PhysInvImportItem>>("entry-items/setSort");
export const setImportResponse = createAction<ImportResponse>('entry-items/setData');
