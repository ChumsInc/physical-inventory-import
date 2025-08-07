import {useAppSelector} from "../app/configureStore";
import {selectImportMessage, selectProgress} from "../ducks/app/selectors";
import Stack from "react-bootstrap/Stack";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {ProgressBar} from "react-bootstrap";

export default function ImportStatus() {
    const progress = useAppSelector(selectProgress);
    const importMessage = useAppSelector(selectImportMessage);

    return (
        <Stack direction="vertical" gap={1}>
            <ProgressBar now={progress * 100}/>
            <Row>
                <Col xs={6} md={4}>{importMessage?.eventName}</Col>
                <Col xs={6} md={8}>{importMessage?.message}</Col>
            </Row>
        </Stack>
    )
}
