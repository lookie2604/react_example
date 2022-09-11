import React from 'react';

const Message = (props: { name: string | undefined; error: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined }) => (
    <small id={props.name}>{props.error}</small>
);

export default Message;
