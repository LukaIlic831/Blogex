import React from 'react';
import Myblgscontenct from '../components/myblgscontenct';
import Nav from '../components/nav';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../jsConfiguration';
import { useState, useEffect } from 'react';

const Myblogs = () => {


    const navigate = useNavigate();
    const [user, setUser] = useState({});

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        })
    }, [])

    return (
        <div>
            <Nav/>
            <Myblgscontenct/>
            {
                user?.displayName ?
                    <a className="create__block" onClick={() => navigate('/createblog')}>
                        <span className='create__icon'>
                            <FontAwesomeIcon icon="fa-solid fa-pencil" />
                            <p>Create New Blog</p>
                        </span>
                    </a>
                    :
                    <a className="create__block" onClick={() => navigate('/login')}>
                        <span className='create__icon'>
                            <FontAwesomeIcon icon="fa-solid fa-pencil" />
                            <p>Create New Blog</p>
                        </span>
                    </a>
            }
        </div>
    );
}

export default Myblogs;
