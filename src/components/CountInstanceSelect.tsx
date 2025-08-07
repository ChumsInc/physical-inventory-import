import React, {type ChangeEvent, useEffect, useId} from "react";
import {useAppDispatch, useAppSelector} from "../app/configureStore";
import {selectCountInstances, selectCountInstanceStatus} from "../ducks/count-instance/selectors";
import InputGroup from "react-bootstrap/InputGroup";
import FormSelect, {type FormSelectProps} from "react-bootstrap/FormSelect";
import {selectCountInstance} from "../ducks/app/selectors";
import {loadCountInstances} from "../ducks/count-instance/actions";
import {setCountInstance} from "../ducks/app/actions";

export default React.forwardRef<HTMLSelectElement, FormSelectProps>(
    function CountInstanceSelect(props, ref) {
    const dispatch = useAppDispatch();
    const list = useAppSelector(selectCountInstances);
    const value = useAppSelector(selectCountInstance);
    const status = useAppSelector(selectCountInstanceStatus);
    const _id = useId();
    const id = props.id ?? _id;

    useEffect(() => {
        dispatch(loadCountInstances());
    }, [dispatch])

    const changeHandler = (ev:ChangeEvent<HTMLSelectElement>) => {
        const [instance] = list.filter(instance => instance.id.toString() === ev.target.value);
        dispatch(setCountInstance(instance?.id ?? 0));
    }

    return (
        <InputGroup size="sm">
            <InputGroup.Text as="label" htmlFor={id}>
                Count Instance
            </InputGroup.Text>
            <FormSelect {...props} id={id} value={value || ''} onChange={changeHandler}
                        required disabled={status !== 'idle'} ref={ref}>
                <option value="">Select Count Instance</option>
                {list.map(option => (
                    <option key={option.id} value={option.id}>{option.label}</option>
                ))}
            </FormSelect>
        </InputGroup>
    )
})
