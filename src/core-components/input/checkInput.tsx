import React, { FunctionComponent, ReactElement, useState } from 'react';

interface CheckInputProps {
    label: string;
    name: string;
    parentCallback: Function;
}

const CheckInput: FunctionComponent<CheckInputProps> = ({ label, name, parentCallback }): ReactElement => {
    const [input, setInput] = useState<boolean>(false);

    const handleChange = event => {
        setInput(event.target.checked);
        parentCallback(name, event.target.checked);
    };

    return (
        <div className='form-group col-12 mt-4'>
            <input type='checkbox' className='form-check' id={`${name}input`} name={name} checked={input} onChange={handleChange} />
            <label htmlFor={`${name}input`} style={{ marginLeft: '8px' }}>
                {label}
            </label>
        </div>
    );
};

export default CheckInput;
