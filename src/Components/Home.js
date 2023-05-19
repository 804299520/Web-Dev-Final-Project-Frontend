import React from 'react';
import '../App.css';
import Logo from '../workspace-logo.png';

function Home() {
    return (
        <div className='Home-Div'>
            <img src={Logo} alt="logo" className='title-logo'/>
            <p>All-in-one hub for managing employees and tasks</p>
        </div>
    )
}

export default Home;