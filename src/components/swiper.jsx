import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper";
import { auth } from '../jsConfiguration';
import { useState, useEffect } from 'react';
import { db } from '../jsConfiguration';
import { collection, doc, setDoc, getDocs } from "firebase/firestore";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';



const Swiperr = () => {

    const userCollectionRef = collection(db, "blogs");
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const getBlogs = async () => {
            const data = await getDocs(userCollectionRef);
            setBlogs(data.docs.map(doc => ({ ...doc.data() })));
            setLoading(false)
        }

        getBlogs();
    }, []);


    return (
        <div>
            {loading && <div className='loading__bg'>
                <div class="spinner">
                    <span>L</span>
                    <span>O</span>
                    <span>A</span>
                    <span>D</span>
                    <span>I</span>
                    <span>N</span>
                    <span>G</span>
                </div>
            </div>
            }
            <Swiper
                effect={"coverflow"}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={"auto"}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 5,
                    depth: 100,
                    modifier: 1,
                    slideShadows: false
                }}

                modules={[EffectCoverflow, Pagination]}
                className="swiper"
            >
                {blogs.map(item =>
                    <SwiperSlide className='swiper-slide'>
                        <div className="card">
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
                                <h2 className='card__content--title'>{item.title}</h2>
                                <p className='card__content--text'>{item.text}</p>
                                <div className="card__content--footer">
                                    <span className='card__content--category'>Category: {item.category}</span>
                                    <span className='card__content--date'>{item.date}</span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                )}
            </Swiper>
        </div>
    );
}

export default Swiperr;
