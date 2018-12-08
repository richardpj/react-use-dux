
import { useMemo } from 'react';

export const useKeypressHandler = (options, memoArray = []) => {
    
    return useMemo(() => {
        return e => {
            if(options.hasOwnProperty(e.key)) {
                options[e.key](e);
            }
        };
    }, memoArray);
}