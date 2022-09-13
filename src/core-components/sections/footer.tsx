import LanguageButton from './languageButton';
import React, { Fragment, FunctionComponent } from 'react';

const Footer: FunctionComponent = () => {
  return (
    <Fragment>
      <div className='footer'>
        <LanguageButton />
      </div>
    </Fragment>
  );
};

export default Footer;
