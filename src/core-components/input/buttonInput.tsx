import React, { FunctionComponent, ReactElement } from 'react';

interface ButtonInputProps {
    className: string
    name: string;
    value: string;
}

const ButtonInput: FunctionComponent<ButtonInputProps> = ({ name, value, className }): ReactElement => (
    <div className='form-group col-12 mt-5'>
        <input type='button' id={`${name}input`} name={name} className={className} value={value} />
    </div>
);

export default ButtonInput;
