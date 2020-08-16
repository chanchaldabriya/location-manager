import { useState } from 'react';

export default (initialVal) => {
    const [val, setVal] = useState(initialVal);

    const setFieldValue = (event) => {
        setVal(event.target.value);
    };

    const reset = () => {
        setVal(initialVal);
    };

    return [val, setFieldValue, reset];
}