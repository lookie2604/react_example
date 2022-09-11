import english from '../../assets/img/english.png';
import french from '../../assets/img/french.png';
import german from '../../assets/img/german.png';
import ImageInput from '../input/imageInput';
import { useTranslation } from 'react-i18next';
import React, { Fragment, FunctionComponent } from 'react';

const LanguageButton: FunctionComponent = () => {
    const [t, i18n] = useTranslation('common');
    const styleclass = 'languageicon';
    const languages = [
        ['de', german, 'german'],
        ['en', english, 'english'],
        ['fr', french, 'french']
    ];

    const listItems = languages.map(
        language => (
            <button key={language[0]} className='bg-transparent border-0 p-1' onClick={async () => i18n.changeLanguage(language[0])}>
                <ImageInput className={styleclass} src={language[1]} alt={t(`navigation.${language[2]}`)} title={t(`navigation.${language[2]}`)} />
            </button>)
    );

    return (
        <Fragment>
            {listItems}
        </Fragment>
    );
};

export default LanguageButton;
