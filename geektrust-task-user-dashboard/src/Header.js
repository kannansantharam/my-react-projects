import React from 'react'
import './App.css'
import { FaSearch } from "react-icons/fa";

function Header({ filterUsers }) {
    return (
        <div className="header-section">
            <div className="header">
                <ul>
                    <li>List of users</li>
                </ul>
                <div className="search-section">

                    <div className="search-input">
                        <input type="search" onChange={(e) => filterUsers(e.target.value.toLowerCase())} />
                    </div>
                    <FaSearch />
                </div>
            </div>

        </div>
    )
}
export default Header