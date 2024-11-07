import {CountInstance} from "../../types";
import {fetchJSON} from "chums-components";

export async function fetchCountInstances(): Promise<CountInstance[]> {
    try {
        const url = '/api/operations/production/inventory/process/instances';
        const response = await fetchJSON<{instances:CountInstance[]}>(url, {cache: 'no-cache'});
        return response?.instances ?? [];
    } catch(err:unknown) {
        if (err instanceof Error) {
            console.debug("fetchCountInstances()", err.message);
            return Promise.reject(err);
        }
        console.debug("fetchCountInstances()", err);
        return Promise.reject(new Error('Error in fetchCountInstances()'));
    }
}
