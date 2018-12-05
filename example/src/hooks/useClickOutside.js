
import { useRef, useEffect } from 'react';

export const useClickOutside = (handler) => {
    
    let elementRef = useRef();

    useEffect(() => {
        if(handler) {
            const documentClickHandler = e => {

                let targetElement = e.target;

                do {
                    if(targetElement === elementRef.current) {
                        return;
                    }
                    targetElement = targetElement.parentNode;
                } while (targetElement);

                handler();
            };

            document.addEventListener('click', documentClickHandler);

            return () => {
                document.removeEventListener('click', documentClickHandler);
            };
        }
    }, [handler ? handler.toString() : null]);

    return elementRef;
};