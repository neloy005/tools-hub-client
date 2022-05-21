import React, { useEffect, useState } from 'react';
import './Home.css';
import banner from '../../images/banner2.jpg';
import Tools from '../Tools/Tools';

const Home = () => {
    const [tools, setTools] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/tools')
            .then(res => res.json())
            .then(data => setTools(data))
    }, [])

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


            <div>
                {
                    tools.map(tool => <Tools
                        key={tool._id}
                        tool={tool}
                    ></Tools>)
                }
            </div>
        </div>
    );
};

export default Home;