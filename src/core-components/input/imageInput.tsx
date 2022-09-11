import React, { FunctionComponent, ReactElement } from 'react';

interface ImageInputProps {
    src: string;
    alt: string;
    title: string;
    className: string;
}

const ImageInput: FunctionComponent<ImageInputProps> = ({ src, alt, title, className }): ReactElement => (
    <img className={className} src={src} alt={alt} title={title} />
);

export default ImageInput;
