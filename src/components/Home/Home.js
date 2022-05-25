import React, { useEffect, useState } from 'react';
import './Home.css';
import banner from '../../images/banner2.jpg';
import Tools from '../Tools/Tools';
import allTools from '../../images/icons/tool-box.png';
import totalSold from '../../images/icons/sold.png';
import inStock from '../../images/icons/warehouse.png';
import SingleReview from '../SingleReview/SingleReview';

const Home = () => {
    const [tools, setTools] = useState([]);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/tools')
            .then(res => res.json())
            .then(data => setTools(data))
    }, [])
    useEffect(() => {
        fetch('http://localhost:5000/reviews')
            .then(res => res.json())
            .then(data => setReviews(data))
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

    let stockCount = 0;
    let sold = 0;
    for (const tool of tools) {
        stockCount = stockCount + tool.available;
        sold = sold + tool.sold;

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

            <h2 className='tools-card-headline'>Business Summary:</h2>
            <div className='business-summary-container'>
                <div>
                    <img src={allTools} alt="" />
                    <h2><span style={{ 'fontSize': '56px', 'color': 'white' }}>{tools.length}+</span><br /><span style={{ 'fontSize': '25px' }}>different tools</span></h2>
                </div>
                <div>
                    <img src={inStock} alt="" />
                    <h2><span style={{ 'fontSize': '56px', 'color': 'white' }}>{stockCount}+</span><br /><span style={{ 'fontSize': '25px' }}>items available</span></h2>
                </div>
                <div>
                    <img src={totalSold} alt="" />
                    <h2><span style={{ 'fontSize': '56px', 'color': 'white' }}>{sold}+</span><br /><span style={{ 'fontSize': '25px' }}>sold so far</span></h2>
                </div>
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
            <h2 className='tools-card-headline'>Customers reviews:</h2>
            <div className='review-container'>
                {
                    reviews.map(singleReview => <SingleReview
                        key={singleReview._id}
                        singleReview={singleReview}
                    ></SingleReview>)
                }
            </div>
        </div>
    );
};

export default Home;