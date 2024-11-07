import React, {ChangeEvent, useId} from 'react';
import InputGroup from "react-bootstrap/InputGroup";
import {useAppDispatch, useAppSelector} from "../app/configureStore";
import {selectLocation, selectWarehouseCode} from "../ducks/app/selectors";
import {setLocation, setWarehouseCode} from "../ducks/app/actions";
import FormControl, {FormControlProps} from "react-bootstrap/FormControl";

export default React.forwardRef<HTMLInputElement, FormControlProps>(
    function LocationInput(props, ref) {
        const dispatch = useAppDispatch();
        const value = useAppSelector(selectLocation);
        const id = props.id ?? useId();

        const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
            dispatch(setLocation(ev.target.value));
        }
        return (
            <InputGroup size="sm">
                <InputGroup.Text as="label" htmlFor={id}>
                    Location
                </InputGroup.Text>
                <FormControl {...props} id={id}
                             type="text"
                             value={value} onChange={changeHandler}
                             required ref={ref}/>
            </InputGroup>
        )
    });
