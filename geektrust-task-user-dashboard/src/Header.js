import React, { useState } from 'react'
import './App.css'
import { FaSearch } from "react-icons/fa";

function Header({ filterUsers }) {
    const [showSearch, setShowSearch] = useState(false)
    const toggleSearchBar = () => {
        setShowSearch((showSearch) => !showSearch)
    }
    return (
        <div className="header-section">
            <div className="header">
                <ul>
                    <li>List of users</li>
                </ul>
                <div className="search-section">
                    {showSearch ?
                        <div className="search-input hide">
                            <input type="search" placeholder="Search by Email, Name and Role" onChange={(e) => filterUsers(e.target.value.toLowerCase())} />
                        </div> : ''}
                    <FaSearch onClick={() => toggleSearchBar()} />
                </div>
            </div>

        </div>
    )
}
export default Header