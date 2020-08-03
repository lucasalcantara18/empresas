import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import logo from '../../assets/logo-home.png';
import MailIcon from '../../assets/ic-email.svg';
import PasswordIcon from '../../assets/ic-cadeado.svg';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { useHistory } from 'react-router-dom'
import './styles.css';
import api from '../../services/api';
import { Spinner } from 'react-bootstrap';


const LoginPage = () => {
    
    const history = useHistory();
    const [mailRegex, setMailRegex] = useState<RegExp>(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    const [visible, setVisible] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [formData, setFormData]= useState({email: '', password: ''});
    const [wrongPass, setWrongPass] = useState<boolean>(false);
    const [wrongMail, setWrongMail] = useState<boolean>(false);

    const handleToggleVisible = () => {
        if(visible === true){
            setVisible(false);
        }else if(visible === false){
            setVisible(true);
        }
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        // console.log(event.target);
        event.persist();        
        const {name, value} = event.target;
        setFormData({...formData, [name]:value}); 
        setWrongPass(false);
    }

    useEffect(() => {//esse useEffect lida com o delay do onChange
        if(mailRegex.test(formData.email) === true){
            setWrongMail(true);
        }else{
            setWrongMail(false);
        }
      }, [formData]);

    const handleValidadeEmail = () => {
        const {email} = formData;
        
        if(email.length === 0){
            return "form-control"
        }else{
            if(mailRegex.test(email) === true){
                return "form-control is-valid";
            }else if(mailRegex.test(email) === false){
                return "form-control is-invalid";
            }
        }
    }

    const handleLogon = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        const {email, password} = formData;
        
        const data = {
            email,
            password
        }
        await api.post('users/auth/sign_in', data).then(response => {
            setLoading(false);
            
            localStorage.setItem('access-token', response.headers['access-token']);
            localStorage.setItem('uid', response.headers.uid);
            localStorage.setItem('client', response.headers.client);
            history.push('/home');         
        }).catch((err) => {
            setLoading(false);
            console.log(err);
            setWrongPass(true);                
        });
        
    }

    return (
        <div id="login-page" className="container-fluid" style={{minHeight: '100vh', display: 'flex'}}>
            <div className="row w-100" style={{display: 'relative'}}>
                
                <div className={`${loading ? "spinner-on" : "spinner-off"}`}>
                    <Spinner animation="border" role="status" variant="primary"/>
                </div>

                <div className={`col d-flex justify-content-center align-items-center ${loading ? "fade-on" : "fade-off"}`}>
                
                    <div className='w-25 d-flex flex-column'>
                        <div className="row mt-3 mb-5">
                            <div className="col d-flex justify-content-center">
                                <img src={logo} alt="Ioasys"/>
                            </div>
                        </div>
                        <div className="row mt-5">
                            <div className="col">
                                <p className="custom-welcome">BEM-VINDO AO <br /> EMPRESAS</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <p className="custom-lorem">Lorem ipsum dolor sit amet, contetur <br /> adipiscing elit. Nunc accumsan.</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col p-4">
                                <form onSubmit={handleLogon}>
                                    <div className="form-group">
                                        <div className="inner-addon left-addon">
                                            <img className="glyphicon" src={MailIcon} alt="Ioasys"/>
                                            <input type="email" className={`${wrongPass ? "form-control is-invalid" : handleValidadeEmail()}`} placeholder="E-mail" id="email" name="email" onChange={handleInputChange}/>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="inner-addon left-addon right-addon">
                                            <img className="glyphicon" src={PasswordIcon} alt="Ioasys"/>
                                            <span onClick={handleToggleVisible} className="span">{visible ? <FiEye /> : <FiEyeOff />} </span>
                                            <input type={visible ? "text" : "password"} placeholder="Senha" className={`form-control ${wrongPass ? "is-invalid padding-correction" : ""}`} name="password" id="password" onChange={handleInputChange}/>
                                            <div className="invalid-feedback" style={{textAlign: 'center'}}>
                                                Por favor, forneça a senha correta
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group d-flex justify-content-center">
                                        <button type="submit" disabled={!wrongMail} className="btn btn-primary btn-lg" >Entrar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );

}

export default LoginPage;