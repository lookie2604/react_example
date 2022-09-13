import Message from '../notification/message';
import React, { FunctionComponent, ReactElement, useEffect, useState } from 'react';

interface CheckInputProps {
    label: string;
    name: string;
    parentCallback: Function;
    required: boolean;
}

const CheckInput: FunctionComponent<CheckInputProps> = ({ label, name, parentCallback, required }): ReactElement => {
    const [input, setInput] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [requiredInput, setRequiredInput] = useState<boolean>(false);

    const handleChange = event => {
        if (event.target.required === true) {
            setInput(event.target.checked);
            parentCallback(name, event.target.checked);
        }
        else {
            setError(true);
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setMessage(error ? 'Es liegt ein Fehler vor!' : requiredInput ? 'Dieses Feld ist erforderlich!' : '');
        }, 500);
    });

    return (
        <div className='form-group col-12 mt-4'>
            <input type='checkbox' className='form-check' id={`${name}input`} name={name} checked={input} onChange={handleChange} required={required} />
            <label htmlFor={`${name}input`} style={{ marginLeft: '8px' }}>
                {label}
            </label>
            <Message name={`error_${name}`} error={message} />
        </div>
    );
};

export default CheckInput;
