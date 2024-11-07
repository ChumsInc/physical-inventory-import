import React from 'react';
import "./App.css";
import AlertList from "../ducks/alerts/AlertList";
import UploadForm from "../components/UploadForm";
import Container from "react-bootstrap/Container";
import ImportStatus from "../components/ImportStatus";
import ErrorMessage from "../components/ErrorMessage";
import ImportResponseTable from "../components/ImportResponseTable";
import ImportFileSpecs from "./ImportFileSpecs";

function App() {

    return (
        <Container>
            <AlertList/>
            <UploadForm/>
            <ImportStatus/>
            <ErrorMessage/>
            <ImportResponseTable/>
            <ImportFileSpecs/>
        </Container>
    );
}

export default App;

