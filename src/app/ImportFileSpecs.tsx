import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import React from "react";

export const sampleCSV:string[] = [
    '1VELC1.0F,859.248000,YD',
    '1YARN608,63.249000,LB',
    'RHOOK26,6072.000000,EA',
    '1TG12207,5437.000000,EA',
    '1BCLANY,45276.000000,EA',
    '1YARN103,179.426000,LB',
    '1ET0972000 NFL,20629.000000,EA',
    '1ROPE4433MM,1359.138000,YD',
    'PVC12432101,1223.000000,EA',
    '1U12309116,0.000000,EA',
]

export const sampleTSV:string[] = [
    'CH031122G00404	0.000000	EA',
    'N.1020 B1	0.000000	EA',
    '12120716	0.000000	EA',
    '121351020	1866.000000	EA',
    'CH090636730805	0.000000	EA',
    'H.4.5MMCORD-06	0.000000	YD',
    '11090150	0.000000	EA',
    'CH040651750804	0.000000	EA',
    '12115504IMP	658.000000	EA',
    '12099	0.000000	EA',
]

export default function ImportFileSpecs() {
    return (
        <Card className="mt-5">
            <Card.Header as="h2">Import File Specs</Card.Header>
            <Card.Body>
                <Table>
                    <thead>
                    <tr>
                        <th>Order</th>
                        <th>Field</th>
                        <th>Description</th>
                        <th>Valid Example</th>
                        <th>Invalid Example</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>ItemCode</td>
                        <td className="text-secondary">A valid item code, for the warehouse selected.</td>
                        <td><code className="text-success">12115100</code></td>
                        <td><code className="text-danger">Any item not active in Sage</code></td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Quantity</td>
                        <td className="text-secondary">A numeric quantity, without any formatting.</td>
                        <td><code className="text-success">145</code></td>
                        <td><code className="text-danger">4,123</code></td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Unit of Measure</td>
                        <td className="text-secondary">A valid unit of measure for inventory entry.</td>
                        <td><code className="text-success">EA</code></td>
                        <td><code className="text-danger">37PK</code></td>
                    </tr>
                    </tbody>
                </Table>
                <Alert variant="info">
                    <Alert.Heading>Valid File Formats</Alert.Heading>
                    <div>*.txt - Elements separated by tabs, each entry on it&#39;s own line.</div>
                    <div>*.csv - Entries separated by commas, , each entry on it&#39;s own line</div>
                </Alert>
            </Card.Body>
            <Card.Body>
                <h3>Example CSV File</h3>
                <code className="text-info">
                    {sampleCSV.map((line, index) => (<div key={index} style={{whiteSpace: 'pre'}}>{line}</div>))}
                </code>
                <hr />
                <h3>Example TSV File</h3>
                <pre className="text-info">
                {sampleTSV.map((line, index) => (<div key={index} style={{whiteSpace: 'pre'}}>{line}</div>))}
                </pre>
            </Card.Body>
        </Card>

    )
}
