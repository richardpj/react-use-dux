
import { useRef, useEffect } from 'react';

export const useClickOutside = (handler, attached = true, memoArray = []) => {
    
    let elementRef = useRef();

    useEffect(() => {
        if(attached) {
            const documentClickHandler = e => {

                let targetElement = e.target;

                do {
                    if(targetElement === elementRef.current) {
                        return;
                    }
                    targetElement = targetElement.parentNode;
                } while (targetElement);

                handler(e);
            };

            document.addEventListener('click', documentClickHandler);

            return () => {
                document.removeEventListener('click', documentClickHandler);
            };
        }
    }, [attached, ...memoArray]);

    return elementRef;
};