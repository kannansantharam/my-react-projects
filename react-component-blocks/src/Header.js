import React from 'react';
import logo from './logo192.png';
import './Header.css'
class Header extends React.Component {
    render() {
        var header = (
            <header className="header">
                <div className="logo_section">
                   <img src={logo} />
                </div>
                <div className="headingName">
                    <h3>Component boxes</h3>
                </div>
            </header>
        )
        return header;
    }
}

export default Header;