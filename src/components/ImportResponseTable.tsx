import {useState} from 'react';
import ImportItemsTable from "./ImportItemsTable";
import ImportTextLinesTable from "./ImportTextLinesTable";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";


export default function ImportResponseTable() {
    const [view, setView] = useState<'raw' | 'imported' | string>('imported')
    return (
        <div className="mt-3">
            <Tabs onSelect={(k) => setView(k ?? 'imported')} activeKey={view} className="mb-3">
                <Tab eventKey="imported" title="Imported Items">Imported Items</Tab>
                <Tab eventKey="raw" title="Text Lines">Text Lines</Tab>
            </Tabs>
            {view === 'imported' && <ImportItemsTable/>}
            {view === 'raw' && <ImportTextLinesTable/>}
        </div>
    )
}
