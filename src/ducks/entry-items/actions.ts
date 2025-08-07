import {createAction} from "@reduxjs/toolkit";
import type {SortProps} from "chums-types";
import type {ImportResponse, PhysInvImportItem} from "../../types";

export const setImportSort = createAction<SortProps<PhysInvImportItem>>("entry-items/setSort");
export const setImportResponse = createAction<ImportResponse>('entry-items/setData');
