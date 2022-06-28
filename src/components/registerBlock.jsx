import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../jsConfiguration';
import { useState } from 'react';

const RegisterBlock = () => {

    const navigate = useNavigate();
    const [registerUsername, setRegisterUsername] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");

    const register = async (event) => {
        try{
            event.preventDefault();
            await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
           
            await updateProfile(auth.currentUser, {
                displayName: registerUsername
              })
            document.querySelector('.error__block').style.display = "none";
            navigate('/')
        }
        catch(error){
            registerPassword.length < 6 &&  (document.querySelector('.error__block').style.display = "flex")
            if(error.code == "auth/email-already-in-use"){
                document.querySelector('.error__block').innerHTML = "Email already in use";
                document.querySelector('.error__block').style.display = "flex";
            }
        }
        
    }


    return (
        <div className='login__wrapper area'>
            <ul className="circles">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
            </ul>
            <form className="login__block" onSubmit={(event) => register(event)}>
                <h1>Register</h1>
                <div className="error__block">
                Password should be at least 6 characters
                </div>
                <div className="login__input--wrapper">
                    <p>Username</p>
                    <input type="text" className='login__input' required placeholder='Type your Email' onChange={(event) => {setRegisterUsername(event.target.value)}} />
                    <FontAwesomeIcon icon="fa-solid fa-user" className='user' />
                </div>
                <div className="login__input--wrapper">
                    <p>Email</p>
                    <input type="email" className='login__input' required placeholder='Type your Email' onChange={(event) => {setRegisterEmail(event.target.value)}} />
                    <FontAwesomeIcon icon="fa-solid fa-envelope" className='user' />
                </div>
                <div className="login__input--wrapper">
                    <p>Password</p>
                    <input type="password" className='login__input' required placeholder='Type your password' onChange={(event) => {setRegisterPassword(event.target.value)}} />
                    <FontAwesomeIcon icon="fa-solid fa-key" className='user' />
                </div>
                <div className="button__wrapper">
                    <button id='reg-btn'>REGISTER</button>
                </div>
                <div className="login__text">
                    <p>already member?</p>
                    <span onClick={() => navigate('/login')}>Login now</span>
                </div>
            </form>
        </div>
    );
}

export default RegisterBlock;
