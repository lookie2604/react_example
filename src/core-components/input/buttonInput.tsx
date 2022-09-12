import React, { FunctionComponent, MouseEventHandler, ReactElement } from 'react';

interface ButtonInputProps {
    className: string
    name: string;
    value: string;
    onClick: MouseEventHandler;
}

const ButtonInput: FunctionComponent<ButtonInputProps> = ({ name, value, className, onClick }): ReactElement => (
    <div className='form-group col-12 mt-5'>
        <input type='button' id={`${name}input`} name={name} className={className} value={value} onClick={onClick} />
    </div>
);

export default ButtonInput;
