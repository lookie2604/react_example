import Message from '../notification/message';
import React, { FunctionComponent, ReactElement, useEffect, useState } from 'react';

interface TextInputProps {
    label: string;
    name: string;
    RegExp: RegExp;
    parentCallback: Function;
}

const TextInput: FunctionComponent<TextInputProps> = ({ label, name, RegExp, parentCallback }): ReactElement => {
    const [inputvalue, setInputValue] = useState<string>(' ');
    const [error, setError] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const pattern: RegExp = RegExp;

    const handleChange = event => {
        if (pattern.test(event.target.value) && event.target.value !== '') {
            setError(false);
            parentCallback(name, event.target.value);
        } else {
            setError(true);
        }
        setInputValue(event.target.value);
    };

    useEffect(() => {
        setTimeout(() => {
            setMessage(error ? 'Es liegt ein Fehler vor!' : '');
        }, 500);
    });

    return (
        <div className='form-group col-6'>
            <label htmlFor={`${name}input`}>{label}</label>
            <input type='text' className='form-control' id={`${name}input`} name={name} value={inputvalue} onChange={handleChange} />
            <Message name={`error_${name}`} error={message} />
        </div>
    );
};

export default TextInput;
