import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import {sampleCSV} from "@/app/sampleCSV.ts";
import {sampleTSV} from "@/app/sampleTSV.ts";



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
