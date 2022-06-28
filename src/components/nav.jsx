import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import logo from "../assets/logo.png";
import { useNavigate, useLocation } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../jsConfiguration';
import { useState, useEffect } from 'react';
import { db } from '../jsConfiguration';
import { collection, doc, setDoc, getDocs } from "firebase/firestore";

const Nav = () => {

    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [blogs, setBlogs] = useState([]);
    const selectedBlogs = [];
    const userCollectionRef = collection(db, "blogs");
    const location = useLocation();

    const openSidebar = () => {
       document.querySelector(".phone__mobile").style.left = "0";
    }

    const closeSidebar = () => {
        document.querySelector(".phone__mobile").style.left = "-100%";
     }


    const logout = async () => {
        await signOut(auth).then(() => {
            navigate('/login')
        });
    }
    

    const selectCategory = (value) => {

     

        blogs.filter(blog => blog.category.toLowerCase() == value.toLowerCase()).map(filtrblog =>

            selectedBlogs.push(filtrblog)
        )

        navigate('/searchblogs', { state: selectedBlogs })

    }

    const darkmode = () => {
        document.body.classList.toggle("darkmode");
    }

    useEffect(() => {
        onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);


        })

        const getBlogs = async () => {
            const data = await getDocs(userCollectionRef);
            setBlogs(data.docs.map(doc =>
                ({ ...doc.data() })
            ));
        }
        getBlogs();

        if (user && user.uid) {
            createUser();
            async function createUser() {
                const userCollectionRef = doc(db, `users/${user.uid}`);
                await setDoc(userCollectionRef, { name: user.displayName });
            }
        }


    }, [user])




    return (
        <div>
            <nav>
                <div className="menu__wrapper">
                    <FontAwesomeIcon icon="fa-solid fa-bars" className='menu' onClick={openSidebar} />
                </div>
                <div className="logo__wrapper">
                    <figure className='logo__image'>
                        <img src={logo} alt="" />
                    </figure>
                    <h1>logex</h1>
                </div>
                <ul className='list__wrapper'>
                    <li className='list__item'>
                        <FontAwesomeIcon icon="fa-solid fa-moon" onClick={darkmode} />
                    </li>
                    <li className="list__item">
                        {
                            user?.uid ?
                                <FontAwesomeIcon icon="fa-solid fa-book" onClick={() => { navigate('/myblogs') }} />
                                :
                                <FontAwesomeIcon icon="fa-solid fa-book" onClick={() => navigate('/login')} />
                        }
                    </li>
                </ul>
            </nav>
            <div className="sidebar">
                <ul>
                    {
                        location.pathname != '/' && <li className='list' onClick={() => navigate('/')}>
                            <b></b>
                            <b></b>
                            <a>
                                <span className='icn'> <FontAwesomeIcon icon="fa-solid fa-house" className='icoon' /> </span>
                                <span className='sidebar__txt'>Home</span>
                            </a>
                        </li>
                    }
                    {
                        location.pathname != '/searchblogs' && <>
                            <li className='list' onClick={() => navigate('/searchblogs')}>
                                <b></b>
                                <b></b>
                                <a>
                                    <span className='icn'> <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className='icoon' /> </span>
                                    <span className='sidebar__txt'>Find blog</span>
                                </a>
                            </li>
                            <li className='list' onClick={(event) => selectCategory(event.target.innerText)}>
                                <b></b>
                                <b></b>
                                <a>
                                    <span className='icn'> <FontAwesomeIcon icon="fa-solid fa-apple-whole" className='icoon' /> </span>
                                    <span className='sidebar__txt'>Food</span>
                                </a>
                            </li>
                            <li className='list' onClick={(event) => selectCategory(event.target.innerText)}>
                                <b></b>
                                <b></b>
                                <a>
                                    <span className='icn'> <FontAwesomeIcon icon="fa-solid fa-earth-europe" className='icoon' /> </span>
                                    <span className='sidebar__txt'>Travel</span>
                                </a>
                            </li>
                            <li className='list' onClick={(event) => selectCategory(event.target.innerText)}>
                                <b></b>
                                <b></b>
                                <a>
                                    <span className='icn'> <FontAwesomeIcon icon="fa-solid fa-business-time" className='icoon' /> </span>
                                    <span className='sidebar__txt'>Entrepreneurship</span>
                                </a>
                            </li>
                            <li className='list' onClick={(event) => selectCategory(event.target.innerText)}>
                                <b></b>
                                <b></b>
                                <a>
                                    <span className='icn'> <FontAwesomeIcon icon="fa-solid fa-person" className='icoon' /> </span>
                                    <span className='sidebar__txt'>Personal</span>
                                </a>
                            </li>
                            <li className='list' onClick={(event) => selectCategory(event.target.innerText)}>
                                <b></b>
                                <b></b>
                                <a>
                                    <span className='icn'> <FontAwesomeIcon icon="fa-solid fa-heart-pulse" className='icoon' /> </span>
                                    <span className='sidebar__txt'>Lifestyle</span>
                                </a>
                            </li>
                        </>
                    }
                    {
                        user?.displayName ?
                            <li className='list' onClick={logout}>
                                <b></b>
                                <b></b>
                                <a>
                                    <span className='icn'> <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" className='icoon icn-rotate' /> </span>
                                    <span className='sidebar__txt'>Sign out</span>
                                </a>
                            </li>
                        :
                        <li className='list' onClick={() => navigate('/login')}>
                                <b></b>
                                <b></b>
                                <a>
                                    <span className='icn'> <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" className='icoon' /> </span>
                                    <span className='sidebar__txt'>Log in</span>
                                </a>
                            </li>
                }
                </ul>
                {
                    user?.displayName && <>
                        <div className="sidebar__user">
                            <p>Hi, {user.displayName}</p>
                        </div>
                    </>
                }
            </div>
            <div className="phone__mobile">
            <ul>
            <FontAwesomeIcon icon="fa-solid fa-xmark" className='phone__mobile--close' onClick={closeSidebar}/>
                    {
                        location.pathname != '/' && <li onClick={() => navigate('/')}>
                            <b></b>
                            <b></b>
                            <a>
                                <span className='sidebar__txt'>Home</span>
                                <span className='icn'> <FontAwesomeIcon icon="fa-solid fa-house" className='icoon' /> </span>
                            </a>
                        </li>
                    }
                    {
                        location.pathname != '/searchblogs' && <>
                            <li onClick={() => navigate('/searchblogs')}>
                                <b></b>
                                <b></b>
                                <a>
                                    <span className='sidebar__txt'>Find blog</span>
                                    <span className='icn'> <FontAwesomeIcon icon="fa-solid fa-magnifying-glass" className='icoon' /> </span>
                                </a>
                            </li>
                            <li onClick={(event) => selectCategory(event.target.innerText)}>
                                <b></b>
                                <b></b>
                                <a>
                                    <span className='sidebar__txt'>Food</span>
                                    <span className='icn'> <FontAwesomeIcon icon="fa-solid fa-apple-whole" className='icoon' /> </span>
                                </a>
                            </li>
                            <li onClick={(event) => selectCategory(event.target.innerText)}>
                                <b></b>
                                <b></b>
                                <a>
                                    <span className='sidebar__txt'>Travel</span>
                                    <span className='icn'> <FontAwesomeIcon icon="fa-solid fa-earth-europe" className='icoon' /> </span>
                                </a>
                            </li>
                            <li onClick={(event) => selectCategory(event.target.innerText)}>
                                <b></b>
                                <b></b>
                                <a>
                                    <span className='sidebar__txt'>Entrepreneurship</span>
                                    <span className='icn'> <FontAwesomeIcon icon="fa-solid fa-business-time" className='icoon' /> </span>
                                </a>
                            </li>
                            <li onClick={(event) => selectCategory(event.target.innerText)}>
                                <b></b>
                                <b></b>
                                <a>
                                    <span className='sidebar__txt'>Personal</span>
                                    <span className='icn'> <FontAwesomeIcon icon="fa-solid fa-person" className='icoon' /> </span>
                                </a>
                            </li>
                            <li onClick={(event) => selectCategory(event.target.innerText)}>
                                <b></b>
                                <b></b>
                                <a>
                                    <span className='sidebar__txt'>Lifestyle</span>
                                    <span className='icn'> <FontAwesomeIcon icon="fa-solid fa-heart-pulse" className='icoon' /> </span>
                                </a>
                            </li>
                        </>
                    }
                    {
                        user?.displayName ?
                            <li onClick={logout}>
                                <b></b>
                                <b></b>
                                <a>
                                    <span className='sidebar__txt'>Sign out</span>
                                    <span className='icn'> <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" className='icoon icn-rotate' /> </span>
                                </a>
                            </li>
                        :
                        <li onClick={() => navigate('/login')}>
                                <b></b>
                                <b></b>
                                <a>
                                    <span className='sidebar__txt'>Log in</span>
                                    <span className='icn'> <FontAwesomeIcon icon="fa-solid fa-right-from-bracket" className='icoon' /> </span>
                                </a>
                            </li>
                }
                </ul>
                {
                    user?.displayName && <>
                        <div className="sidebar__user">
                            <p>Hi, {user.displayName}</p>
                        </div>
                    </>
                }
            </div>
        </div>
    );
}

export default Nav;
