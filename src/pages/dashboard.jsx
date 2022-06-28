import React from 'react';
import Landing from '../components/landing';
import Nav from '../components/nav';
import Updated from '../components/updated';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../jsConfiguration';
import { useState, useEffect } from 'react';

const Dashboard = () => {


    const navigate = useNavigate();
    const [user, setUser] = useState({});

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        })
    }, [])

    return (
        <div>
            <Nav />
            <Landing />
            <Updated />
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

export default Dashboard;
