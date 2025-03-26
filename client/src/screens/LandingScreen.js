import React from 'react';
import { Link } from 'react-router-dom';

function LandingScreen() {
    return (
        <div className='row landing justify-content-center align-items-center' style={{minHeight: '100vh'}}>
            <div className='col-md-9 text-center' style={{borderRight:'8px solid white'}}>
                <h3 style={{color: 'white', fontSize:'120px', marginBottom: '30px'}}>RentEase</h3>
                <h1 className='destext' style={{color: 'white', marginBottom: '30px'}}>Welcome to Rent Ease – Find Your Perfect Stay!</h1>
                <Link to='/home'>
                    <button className='btn landingbtn' style={{color:'black', backgroundColor:'white', marginTop: '20px'}}>Get Started</button>
                </Link>
            </div>
        </div>
    );
}

export default LandingScreen;
