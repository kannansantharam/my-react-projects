import React from 'react';
import './Footer.css'

function ConstrustTodayDate(){
    return new Date()
}
class Footer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            date: new Date()
        }
    }
    componentDidMount(){
        this.timerId = setInterval(() => this.tick(),1000)
    }
    componentWillUnmount(){
        clearInterval(this.timerId)
    }
    tick(){
        this.setState({
            date : new Date()
        })
    }
    render() {
        return (
            <footer className='footer'>
                <div>
                    Copyright<sup>&copy;</sup> {this.state.date.toLocaleTimeString()}
                </div>
            </footer>
        )
    }
}
export default Footer;