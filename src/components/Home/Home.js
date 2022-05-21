import React from 'react';
import './Home.css';
import banner from '../../images/banner2.jpg';

const Home = () => {
    return (
        <div>
            <div className='banner'>
                <div className='banner-container-bg'>
                    <div className='banner-container'>
                        <img src={banner} alt="" />
                    </div>
                </div>

                <h2 className='tagline'>Tools-hub</h2>
                <h1>The Best tools manufacturing brand!</h1>
            </div>
            <hr />

        </div>
    );
};

export default Home;