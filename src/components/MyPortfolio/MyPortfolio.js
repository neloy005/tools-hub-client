import React from 'react';
import arif from '../../images/arif.jpg';
import './MyPortfolio.css';

const MyPortfolio = () => {
    return (
        <div className='pf-container'>
            <h2 style={{ 'paddingTop': '30px' }} className='login-heading'>My Portfolio</h2>
            <div>
                <img src={arif} alt="" />
                <h4>Md. Arif Istiek Neloy</h4>

                <div className='basic-info'>
                    <h4><b>Education:</b> I have completed Bachelor of Science in Computer Science and Engineering from BGC Trust University, Bangladesh</h4>
                    <h4><b>Web Dev skills:</b> HTML5, CSS3, Javascript, React, MongoDb</h4>
                </div>
                <h3>Visit My best Projects:</h3>

                <li><a href="https://fruit-inventory.web.app/" target="_blank">Fruit inventory</a></li>
                <li><a href="https://arabic-home-tutor.web.app/" target="_blank">Arabic home tutor</a></li>
                <li><a href="https://luxary-camera-shop.netlify.app/" target="_blank">Luxary camera shop</a></li>


            </div>
        </div>
    );
};

export default MyPortfolio;