import Message from '../notification/message';
import React, { FunctionComponent, ReactElement, useEffect, useState } from 'react';

interface TextInputProps {
    label: string;
    name: string;
    RegExp?: RegExp|undefined;
    parentCallback: Function;
    required: boolean;
}

const TextInput: FunctionComponent<TextInputProps> = ({ label, name, RegExp, parentCallback, required }): ReactElement => {
    const [inputvalue, setInputValue] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const [message, setMessage] = useState<string>('');
    const [requiredInput, setRequiredInput] = useState<boolean>(false);
    const pattern: RegExp|undefined = RegExp;

    const handleChange = (event) => {
        if(pattern){
            if (pattern.test(event.target.value) && event.target.value !== '' && event.target.required === true) {
                setError(false);
                parentCallback(name, event.target.value, '');
            } else {
                setError(true);
            }
        }
        setInputValue(event.target.value);
    };

    const handleBlur = (event) => {
        if (event.target.value === '' && event.target.required === true){
            setRequiredInput(true);
            parentCallback(name, event.target.value, 'empty');
        }
        else{
            setRequiredInput(false);
            parentCallback(name, event.target.value, '');
        }
    };

    useEffect(() => {
        setTimeout(() => {
            setMessage(error ? 'Es liegt ein Fehler vor!' : requiredInput ? 'Dieses Feld ist erforderlich!' : '');
        }, 500);
    });

    return (
        <div className='form-group col-6'>
            <label htmlFor={`${name}input`}>{label}</label>
            <input type='text' className='form-control' id={`${name}input`} name={name} value={inputvalue} onChange={handleChange} onBlur={handleBlur} required={required} />
            <Message name={`error_${name}`} error={message} />
        </div>
    );
};

export default TextInput;
