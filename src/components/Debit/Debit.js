import React, { useEffect } from 'react';
import Account from '../Account/Account';

export default function Debit(props){
    const type = 2;

    useEffect(() => {
        props.setPage("debit");
    }, []);

    return (
        <div id="debit" className='template undernav'>
            <Account type={type} />
        </div>
    )
}