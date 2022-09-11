import common_de from './translations/de/common.json';
import common_en from './translations/en/common.json';
import common_fr from './translations/fr/common.json';
import Contact from './pages/contact';
import { createRoot } from 'react-dom/client';
import Home from './pages/home';
import i18next from 'i18next';
import { I18nextProvider } from 'react-i18next';
import NoPage from './pages/404';
import phpapi from './api/mail/index.php';
import React from 'react';
import * as bootstrap from 'bootstrap';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './assets/css/style.scss';
import './assets/css/style.css';

const root = createRoot(document.getElementById('app-root') as Element);

i18next.init({
    interpolation: { escapeValue: false },
    lng: 'de',
    resources: {
        de: {
            common: common_de
        },
        en: {
            common: common_en
        },
        fr: {
            common: common_fr
        }
    }
});

root.render(
    <React.StrictMode>
        <I18nextProvider i18n={i18next}>
            <div className='row' style={{ boxShadow: '0px 0px 5px rgba(0,0,0,.5)' }}>
                <BrowserRouter>
                    <Routes>
                        <Route
                            path='/'
                            element={
                                <Home />
                            }
                        />
                        <Route
                            path='contact'
                            element={
                                <Contact />
                            }
                        />
                        <Route
                            path='*'
                            element={
                                <NoPage />
                            }
                        />
                        <Route path={`${process.env.REACT_APP_MAIL_API}`} element={phpapi} />
                    </Routes>
                </BrowserRouter>
            </div>
        </I18nextProvider>
    </React.StrictMode>
);

