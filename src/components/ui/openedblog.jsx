import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Openedblog = ({openedBlog, closeblog}) => {
    return (
        <div className="openedblog__bg">
            {
                        openedBlog.length > 0 && openedBlog.map(item =>
                            <div className="openedblog__card">
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
                                    <div className="card__content--author">
                                        <FontAwesomeIcon icon="fa-solid fa-user" />
                                            <p>{item.name}</p>
                                    </div>
                                </div>
                                <div className="card__content">
                                    <div className="close"  onClick={closeblog}>
                                    <FontAwesomeIcon icon="fa-solid fa-xmark" className='close-icn' />
                                    </div>
                                    <div className="card__content--header">
                                        <h2 className='opntitle'>{item.title}</h2>
                                    </div>
                                    <p className='openedblog__card--content-text'>{item.text}</p>
                                    <div className="card__content--footer">
                                        <span className='card__content--category'>Category: {item.category}</span>
                                        <span className='card__content--date'>{item.date}</span>
                                    </div>
                                </div>
                            </div>
                        )
                    }
        </div>
    );
}

export default Openedblog;
