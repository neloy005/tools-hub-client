import React from 'react';
import './Loading.css'

const Loading = () => {
    return (
        <div className='spinner-div' style={{ 'backgroundColor': '#d1a2dd', 'minHeight': '550px' }} >
            <div class="sk-chase">
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
                <div class="sk-chase-dot"></div>
            </div>
        </div>

    );
};

export default Loading;