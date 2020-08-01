import React from 'react';
import './Footer.css'

function ConstrustTodayDate(){
    return new Date()
}
class Footer extends React.Component {
    construstTodayDate(){
        return new Date().toLocaleTimeString()
    }
    render() {
        return (
            <footer className='footer'>
                <div>
                    Copyright<sup>&copy;</sup> {new Date().toLocaleDateString()}
                </div>
            </footer>
        )
    }
}
export default Footer;