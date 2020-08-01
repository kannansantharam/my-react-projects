import React from 'react';

class User extends React.Component {
    constructor(props){
        super(props)
    }
    render() {
        return (<div className="myName">
            My name is {this.props.name}
        </div>)
    }
}

export default User;