import {RootState} from "../../app/configureStore";

export const selectCountInstances = (state:RootState) => state.countInstance.list;
export const selectCountInstanceStatus = (state:RootState) => state.countInstance.status;
