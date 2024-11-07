import React, {FormEvent, useRef} from 'react';
import {useAppDispatch, useAppSelector} from "../app/configureStore";
import {selectStatus} from "../ducks/app/selectors";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CountInstanceSelect from "./CountInstanceSelect";
import {Button} from "react-bootstrap";
import WarehouseInput from "./WarehouseInput";
import SheetInput from "./SheetInput";
import LocationInput from "./LocationInput";
import FormControl from "react-bootstrap/FormControl";
import Form from 'react-bootstrap/Form'
import {setFilename, uploadFile} from "../ducks/app/actions";
import {selectCanImport} from "../ducks/entry-items/selectors";

export default function UploadForm() {
    const dispatch = useAppDispatch();
    const status = useAppSelector(selectStatus);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const canImport = useAppSelector(selectCanImport);

    const submitHandler = (ev: FormEvent) => {
        ev.preventDefault();
        if (!fileInputRef.current) {
            return;
        }
        const file = fileInputRef.current.files?.[0];
        if (!file) {
            return;
        }
        dispatch(uploadFile({file, exec: false}))
    }

    const uploadHandler = () => {
        if (!fileInputRef.current) {
            return;
        }
        const file = fileInputRef.current.files?.[0];
        if (!file) {
            return;
        }
        dispatch(uploadFile({file, exec: true}))
    }

    const fileChangeHandler = () => {
        if (!fileInputRef.current) {
            return;
        }
        const file = fileInputRef.current.files?.[0];
        dispatch(setFilename(file?.name ?? ''))
    }

    return (
        <Form onSubmit={submitHandler} className="mb-3">
            <Row className="g-3 mb-3">
                <Col xs="auto">
                    <CountInstanceSelect/>
                </Col>
                <Col xs="auto">
                    <WarehouseInput/>
                </Col>
                <Col xs="auto">
                    <SheetInput/>
                </Col>
                <Col>
                    <LocationInput/>
                </Col>
            </Row>
            <Row className="g-3">
                <Col>
                    <FormControl size="sm" type="file" ref={fileInputRef} required onChange={fileChangeHandler}
                                 accept=".csv,application/csv,.txt,application/tsv"/>
                </Col>
                <Col xs="auto">
                    <Button type="submit" size="sm" variant="secondary" disabled={status !== 'idle'}>
                        Test File Import
                    </Button>
                </Col>
                <Col xs="auto">
                    <Button type="button" variant="primary" size="sm"
                            onClick={uploadHandler}
                            disabled={!canImport || status !== 'idle'}>
                        Import Items
                    </Button>
                </Col>
            </Row>
        </Form>
    )
}
