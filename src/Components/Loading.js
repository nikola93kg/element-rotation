import React from 'react';
import logo from '../Img/loading.svg'

function Loading() {
    return (
        <div className="loading-container">
            <img src={logo} alt="loading..." />
        </div>
    )
}

export default Loading