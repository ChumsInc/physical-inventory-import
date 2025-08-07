import {useAppSelector} from "../app/configureStore";
import {selectImportError} from "../ducks/app/selectors";
import Alert from "react-bootstrap/Alert";

export default function ErrorMessage() {
    const error = useAppSelector(selectImportError);

    if (!error) {
        return null;
    }

    return (
        <Alert variant="danger" >
            <Alert.Heading>{error.name}</Alert.Heading>
            <div>{error.message}</div>
        </Alert>
    )
}
