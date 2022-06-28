import React from 'react';
import { useState, useEffect } from 'react';
import { db } from '../jsConfiguration';
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../jsConfiguration';
import img from '../assets/create.svg';
import Loading from './ui/loading';

const Myblgscontenct = () => {

    const userCollectionRef = collection(db, "blogs");
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState({});
    const [showBlogs, setShowBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const myblogs = [];

    function loadblogs() {
        blogs.map(item => {
            if (item.id == user.uid) {
                myblogs.push(item);
            }
        })
        setShowBlogs(myblogs);
    }

    useEffect(() => {
        const getBlogs = async () => {
            const data = await getDocs(userCollectionRef);
            setBlogs(data.docs.map(doc => ({ ...doc.data() })));
            setLoading(false)
        }
        getBlogs();

        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);

        })

        loadblogs();

    }, [blogs]);

    return (
        <div className='row row2'>
            {loading && <Loading/>
            }
            <div className="main__title myblogs__title">
                <h1>My blogs</h1>
            </div>
            <div className="myblogs__wrapper">
                {
                    showBlogs && showBlogs.map(item =>
                        <div className="blog__card">
                            <div className="tools">
                                <div className="circle">
                                    <span className="red box"></span>
                                </div>
                                <div className="circle">
                                    <span className="yellow box"></span>
                                </div>
                                <div className="circle">
                                    <span className="green box"></span>
                                </div>
                            </div>
                            <div className="card__content">
                                <h2 className='card__content--title mytitle'>{item.title}</h2>
                                <p className='card__content--text mytxt'>{item.text}</p>
                                <div className="card__content--footer">
                                    <span className='card__content--category'>Category: {item.category}</span>
                                    <span className='card__content--date'>{item.date}</span>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className="create__img--wrapper">
            {
                    showBlogs.length == 0 &&
                    <>
                     <figure>
                        <img src={img} className="create__img" alt="" />
                    </figure>
                    <h2 className='create__img--title'>No blogs yet? Go create them</h2>
                    </>
                }
            </div>
        </div>
    );
}

export default Myblgscontenct;
