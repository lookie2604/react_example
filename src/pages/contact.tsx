import axios from 'axios';
import ButtonInput from "../core-components/input/buttonInput";
import CheckInput from '../core-components/input/checkInput';
import LanguageButton from '../core-components/sections/languageButton';
import Navigation from '../core-components/sections/navigation';
import Reaptcha from 'reaptcha';
import SelectInput from '../core-components/input/selectInput';
import TextInput from '../core-components/input/textInput';
import { useTranslation } from 'react-i18next';
import React, { ChangeEvent, Fragment, FunctionComponent, MouseEventHandler, useEffect, useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const Contact: FunctionComponent = () => {
    const [forminput, setFormInput] = useState({});
    const countries = ['Auswahl', 'Deutschland', 'Polen', 'Österreich', 'Schweiz', 'Frankreich'];
    const provinz = ['Auswahl', 'Berlin', 'Brandenburg', 'Sachsen', 'Hessen', 'Bremen'];
    const [t, i18n] = useTranslation('common');
    const captchaRef = useRef<Reaptcha>(null);
    const [token, setToken] = useState<string>('');

    const [mail, setMail] = useState<any>();
    const [error, setError] = useState();

    const callbackFunction = (inputname: string, inputvalue: string | boolean): void => {
        const name: string = inputname;
        const value: string | boolean = inputvalue;

        setFormInput(
            prevState => (
                { ...prevState, [name]: value }
            )
        );
    };

    const handleSubmit= (event) => {
        if (!token) {
            event.preventDefault();
        }
        else {
            const instance = axios.create({
                baseURL: 'http://localhost:8000/api/mail/',
                timeout: 5000,
                headers: { 'Content-Type': 'application/json' },
                withCredentials: false,
                maxContentLength: 5000,
                maxBodyLength: 5000,
            });
           
            instance.post(
                'http://localhost:8000/api/mail/',
                forminput
            )
                .then((response) => {
                    setMail(response.data.message);
                    console.log(response.status);
                    console.log(response.statusText);
                    console.log(response.headers);
                    console.log(response.config);
                })
                .catch((error) => {
                    if (error.response) {
                        console.log(error.response.data);
                        console.log(error.response.status);
                        console.log(error.response.headers);
                    } else if (error.request) {
                        console.log(error.request);
                    } else {
                        console.log('Error', error.message);
                    }
                    console.log(error.config);
                });
        }
    };

    const handleVerify = () => {
        if (captchaRef.current !== null) {
            captchaRef.current.getResponse().then(res => {
                setToken(res);
            });
        }
    };

    useEffect(() => {
        // console.log(forminput);
        // console.log(token);
        // console.log(error);
        console.log(mail);
    }, [mail]);

    return (
        <Fragment>
            <Navigation />
            <div className='row'>
                <ToastContainer />
                <h1 className='text-center'>{t('contact.title')}</h1>
                <div className='d-flex flex-row flex-wrap justify-content-between mt-4'>
                    <TextInput label={t('contact.input.firstname*')} name='firstname' RegExp={/^[ .A-Za-zÄÖÜßäöü\-]+$/u} parentCallback={callbackFunction} />
                    <TextInput label={t('contact.input.lastname*')} name='lastname' RegExp={/^[ .A-Za-zÄÖÜßäöü\-]+$/u} parentCallback={callbackFunction} />
                    <TextInput label={t('contact.input.street')} name='street' RegExp={/^[\d .A-Za-zÄÖÜßäöü\-]+$/u} parentCallback={callbackFunction} />
                    <TextInput label={t('contact.input.zip')} name='zip' RegExp={/^[\d ]+$/u} parentCallback={callbackFunction} />
                    <TextInput label={t('contact.input.location')} name='location' RegExp={/^[ .A-Za-zÄÖÜßäöü\-]+$/u} parentCallback={callbackFunction} />
                    <SelectInput label={t('contact.input.countryselection')} name='countryselection' auswahl={countries} parentCallback={callbackFunction} />
                    <SelectInput label={t('contact.input.state')} name='state' auswahl={provinz} parentCallback={callbackFunction} />
                    <CheckInput label={t('contact.input.privacy')} name='privacy' parentCallback={callbackFunction} />
                    <div className='form-group col-12 mt-4 mb-4'>
                        <Reaptcha sitekey='6Lf6NrEhAAAAAHVrsoBNfgsvzMmoQqvA9qnX2pzj' ref={captchaRef} onVerify={handleVerify} />
                    </div>
                    <ButtonInput className='btn btn-primary' name='mailsend' value={t('contact.input.sendmessage')} onClick={handleSubmit} />
                </div>
            </div>
            <div className='footer'>
                <LanguageButton />
            </div>
        </Fragment>
    );
};

export default Contact;