import {type ChangeEvent, useId} from "react";
import {useAppDispatch, useAppSelector} from "@/app/configureStore.ts";
import {selectIsWIP} from "@/ducks/app/selectors.ts";
import {setWIP} from "@/ducks/app/actions.ts";
import {FormCheck} from "react-bootstrap";

export default function WipCheckbox() {
    const dispatch = useAppDispatch();
    const isWip = useAppSelector(selectIsWIP)
    const id = useId();

    const changeHandler = (ev: ChangeEvent<HTMLInputElement>) => {
        dispatch(setWIP(ev.target.checked));
    }

    return (
        <FormCheck type="checkbox" id={id} label="WIP Product" checked={isWip} onChange={changeHandler}/>
    )
}
