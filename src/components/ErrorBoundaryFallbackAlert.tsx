import type {FallbackProps} from "react-error-boundary";
import Alert from "react-bootstrap/Alert";

export default function ErrorBoundaryFallbackAlert({error, resetErrorBoundary}: FallbackProps) {
    return (
        <Alert color="danger" dismissible onClose={resetErrorBoundary}>
            <strong>Something went wrong!</strong>
            <div className="text-light">
                {error instanceof Error && <div>{error.name}</div>}
                {error instanceof Error && <div>{error.message}</div>}
                {error instanceof Error && <code><pre>{error.stack}</pre></code>}
                {!(error instanceof Error) && <div>An unknown error occurred.</div>}
            </div>
        </Alert>
    )
}
