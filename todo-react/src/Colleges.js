import React, { useState, useEffect } from 'react';
import './App.css';


function Colleges() {
    const [myDropDownValue, setmyDropDownValue] = useState(["India"]);
    const [country, setCountry] = useState("");
    useEffect(() => {
        if (!country) {
            return
        }
        const getColleges = async () => {
            await fetch("http://universities.hipolabs.com/search?country=" + country)
                .then((response) => response.json())
                .then((data) => {
                    setmyDropDownValue(data);
                })
        }
        getColleges();
    }, [country])
    const changeCountry = (e) => {
        let value = e.target.value;
        setCountry(value);
    }
    return (
        <div>
            <div>List of Colleges from United States of America</div>
            <div>
                <select onChange={e => changeCountry(e)}>
                    <option value="--">--</option>
                    <option value="India">India</option>
                    <option value="United+States">United States</option>
                </select>
            </div>
            <section>
                <ul>{
                    myDropDownValue.map((value, index) => {
                        return <li key={value.name + "_" + index}>{value.name}</li>
                    })
                }
                </ul>
            </section>
        </div>
    )

}
export default Colleges;