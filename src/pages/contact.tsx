import axios from 'axios';
import ButtonInput from "../core-components/input/buttonInput";
import CheckInput from '../core-components/input/checkInput';
import LanguageButton from '../core-components/sections/languageButton';
import Navigation from '../core-components/sections/navigation';
import Reaptcha from 'reaptcha';
import SelectInput from '../core-components/input/selectInput';
import TextInput from '../core-components/input/textInput';
import { useTranslation } from 'react-i18next';
import React, { Fragment, FunctionComponent, useEffect, useId, useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const Contact: FunctionComponent = () => {
    const [forminput, setFormInput] = useState<Array<string>>([]);
    const [inputrequired, setInputRequired] = useState<Array<string>>([]);
    const countries = ['Auswahl', 'Deutschland', 'Polen', 'Österreich', 'Schweiz', 'Frankreich'];
    const provinz = ['Auswahl', 'Berlin', 'Brandenburg', 'Sachsen', 'Hessen', 'Bremen'];
    const [t, i18n] = useTranslation('common');
    const captchaRef = useRef<Reaptcha>(null);
    const [token, setToken] = useState<string>('');
    const [mail, setMail] = useState<boolean>();
    const [connerror, setConnError] = useState();
    const [count, setCount] = useState<number>(0);
    const id = useId();

    const callbackFunction = (inputname: string, inputvalue: string | boolean, inputrequired: string): void => {
        const name: string = inputname;
        const value: string | boolean = inputvalue;

        setInputRequired(
            prevState => (
                {
                    ...prevState,
                    [name]: inputrequired
                }
            )
        );

        setFormInput(
            prevState => (
                { ...prevState,
                    [name]: value }
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
                    setMail(response.data.sent);
                    if (mail) {
                        toast.success(t('contact.message.success'), {
                            position: "top-center",
                            autoClose: 7000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                    else {
                        toast.error('Bitte füllen Sie alle erforderlichen Felder aus!', {
                            position: "top-center",
                            autoClose: 7000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                    // console.log(response.status);
                    // console.log(response.statusText);
                    // console.log(response.headers);
                    // console.log(response.config);
                })
                .catch((error) => {
                    if (error.response) {
                        // console.log(error.response.data);
                        // console.log(error.response.status);
                        // console.log(error.response.headers);
                        setConnError(error.response.data);
                    } else if (error.request) {
                        // console.log(error.request);
                        setConnError(error.request);
                    } else {
                        // console.log('Error', error.message);
                        setConnError(error.message.sent);
                    }
                    // console.log(error.config);
                    if (connerror) {
                        toast.error(connerror, {
                            position: "top-center",
                            autoClose: 7000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                    }
                    else { }
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
        console.log(forminput);
        console.log(inputrequired);
    });

    return (
        <Fragment>
            <Navigation />
            <div className='row'>
                <ToastContainer />
                <h1 className='text-center'>{t('contact.title')}</h1>
                <form className='d-flex flex-row flex-wrap justify-content-between mt-4'>
                    <TextInput label={t('contact.input.firstname*')} name={id + 'firstname'} RegExp={/^[ .A-Za-zÄÖÜßäöü\-]+$/u} parentCallback={callbackFunction} required={true} />
                    <TextInput label={t('contact.input.lastname*')} name={id + 'lastname'} RegExp={/^[ .A-Za-zÄÖÜßäöü\-]+$/u} parentCallback={callbackFunction} required={true} />
                    <TextInput label={t('contact.input.street')} name={id + 'street'} RegExp={/^[\d .A-Za-zÄÖÜßäöü\-]+$/u} parentCallback={callbackFunction} required={false} />
                    <TextInput label={t('contact.input.zip')} name={id + 'zip'} RegExp={/^[\d ]+$/u} parentCallback={callbackFunction} required={false} />
                    <TextInput label={t('contact.input.location')} name={id + 'location'} RegExp={/^[ .A-Za-zÄÖÜßäöü\-]+$/u} parentCallback={callbackFunction} required={false} />
                    <SelectInput label={t('contact.input.countryselection')} name={id + 'countryselection'} auswahl={countries} parentCallback={callbackFunction} />
                    <SelectInput label={t('contact.input.state')} name={id + 'state'} auswahl={provinz} parentCallback={callbackFunction} />
                    <TextInput label={t('contact.input.phone')} name={id + 'phone'} RegExp={/^[0-9\-]+$/u} parentCallback={callbackFunction} required={true} />
                    <TextInput label={t('contact.input.mail')} name={id + 'mail'} RegExp={/^[]+$/u} parentCallback={callbackFunction} required={true} />
                    <CheckInput label={t('contact.input.privacy')} name={id + 'privacy'} parentCallback={callbackFunction} />
                    <div className='form-group col-12 mt-4 mb-4'>
                        <Reaptcha sitekey='6Lf6NrEhAAAAAHVrsoBNfgsvzMmoQqvA9qnX2pzj' ref={captchaRef} onVerify={handleVerify} />
                    </div>
                    <ButtonInput className='btn btn-primary' name={id + 'mailsend'} value={t('contact.input.sendmessage')} onClick={handleSubmit} />
                </form>
            </div>
            <div className='footer'>
                <LanguageButton />
            </div>
        </Fragment>
    );
};

export default Contact;