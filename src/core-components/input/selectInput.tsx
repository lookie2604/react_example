import React, { FunctionComponent, ReactElement, useState } from 'react';

interface SelectInputProps {
    label: string;
    name: string;
    auswahl: string[];
    parentCallback: Function;
}

const SelectInput: FunctionComponent<SelectInputProps> = ({ label, name, auswahl, parentCallback }): ReactElement => {
    const selectioninput: string[] = auswahl;
    const [selectionvalue, setSelectionValue] = useState<string>('');

    const listItems = selectioninput.map(number =>
        <option key={number.toString()} value={number.toString()}>{number}</option>);

    const handleChange = event => {
        setSelectionValue(event.target.value);
        parentCallback(name, event.target.value);
    };

    return (
        <div className='form-group col-6'>
            <label htmlFor={`${name}input`}>{label}</label>
            <select className='form-select' id={`${name}input`} name={name} value={selectionvalue} onChange={handleChange}>
                {listItems}
            </select>
        </div>
    );
};

export default SelectInput;
