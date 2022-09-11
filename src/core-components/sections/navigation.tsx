import LanguageButton from './languageButton';
import { useTranslation } from 'react-i18next';
import { NavLink, Outlet } from 'react-router-dom';
import React, { Fragment, FunctionComponent } from 'react';

const Navigation: FunctionComponent = () => {
  const [ t, i18n ] = useTranslation('common');

  return (
    <Fragment>
      <nav>
        <NavLink style={ ({ isActive }) => ({ color: isActive ? 'red' : 'black' }) } to='/'>{t('navigation.home')}</NavLink>
        <NavLink style={ ({ isActive }) => ({ color: isActive ? 'red' : 'black' }) } to='/contact'>{t('navigation.contactform')}</NavLink>
        <NavLink style={ ({ isActive }) => ({ color: isActive ? 'red' : 'black' }) } to='/aboutus'>{t('navigation.aboutus')}</NavLink>
        <NavLink style={ ({ isActive }) => ({ color: isActive ? 'red' : 'black' }) } to='/impressum'>{t('navigation.imprint')}</NavLink>
        <LanguageButton />
      </nav>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
