import React, {type ChangeEvent, useId} from 'react';
import InputGroup from "react-bootstrap/InputGroup";
import {useAppDispatch, useAppSelector} from "../app/configureStore";
import {selectWarehouseCode} from "../ducks/app/selectors";
import {setWarehouseCode} from "../ducks/app/actions";
import FormControl, {type FormControlProps} from "react-bootstrap/FormControl";

export default React.forwardRef<HTMLInputElement, FormControlProps>(
    function WarehouseInput(props, ref) {
        const dispatch = useAppDispatch();
        const value = useAppSelector(selectWarehouseCode);
        const _id = useId();
        const id = props.id ?? _id;

        const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
            dispatch(setWarehouseCode(ev.target.value));
        }
        return (
            <InputGroup size="sm">
                <InputGroup.Text as="label" htmlFor={id}>
                    Warehouse
                </InputGroup.Text>
                <FormControl {...props} id={id}
                             type="text" minLength={3} maxLength={3}
                             value={value || ''} onChange={changeHandler}
                             required ref={ref}/>
            </InputGroup>
        )
    });
