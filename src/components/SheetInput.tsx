import React, {type ChangeEvent, useId} from 'react';
import InputGroup from "react-bootstrap/InputGroup";
import {useAppDispatch, useAppSelector} from "../app/configureStore";
import {selectCountSheet} from "../ducks/app/selectors";
import {setSheet} from "../ducks/app/actions";
import FormControl, {type FormControlProps} from "react-bootstrap/FormControl";

export default React.forwardRef<HTMLInputElement, FormControlProps>(function SheetInput(props, ref) {
    const dispatch = useAppDispatch();
    const value = useAppSelector(selectCountSheet);
    const _id = useId();
    const id = props.id ?? _id;

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(setSheet(ev.target.valueAsNumber));
    }
    return (
        <InputGroup size="sm">
            <InputGroup.Text as="label" htmlFor={id}>
                Sheet
            </InputGroup.Text>
            <FormControl size="sm" {...props} id={id} type="number" min={1} step={1}
                         value={value || ''} onChange={changeHandler}
                         required ref={ref}/>
        </InputGroup>
    )
})
