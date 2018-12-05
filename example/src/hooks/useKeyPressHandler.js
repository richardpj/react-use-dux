
import { useCallback } from 'react';

export const useKeypressHandler = (optionsFn) => {
    const options = optionsFn();
    return useCallback(e => {
        if(options.hasOwnProperty(e.key)) {
            options[e.key](e);
        }
    }, [optionsFn.toString()]);
}