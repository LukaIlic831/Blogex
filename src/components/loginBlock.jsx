import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import img from '../assets/googlebutton.png';
import { useNavigate } from 'react-router-dom';
import { auth } from '../jsConfiguration';
import { provider } from '../jsConfiguration';
import { signInWithPopup, signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';

const LoginBlock = () => {

    const navigate = useNavigate();
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            navigate('/')
        }).catch((error) => {
            console.log(error)
        })
    }

    const pressenter = (e) => {
        if (e.key === "Enter") {
            login(e);
        }
    }

    const login = async (event) => {
        try{
            event.preventDefault();
            await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
            document.querySelector('.error__block').style.display = "none";
            navigate('/')
        }
        catch(error){
            document.querySelector('.error__block').style.display = "flex";

            if(error.code == "auth/email-already-in-use"){
                alert("Email already in use")
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
            <div className="login__block">
                <h1>Login</h1>
                <div className="error__block">
                    Wrong Email or Password
                </div>
                <form onSubmit={(event) => {login(event)}}  onKeyPress={(event) => pressenter(event)}>
                <div className="login__input--wrapper">
                    <p>Email</p>
                    <input type="email" className='login__input' required placeholder='Type your Email' onChange={(event) => { setLoginEmail(event.target.value) }} />
                    <FontAwesomeIcon icon="fa-solid fa-envelope" className='user' />
                </div>
                <div className="login__input--wrapper">
                    <p>Password</p>
                    <input type="password" className='login__input' required placeholder='Type your password' onChange={(event) => { setLoginPassword(event.target.value) }} />
                    <FontAwesomeIcon icon="fa-solid fa-key" className='user' />
                </div>
                <div className="button__wrapper">
                    <button>LOGIN</button>
                </div>
                </form>
                <div className="google__wrapper">
                    <img src={img} alt="" onClick={signInWithGoogle} />
                </div>
                <div className="login__text">
                    <p>Don't have account?</p>
                    <span onClick={() => navigate('/register')}>Sign up now</span>
                </div>
            </div>
        </div>
    );
}

export default LoginBlock;
