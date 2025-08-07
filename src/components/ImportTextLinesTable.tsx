import {useEffect, useState} from 'react';
import {useAppSelector} from "../app/configureStore";
import {selectTextLines} from "../ducks/entry-items/selectors";
import Table from "react-bootstrap/Table";
import {TablePagination} from "@chumsinc/sortable-tables";

export default function ImportTextLinesTable() {
    const lines = useAppSelector(selectTextLines);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(25);

    useEffect(() => {
        setPage(0);
    }, [lines, rowsPerPage]);
    return (
        <div>
            <Table size="sm" striped hover responsive>
                <thead>
                <tr><th>Line</th><th>Text</th></tr>
                </thead>
                <tbody>
                {lines.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((line, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td className="font-monospace text-info">
                                <pre className="mb-0">{line}</pre>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <TablePagination page={page} onChangePage={setPage}
                             rowsPerPage={rowsPerPage} rowsPerPageProps={{onChange: setRowsPerPage}}
                             count={lines.length} />
        </div>
    )
}
