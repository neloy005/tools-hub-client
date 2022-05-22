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

    let toolsArrayOfSix = [];
    let count = 0;
    for (const tool of tools) {
        count += 1;
        toolsArrayOfSix.push(tool);
        if (count === 6) {
            break;
        }
    }


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
                <hr />
            </div>


            <h2 className='tools-card-headline'>List of tools:</h2>
            <div className='card-container'>
                {
                    toolsArrayOfSix.map(tool => <Tools
                        key={tool._id}
                        tool={tool}
                    ></Tools>)
                }
            </div>
        </div>
    );
};

export default Home;