import React, {useEffect, useState} from 'react';
import {SortableTable, SortableTableField, TablePagination} from "chums-components";
import {PhysInvImportItem} from "../types";
import {useAppDispatch, useAppSelector} from "../app/configureStore";
import {selectFilteredEntryItems, selectEntrySort} from "../ducks/entry-items/selectors";
import {SortProps} from "chums-types";
import {setImportSort} from "../ducks/entry-items/actions";
import ItemStatusIcons from "./ItemStatusIcons";
import ImportItemErrors from "./ImportItemErrors";


const fields: SortableTableField<PhysInvImportItem>[] = [
    {field: 'entryId', title: 'ID', sortable: true, className: 'text-end', render: (row) => row.entryId || '-'},
    {field: 'sheet', title: 'Sheet', sortable: true, className: 'text-end', render: (row) => row.sheet || '-'},
    {field: 'line', title: 'Line', sortable: true, className: 'text-end'},
    {field: 'warehouseCode', title: 'Whse', sortable: true, className: 'text-start'},
    {field: 'itemCode', title: 'Item', sortable: true, className: 'text-start'},
    {field: 'item', title: 'Description', className: 'text-start', render: (row) => row.item?.itemCodeDesc ?? 'N/A'},
    {field: 'quantity', title: 'Qty', sortable: true, className: 'text-end'},
    {field: 'unitOfMeasure', title: 'U/M', sortable: true, className: 'text-center'},
    {field: 'item', title: 'Status', render: (row) => <ItemStatusIcons item={row.item ?? null} />},
    {field: 'error', title: 'Errors', render: (row) => <ImportItemErrors errors={row.error} />},
];

export default function ImportItemsTable() {
    const dispatch = useAppDispatch();
    const data = useAppSelector(selectFilteredEntryItems);
    const sort = useAppSelector(selectEntrySort);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);

    useEffect(() => {
        setPage(0);
    }, [data, rowsPerPage]);

    const sortChangeHandler = (sort: SortProps<PhysInvImportItem>) => {
        dispatch(setImportSort(sort))
    }

    return (
        <div>
            <SortableTable fields={fields} onChangeSort={sortChangeHandler} currentSort={sort} keyField="line"
                           data={data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}/>
            <TablePagination page={page} onChangePage={setPage}
                             rowsPerPage={rowsPerPage} onChangeRowsPerPage={setRowsPerPage}
                             count={data.length}/>
        </div>
    )
}
