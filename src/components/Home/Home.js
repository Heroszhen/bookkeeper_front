import './Home.css';
import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';

export default function Home(props){
    const [value, onChange] = useState(new Date());

    useEffect(() => {
        props.setPage("home")
    }, []);
    
    return (
        <div id="home" className='template undernav'>
            <section>
                <h2 className='mb-4 text-center'>Bienvenue</h2>
                <Calendar onChange={onChange} value={value} />
            </section>
            
        </div>
    )
}