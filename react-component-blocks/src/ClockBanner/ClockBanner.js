import React from 'react';
import './clockbanner.css'

class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date : new Date()
        }
    }
    componentDidMount(){
        this.timerID =  setInterval( () => this.tick(),1000);
    }
    componentWillUnmount(){
        clearInterval(this.timerID);
    }
    tick(){
        this.setState({
            date : new Date()
        })
    }
    render() {
        return (
        <div className="banner">
            Date :  <span> {this.state.date.toLocaleDateString()} </span>
            Time :  <span> {this.state.date.toLocaleTimeString()}</span>
        </div>)
    }
}

export default User;