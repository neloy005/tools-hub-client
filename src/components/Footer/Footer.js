import React from 'react';
import './Footer.css';
import fb from '../../images/icons/facebook.png'
import ig from '../../images/icons/instagram.png'
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className='footer-container'>
            <h3>Developed by Arif</h3>
            <p>All rights preserved by &copy;Md. Arif Istiek (Neloy) 2022</p>
            <div className='footer-link-container'>
                <Link to='/'>Home</Link>
                <Link to='/blogs'>Blogs</Link>
                <Link to='/portfolio'>About</Link>
            </div>
            <div>
                <a href="https://www.facebook.com/profile.php?id=100018011586420" target="_blank"><img src={fb} alt="" /></a>
                <a href="https://www.instagram.com/arif__istiak/" target="_blank"><img src={ig} alt="" /></a>
            </div>
        </div>
    );
};

export default Footer;