import React, { useEffect } from 'react';
import Account from '../Account/Account';

export default function Credit(props){
    const type = 1;

    useEffect(() => {
        props.setPage("credit");
    }, []);

    return (
        <div id="credit" className='template undernav'>
            <Account type={type} />
        </div>
    )
}