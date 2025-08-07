import {useSelector} from "react-redux";
import {useAppDispatch} from "../../app/configureStore";
import ContextAlert from "../../components/ContextAlert";
import {dismissAlert, selectAllAlerts, type StyledErrorAlert} from "@chumsinc/alert-list";


export type ContextFilterFunction = (alerts:StyledErrorAlert) => boolean;
export type ContextFilter = string|ContextFilterFunction;

function isFilterFunction(fn:ContextFilter): fn is ContextFilterFunction {
    return typeof fn === "function";
}

export interface AlertListProps {
    contextFilter?: ContextFilter;
}
const AlertList = ({contextFilter}:AlertListProps) => {
    const dispatch = useAppDispatch();
    const list = useSelector(selectAllAlerts);

    const dismissHandler = (id: number) => {
        dispatch(dismissAlert({id}));
    }

    return (
        <div>
            {list
                .filter(errorAlert => !contextFilter || (isFilterFunction(contextFilter) ? contextFilter(errorAlert) : errorAlert.context === contextFilter))
                .map(alert => (
                <ContextAlert key={alert.id} color={alert.variant} dismissible onClose={() => dismissHandler(alert.id)}
                              context={alert.context} count={alert.count}>
                    {alert.message}
                </ContextAlert>
            ))}
        </div>
    )
}
export default AlertList;
