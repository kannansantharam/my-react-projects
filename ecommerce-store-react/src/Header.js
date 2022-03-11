import React from 'react';
import { Link } from 'react-router-dom';
import './App.css';
function Header() {
    return (
        <div className='header-section'>
            <div className="header">
                <nav>
                    <ul>
                        <li>
                            <Link to="/">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link to="/products">
                                Products
                            </Link>
                        </li>
                        <li>
                            <Link to="/categories">
                                Category
                            </Link>
                        </li>
                        <li>
                            <Link to="/cart">
                                Cart
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}
export default Header;