import React, {type ChangeEvent, useId} from 'react';
import InputGroup from "react-bootstrap/InputGroup";
import {useAppDispatch, useAppSelector} from "../app/configureStore";
import {selectLocation} from "../ducks/app/selectors";
import {setLocation} from "../ducks/app/actions";
import FormControl, {type FormControlProps} from "react-bootstrap/FormControl";

export default React.forwardRef<HTMLInputElement, FormControlProps>(
    function LocationInput(props, ref) {
        const dispatch = useAppDispatch();
        const value = useAppSelector(selectLocation);
        const _id = useId();
        const id = props.id ?? _id;

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
