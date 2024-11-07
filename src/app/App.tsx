import React from 'react';
import "./App.css";
import AlertList from "../ducks/alerts/AlertList";
import UploadForm from "../components/UploadForm";
import Container from "react-bootstrap/Container";
import ImportStatus from "../components/ImportStatus";
import ErrorMessage from "../components/ErrorMessage";
import ImportResponseTable from "../components/ImportResponseTable";
import ImportFileSpecs from "./ImportFileSpecs";
import {ErrorBoundary} from "react-error-boundary";
import Alert from "react-bootstrap/Alert";

function App() {

    return (
        <Container>
            <ErrorBoundary fallback={<Alert color="danger">Something went wrong!</Alert>} >
                <AlertList/>
                <UploadForm/>
                <ImportStatus/>
                <ErrorMessage/>
                <ImportResponseTable/>
                <ImportFileSpecs/>
            </ErrorBoundary>
        </Container>
    );
}

export default App;

