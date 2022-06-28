import React from 'react';
import img from '../assets/landing.png';

const Landing = () => {
    return (
        <div className='row'>
            <div className="landing__wrapper">
                <div className="landing__block--one">
                    <h1 className='landing__block--title'>A Simple Blog Website</h1>
                    <p className='landing__block--para'>Clean and simple website for reading various and interesting blogs.
                    find a blog that will delight you and brighten your day.</p>
                </div>
                <div className="landing__block--two">
                    <figure className='landing__block--img'>
                        <img src={img} alt="" />
                    </figure>
                </div>
                <div className="purple__block"></div>
            </div>
        </div>
    );
}

export default Landing;
