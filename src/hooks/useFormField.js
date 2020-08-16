import { useState } from 'react';

export default (initialVal) => {
    const [val, setVal] = useState(initialVal);

    const setFieldValue = (event) => {
        debugger;
        setVal(event.target.value);
    };

    const reset = () => {
        setVal(initialVal);
    };

    return [val, setFieldValue, reset];
}