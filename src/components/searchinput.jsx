import React from 'react';
import img from '../assets/blogpost.svg';
import img2 from '../assets/empty.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { db } from '../jsConfiguration';
import { collection, getDocs } from "firebase/firestore";
import { useLocation } from 'react-router-dom';
import Openedblog from './ui/openedblog';

const Searchinput = () => {

    const userCollectionRef = collection(db, "blogs");
    const [blogs, setBlogs] = useState([]);
    const [showBlogs, setShowBlogs] = useState();
    const [openedBlog, setOpenedBlog] = useState([]);
    const [inputText, setInputText] = useState('');
    const searchedBlogs = [];
    const opnBlogs = [];
    const location = useLocation();


    const pressenter = (e) => {
        if (e === "Enter") {
            search();
        }
    }


    const search = async () => {

        if (inputText != '') {

            document.querySelector(".search__block--image").style.transform = "translateY(50px)";
            document.querySelector(".search__block--image").style.opacity = 0;

            setTimeout(() => {
                document.querySelector(".search__block--img").style.display = "none";
            }, 300);


            blogs.map(item => {
                if (item.title.toLowerCase().includes(inputText)) {

                    searchedBlogs.push(item);
                }
            })

            if (searchedBlogs.length == 0) {


                document.querySelector(".search__block--img-empty").style.display = "flex";
                document.querySelector(".blogs__wrapper").style.transform = "translateY(10px)";
                document.querySelector(".blogs__wrapper").style.opacity = 0;


                setTimeout(() => {
                    document.querySelector(".blogs__wrapper").style.display = "none";
                }, 500);

                setTimeout(() => {
                    document.querySelector(".search__block--img-empty").style.opacity = 1;
                }, 600);
            }
            else {

                document.querySelector(".search__block--img-empty").style.opacity = 0;

                setTimeout(() => {
                    document.querySelector(".search__block--img-empty").style.display = "none";
                    document.querySelector(".blogs__wrapper").style.display = "grid";
                }, 500);

                setTimeout(() => {
                    document.querySelector(".blogs__wrapper").style.transform = "translateY(-10px)";
                    document.querySelector(".blogs__wrapper").style.opacity = 1;
                }, 600);

                setShowBlogs(searchedBlogs)
            }


        }
    }

    const setText = (x) => {
        setInputText(x);
    }

    const openblog = (title) => {

        blogs.map(item => {
            if (item.title.toLowerCase() == title.toLowerCase()) {
                opnBlogs.push(item);
            }
        })

        setOpenedBlog(opnBlogs);

        document.querySelector(".openedblog__bg").style.display = "flex";


        setTimeout(() => {
            document.querySelector(".openedblog__bg").style.opacity = 1;
        }, 100);

    }

    const closeblog = () => {
        document.querySelector(".openedblog__bg").style.display = "none";
        document.querySelector(".openedblog__bg").style.opacity = 0;
    }


    useEffect(() => {
        const getBlogs = async () => {
            const data = await getDocs(userCollectionRef);
            setBlogs(data.docs.map(doc => ({ ...doc.data() })));
        }
        getBlogs();

        if (location.state) {
            document.querySelector(".search__block--image").style.display = "none";

            setTimeout(() => {
                document.querySelector(".blogs__wrapper").style.display = "grid";
            }, 400);

            setTimeout(() => {
                document.querySelector(".blogs__wrapper").style.transform = "translateY(-10px)";
                document.querySelector(".blogs__wrapper").style.opacity = 1;
            }, 500);


            setShowBlogs(location.state)
        }


    }, []);

    return (
        <div className='row'>
            <div className="search__block">
                    <Openedblog  openedBlog={openedBlog} closeblog={closeblog}/>
                <h2 className='search__title'>
                    Find the blog you have been looking for with <span>Blogex</span>
                </h2>
            </div>
            <div className="search__block">
                <input className='search__input' type="text" placeholder='Search by Blog Title' onKeyPress={(event) => pressenter(event.key)} onChange={(event) => setText(event.target.value)} />
                <button className='search__btn' onClick={search}>
                    <FontAwesomeIcon className='search__btn--icon' icon="fa-solid fa-magnifying-glass" />
                </button>
            </div>
            <div className="blogs__wrapper">
                {
                    showBlogs && showBlogs.map(item =>
                        <div className="blog__card" onClick={() => openblog(item.title)}>
                            <div className="blog__card-bg">
                                <p>Continue Reading</p>
                            </div>
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
                                <h2 className='card__content--title mytitle2'>{item.title}</h2>
                                <p className='card__content--text'>{item.text}</p>
                                <div className="card__content--footer">
                                    <span className='card__content--category'>Category: {item.category}</span>
                                    <span className='card__content--date'>{item.date}</span>
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>

            <div className="search__block block-flx">
                <figure className='search__block--img'>
                    <img src={img} alt="" className='search__block--image' />
                </figure>
                <figure className='search__block--img-empty'>
                    <img src={img2} alt="" className='search__block--image-empty' />
                    <h2>Can't find similar blog</h2>
                </figure>
            </div>
        </div>
    );
}

export default Searchinput;
