import React from 'react';
import {BrowserRouter, Link} from 'react-router-dom';
import {Router, Route, IndexRoute, hasgHistory} from "react-router";

function Header(props) {
    return (
        <header className="site-header">
            <h1>Search cards</h1>
        </header>
    );
}

export default Header;
