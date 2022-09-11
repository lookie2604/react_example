import React, { FunctionComponent, ReactElement } from 'react';

interface SubmitInputProps {
    name: string;
    value: string;
}

const SubmitInput: FunctionComponent<SubmitInputProps> = ({ name, value }): ReactElement => (
    <div className='form-group col-12 mt-5'>
        <input type='submit' id={`${name}input`} name={name} className='btn btn-primary' value={value} />
    </div>
);

export default SubmitInput;
