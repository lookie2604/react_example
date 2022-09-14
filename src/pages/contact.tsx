import axios from 'axios';
import ButtonInput from "../core-components/input/buttonInput";
import CheckInput from '../core-components/input/checkInput';
import Footer from '../core-components/sections/footer';
import Navigation from '../core-components/sections/navigation';
import Reaptcha from 'reaptcha';
import SelectInput from '../core-components/input/selectInput';
import TextInput from '../core-components/input/textInput';
import { useTranslation } from 'react-i18next';
import React, { Fragment, FunctionComponent, useEffect, useId, useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';

const Contact: FunctionComponent = () => {
    const [forminput, setFormInput] = useState<Array<string>>([]);
    const [t, i18n] = useTranslation('common');
    const captchaRef = useRef<Reaptcha>(null);
    const [token, setToken] = useState<string>('');
    const [mail, setMail] = useState<boolean>();
    const [connerror, setConnError] = useState();
    const initialstate = 0;
    const [count, setCount] = useState(initialstate);
    const id: string = useId();

    const formtextitems: (string | boolean | RegExp)[][] = [
        ['firstname', /^[ .A-Za-zÄÖÜßäöü\-]+$/u, true],
        ['lastname', /^[ .A-Za-zÄÖÜßäöü\-]+$/u, true],
        ['street', /^[\d .A-Za-zÄÖÜßäöü\-]+$/u, false],
        ['zip', /^[\d ]+$/u, false],
        ['location', /^[ .A-Za-zÄÖÜßäöü\-]+$/u, false],
        ['phone', /^[0-9\-]+$/u, true],
        ['mail', /^[]+$/u, true]
    ];
    const formselectitems: (string | string[])[][] = [
        [
            'countryselection',
            ['Auswahl', 'Deutschland', 'Polen', 'Österreich', 'Schweiz', 'Frankreich']
        ],
        [
            'state',
            ['Auswahl', 'Berlin', 'Brandenburg', 'Sachsen', 'Hessen', 'Bremen']
        ]
    ];

    const callbackFunction = (inputname: string, inputvalue: string | boolean): void => {
        const name: string = inputname;
        const value: string | boolean = inputvalue;

        setFormInput(
            prevState => (
                { ...prevState,
                    [name]: value }
            )
        );

        if(count > 0){
            setCount(initialstate);
        }

        formtextitems.map((item: string | boolean | RegExp | Array<any>) => {
            if (forminput[id + item[0]] !== undefined && forminput[id + item[0]] !== null) {
                if (forminput[id + item[0]] == "" && item[2] == true) {
                    setCount(count + 1);
                }
            }
            else {
                if (item[2] == true) {
                    setCount(count + 1);
                }
            }
        });
    };

    const handleSubmit= (event) => {
        if (!token) {
            event.preventDefault();
            toast.error('Bitte bestätigen Sie das reCaptcha!', {
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
            if (count == 0) {
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
                            setConnError(error.request);
                        } else {
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
        console.log(count);
    }, [count]);

    const formtextlist: JSX.Element[] = formtextitems.map((item: string | boolean | RegExp | Array<any>, index) =>
        <TextInput key={index} label={t('contact.input.' + item[0])} name={id + item[0]} RegExp={item[1]} parentCallback={callbackFunction} required={item[2]} />
    );

    const formselectlist: JSX.Element[] = formselectitems.map((item: string | Array<any>) =>
        <SelectInput label={t('contact.input.' + item[0])} name={id + item[0]} auswahl={item[1]} parentCallback={callbackFunction} />
    );

    const formchecklist: JSX.Element = <CheckInput label={t('contact.input.privacy')} name={id + 'privacy'} parentCallback={callbackFunction} required={true} />;

    const formrecaptcha: JSX.Element =
        <div className='form-group col-12 mt-4 mb-4'>
            <Reaptcha sitekey='6Lf6NrEhAAAAAHVrsoBNfgsvzMmoQqvA9qnX2pzj' ref={captchaRef} onVerify={handleVerify} />
        </div>;

    return (
        <Fragment>
            <Navigation />
            <div className='row'>
                <ToastContainer />
                <h1 className='text-center'>{t('contact.title')}</h1>
                <div className='d-flex flex-row flex-wrap justify-content-between mt-4'>
                    { formtextlist }
                    { formselectlist }
                    { formchecklist }
                    { formrecaptcha }
                    <ButtonInput className='btn btn-primary' name={id + 'mailsend'} value={t('contact.input.sendmessage')} onClick={handleSubmit} />
                </div>
            </div>
            <Footer />
        </Fragment>
    );
};

export default Contact;