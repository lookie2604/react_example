import LanguageButton from '../core-components/sections/languageButton';
import Navigation from '../core-components/sections/navigation';
import { useTranslation } from 'react-i18next';
import React, { Fragment, FunctionComponent } from 'react';

const NoPage: FunctionComponent = () => {
  const [ t, i18n ] = useTranslation('common');

  return (
    <Fragment>
      <Navigation />
      <div className='row'>
        <h1 className='text-center'>{t('nopage.title')}</h1>
      </div>
      <div className='footer'>
        <LanguageButton />
      </div>
    </Fragment>
  );
};

export default NoPage;
