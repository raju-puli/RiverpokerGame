import React from 'react';

const TimeDisplay = ({ minutes, seconds }) => {
    return (
        <span className='m_l_10'>
            {"  "}{minutes < 10 ? `0${minutes}` : minutes}m:
            {seconds < 10 ? `0${seconds}` : seconds}s
        </span>

    );
};

export default TimeDisplay;
