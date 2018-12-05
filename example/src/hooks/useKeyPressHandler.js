
import { useMemo } from 'react';

export const useKeypressHandler = (optionsFn) => {
    
    return useMemo(() => {
        const options = optionsFn();
        return e => {
            if(options.hasOwnProperty(e.key)) {
                options[e.key](e);
            }
        };
    }, [optionsFn.toString()]);
}