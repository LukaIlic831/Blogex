import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swiperr from './swiper';


const Updated = () => {
    return (
        <div className='row'>
            <div className="latest__header">
                <div className="main__title">
                    <h1>Latest blogs</h1>
                </div>
                <div className="latest__swiper--wrapper">
                <Swiperr/>
                </div>
            </div>
        </div>
    );
}

export default Updated;
