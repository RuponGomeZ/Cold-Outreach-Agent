import React from 'react';

const Navbar = ({ setPage }) => {

    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
                <div className="flex-1">
                    <a onClick={() => setPage('inputForm')} className="btn btn-ghost text-xl font-bold font-mono">Cold Outreach Agent</a>
                </div>
                <div className="flex-none">
                    <ul className="menu menu-horizontal px-1">
                        <li><button onClick={() => setPage('statusPage')}>Check Status</button></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;