import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../jsConfiguration';
import { db } from '../jsConfiguration';
import { collection, addDoc } from "firebase/firestore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Createblogcard = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    const [oneword, setOneWord] = useState(false);
    const [category, setCategory] = useState("");
    const userCollectionRef = collection(db, "blogs");
    const month = new Date().getMonth();
    const day = new Date().getDate();
    const year = new Date().getFullYear();
    const date = month + '/' + day + '/' + year;


    async function publish(event) {
        try {
            
                event.preventDefault();
                await addDoc(userCollectionRef,
                    {
                        id: user.uid,
                        name: user.displayName,
                        title: title,
                        text: text,
                        category: category,
                        date: date
                    });
                navigate('/');
            
        }
        catch (error) {
            console.log(error)
        }

    }

    


    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);

        })
    })

    return (
        <div className='createblog__wrapper area'>
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
            <div className="createblog__block">
                <div class="tools2">
                    <div className="circle__wrapper">
                    <div class="circle">
                        <span class="red box"></span>
                    </div>
                    <div class="circle">
                        <span class="yellow box"></span>
                    </div>
                    <div class="circle">
                        <span class="green box"></span>
                    </div>
                    </div>
                    <div className="createblog__user">
                        {
                            user?.displayName &&
                                <>
                                    <FontAwesomeIcon icon="fa-solid fa-user" />
                                    <p>{user.displayName}</p>
                                </>
                        }
                    </div>
                </div>
                <form class="card__content create__cnt" onSubmit={(event) => { publish(event) }}>
                    <div className="card__title--wrapper">
                        <input type="text" maxlength="50" className='card__title--input' required placeholder='Title' onChange={(event) => { setTitle(event.target.value) }} />
                        <select id="categories" required onChange={(event) => { setCategory(event.target.value) }}>
                            <option value="">Select Category</option>
                            <option value="food">Food</option>
                            <option value="travel">Travel</option>
                            <option value="entrepreneurship">Entrepreneurship</option>
                            <option value="personal">Personal</option>
                            <option value="lifestyle">Lifestyle</option>
                        </select>
                    </div>
                    <textarea cols="30" rows="10" required placeholder='Start Writing' onChange={(event) => { setText(event.target.value) }}></textarea>
                    <div className="card__button--wrapper">
                        <button className='card__button publish'>PUBLISH</button>
                        <button className='card__button cancel' onClick={() => navigate('/')}>CANCEL</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Createblogcard;
