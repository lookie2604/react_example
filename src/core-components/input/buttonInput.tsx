import React, { FunctionComponent, ReactElement } from 'react';

interface SubmitInputProps {
    className: string
    name: string;
    value: string;
}

const SubmitInput: FunctionComponent<SubmitInputProps> = ({ name, value, className }): ReactElement => (
    <div className='form-group col-12 mt-5'>
        <input type='button' id={`${name}input`} name={name} className={className} value={value} />
    </div>
);

export default SubmitInput;
